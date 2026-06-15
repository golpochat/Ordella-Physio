import dotenv from "dotenv";

dotenv.config();

process.env.DATABASE_URL ??=
  "postgresql://postgres:postgres@localhost:5434/clinic_backend?schema=public";
process.env.JWT_SECRET ??= "test-jwt-secret-min-32-characters-long";
process.env.JWT_REFRESH_SECRET ??= "test-jwt-refresh-secret-min-32-chars";
