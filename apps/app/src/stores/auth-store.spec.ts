import { useAuthStore } from "@/stores";

describe("Auth store", () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, tenantId: null, isAuthenticated: false });
  });

  it("sets and clears auth state", () => {
    useAuthStore.getState().setAuth(
      { id: "u1", email: "test@example.com", role: "ADMIN", tenantId: "tenant-1" },
      "tenant-1",
    );
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(useAuthStore.getState().user?.email).toBe("test@example.com");

    useAuthStore.getState().clearAuth();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().user).toBeNull();
  });
});
