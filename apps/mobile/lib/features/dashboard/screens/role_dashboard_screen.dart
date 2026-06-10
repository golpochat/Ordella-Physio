import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/dashboard/screens/clinic_admin_dashboard.dart';
import 'package:ordella_mobile/features/dashboard/screens/patient_dashboard.dart';
import 'package:ordella_mobile/features/dashboard/screens/pharmacy_dashboard.dart';
import 'package:ordella_mobile/features/dashboard/screens/staff_dashboard.dart';
import 'package:ordella_mobile/features/dashboard/screens/therapist_dashboard.dart';
import 'package:ordella_mobile/features/dashboard/screens/user_dashboard.dart';

class RoleDashboardScreen extends ConsumerWidget {
  const RoleDashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final role = ref.watch(authProvider).user?.role ?? 'USER';

    switch (role) {
      case 'PATIENT':
        return const PatientDashboard();
      case 'THERAPIST':
        return const TherapistDashboard();
      case 'ADMIN':
      case 'OWNER':
        return const ClinicAdminDashboard();
      case 'STAFF':
        return const StaffDashboard();
      case 'PHARMACY':
        return const PharmacyDashboard();
      case 'SYSTEM':
        return const ClinicAdminDashboard();
      default:
        return const UserDashboard();
    }
  }
}
