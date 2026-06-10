import 'package:flutter_test/flutter_test.dart';
import 'package:ordella_mobile/core/routing/role_routes.dart';

void main() {
  test('role dashboard mapping resolves therapist', () {
    expect(RoleRoutes.dashboardForRole('THERAPIST'), '/therapist');
  });

  test('therapist can write notes', () {
    expect(RoleRoutes.canWriteNotes(['THERAPIST']), isTrue);
    expect(RoleRoutes.canWriteNotes(['PATIENT']), isFalse);
  });
}
