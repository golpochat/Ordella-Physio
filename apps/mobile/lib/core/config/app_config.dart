class AppConfig {
  const AppConfig({
    required this.apiGatewayUrl,
    required this.defaultTenantId,
    this.messagingWsUrl,
    this.pollingIntervalMs = 5000,
  });

  final String apiGatewayUrl;
  final String defaultTenantId;
  final String? messagingWsUrl;
  final int pollingIntervalMs;

  static AppConfig fromEnvironment() {
    const gatewayUrl = String.fromEnvironment(
      'API_GATEWAY_URL',
      defaultValue: 'http://10.0.2.2:3049',
    );
    const tenantId = String.fromEnvironment(
      'DEFAULT_TENANT_ID',
      defaultValue: 'demo-tenant',
    );
    const wsUrl = String.fromEnvironment('MESSAGING_WS_URL', defaultValue: '');

    return AppConfig(
      apiGatewayUrl: gatewayUrl,
      defaultTenantId: tenantId,
      messagingWsUrl: wsUrl.isEmpty ? null : wsUrl,
    );
  }
}
