class RoleRoutes {
  static const patient = '/patient';
  static const therapist = '/therapist';
  static const clinicAdmin = '/clinic';
  static const staff = '/staff';
  static const pharmacy = '/pharmacy';
  static const user = '/user';
  static const system = '/super-admin';

  static const roleDashboardMap = {
    'PATIENT': patient,
    'THERAPIST': therapist,
    'ADMIN': clinicAdmin,
    'OWNER': clinicAdmin,
    'STAFF': staff,
    'PHARMACY': pharmacy,
    'USER': user,
    'SYSTEM': system,
  };

  static String dashboardForRole(String role) {
    return roleDashboardMap[role] ?? user;
  }

  static List<String> allowedRolesForDashboard(String dashboardPath) {
    return roleDashboardMap.entries
        .where((e) => e.value == dashboardPath)
        .map((e) => e.key)
        .toList();
  }

  static bool canAccessDashboard(String dashboardPath, List<String> roles) {
    final allowed = allowedRolesForDashboard(dashboardPath);
    if (allowed.isEmpty) return true;
    return roles.any(allowed.contains);
  }

  static bool canWriteNotes(List<String> roles) => roles.contains('THERAPIST');
}
