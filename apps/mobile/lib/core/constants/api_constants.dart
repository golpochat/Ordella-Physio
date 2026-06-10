class ApiConstants {
  static const correlationIdHeader = 'x-correlation-id';
  static const tenantHeader = 'x-tenant-id';
  static const authorizationHeader = 'authorization';

  static const gatewayPaths = {
    'auth': '/auth',
    'tenants': '/tenants',
    'patients': '/patients',
    'appointments': '/appointments',
    'notes': '/notes',
    'billing': '/billing',
    'payments': '/payments',
    'communication': '/communication',
    'reporting': '/reporting',
    'messaging': '/messaging',
    'notifications': '/notifications',
  };
}
