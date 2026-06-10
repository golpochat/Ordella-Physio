class AuthUser {
  const AuthUser({
    required this.id,
    required this.email,
    required this.tenantId,
    required this.role,
    this.firstName,
    this.lastName,
    this.roles = const [],
    this.permissions = const [],
    this.emailVerified = false,
  });

  final String id;
  final String email;
  final String tenantId;
  final String role;
  final String? firstName;
  final String? lastName;
  final List<String> roles;
  final List<String> permissions;
  final bool emailVerified;

  String get displayName {
    final name = [firstName, lastName].where((v) => v != null && v.isNotEmpty).join(' ');
    return name.isNotEmpty ? name : email;
  }

  List<String> get resolvedRoles => roles.isNotEmpty ? roles : [role];

  factory AuthUser.fromJson(Map<String, dynamic> json) {
    return AuthUser(
      id: json['id'] as String,
      email: json['email'] as String,
      tenantId: json['tenantId'] as String,
      role: json['role'] as String,
      firstName: json['firstName'] as String?,
      lastName: json['lastName'] as String?,
      roles: (json['roles'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      permissions: (json['permissions'] as List<dynamic>?)
              ?.map((e) => e.toString())
              .toList() ??
          [],
      emailVerified: json['emailVerified'] as bool? ?? false,
    );
  }

  Map<String, dynamic> toJson() => {
        'id': id,
        'email': email,
        'tenantId': tenantId,
        'role': role,
        'firstName': firstName,
        'lastName': lastName,
        'roles': roles,
        'permissions': permissions,
        'emailVerified': emailVerified,
      };

  AuthUser copyWith({
    String? firstName,
    String? lastName,
  }) {
    return AuthUser(
      id: id,
      email: email,
      tenantId: tenantId,
      role: role,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      roles: roles,
      permissions: permissions,
      emailVerified: emailVerified,
    );
  }
}

class AuthTokensResponse {
  const AuthTokensResponse({
    required this.accessToken,
    required this.refreshToken,
    required this.user,
    this.expiresIn,
    this.sessionId,
  });

  final String accessToken;
  final String refreshToken;
  final AuthUser user;
  final int? expiresIn;
  final String? sessionId;

  factory AuthTokensResponse.fromJson(Map<String, dynamic> json) {
    final userJson = json['user'] as Map<String, dynamic>;
    return AuthTokensResponse(
      accessToken: json['accessToken'] as String,
      refreshToken: json['refreshToken'] as String,
      user: AuthUser.fromJson(userJson),
      expiresIn: json['expiresIn'] as int?,
      sessionId: json['sessionId'] as String?,
    );
  }
}

class TenantEntry {
  const TenantEntry({required this.id, required this.name, this.slug});

  final String id;
  final String name;
  final String? slug;

  factory TenantEntry.fromJson(Map<String, dynamic> json) {
    return TenantEntry(
      id: json['id'] as String,
      name: (json['name'] ?? json['id']).toString(),
      slug: json['slug'] as String?,
    );
  }
}
