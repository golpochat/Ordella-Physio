import { execFileSync, spawnSync } from "node:child_process";

function commandExists(command) {
  const result = spawnSync(process.platform === "win32" ? "where" : "which", [command], {
    stdio: "ignore",
  });
  return result.status === 0;
}

function dockerContainerRunning(containerName) {
  const result = spawnSync("docker", ["inspect", "-f", "{{.State.Running}}", containerName], {
    encoding: "utf8",
  });
  return result.status === 0 && result.stdout.trim() === "true";
}

export function parseDatabaseUrl(databaseUrl) {
  const url = new URL(databaseUrl);
  const databaseName = url.pathname.replace(/^\//, "").split("?")[0];
  return {
    user: decodeURIComponent(url.username || "postgres"),
    password: decodeURIComponent(url.password || ""),
    host: url.hostname,
    port: url.port || "5432",
    databaseName,
  };
}

export function resolveBackupRuntime() {
  const dockerContainer =
    process.env.BACKUP_DOCKER_CONTAINER ?? "ordella-physio-clinic-backend-db";

  if (commandExists("pg_dump") && commandExists("pg_restore") && commandExists("psql")) {
    return { mode: "local" };
  }

  if (dockerContainerRunning(dockerContainer)) {
    return { mode: "docker", container: dockerContainer };
  }

  throw new Error(
    "PostgreSQL client tools not found in PATH and Docker container is unavailable. Install pg_dump/pg_restore/psql or start clinic-backend-db.",
  );
}

export function runPgDump({ databaseUrl, outputFile, runtime }) {
  if (runtime.mode === "local") {
    execFileSync(
      "pg_dump",
      ["--format=custom", "--no-owner", "--no-acl", "--file", outputFile, databaseUrl],
      { stdio: "inherit" },
    );
    return;
  }

  const { user, databaseName } = parseDatabaseUrl(databaseUrl);
  const containerDumpPath = `/tmp/${databaseName}-${Date.now()}.dump`;

  execFileSync(
    "docker",
    [
      "exec",
      "-e",
      `PGPASSWORD=${parseDatabaseUrl(databaseUrl).password}`,
      runtime.container,
      "pg_dump",
      "-U",
      user,
      "--format=custom",
      "--no-owner",
      "--no-acl",
      "--file",
      containerDumpPath,
      databaseName,
    ],
    { stdio: "inherit" },
  );

  execFileSync("docker", ["cp", `${runtime.container}:${containerDumpPath}`, outputFile], { stdio: "inherit" });
  execFileSync("docker", ["exec", runtime.container, "rm", "-f", containerDumpPath], { stdio: "ignore" });
}

export function runPgRestore({ databaseUrl, dumpFile, runtime }) {
  if (runtime.mode === "local") {
    execFileSync(
      "pg_restore",
      ["--clean", "--if-exists", "--no-owner", "--no-acl", "--dbname", databaseUrl, dumpFile],
      { stdio: "inherit" },
    );
    return;
  }

  const { user, databaseName } = parseDatabaseUrl(databaseUrl);
  const containerDumpPath = `/tmp/restore-${Date.now()}.dump`;

  execFileSync("docker", ["cp", dumpFile, `${runtime.container}:${containerDumpPath}`], { stdio: "inherit" });
  execFileSync(
    "docker",
    [
      "exec",
      "-e",
      `PGPASSWORD=${parseDatabaseUrl(databaseUrl).password}`,
      runtime.container,
      "pg_restore",
      "-U",
      user,
      "--clean",
      "--if-exists",
      "--no-owner",
      "--no-acl",
      "--dbname",
      databaseName,
      containerDumpPath,
    ],
    { stdio: "inherit" },
  );
  execFileSync("docker", ["exec", runtime.container, "rm", "-f", containerDumpPath], { stdio: "ignore" });
}

export function runPsqlCommand({ databaseUrl, sql, runtime, scalar = false }) {
  const args = scalar
    ? ["-v", "ON_ERROR_STOP=1", "-tAc", sql]
    : ["-v", "ON_ERROR_STOP=1", "-c", sql];

  if (runtime.mode === "local") {
    const result = execFileSync("psql", [databaseUrl, ...args], {
      encoding: scalar ? "utf8" : undefined,
      stdio: scalar ? ["ignore", "pipe", "inherit"] : "inherit",
    });
    return scalar ? result.trim() : undefined;
  }

  const { user, password, databaseName } = parseDatabaseUrl(databaseUrl);
  const result = execFileSync(
    "docker",
    ["exec", "-e", `PGPASSWORD=${password}`, runtime.container, "psql", "-U", user, "-d", databaseName, ...args],
    {
      encoding: scalar ? "utf8" : undefined,
      stdio: scalar ? ["ignore", "pipe", "inherit"] : "inherit",
    },
  );

  return scalar ? result.trim() : undefined;
}

export function toolsAvailable() {
  try {
    resolveBackupRuntime();
    return commandExists("openssl") || commandExists("docker");
  } catch {
    return false;
  }
}
