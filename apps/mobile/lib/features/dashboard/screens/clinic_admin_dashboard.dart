import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/dashboard/widgets/dashboard_scaffold.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';

class ClinicAdminDashboard extends ConsumerWidget {
  const ClinicAdminDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;

    return DashboardScaffold(
      title: 'Clinic Admin',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Welcome, ${user?.displayName ?? 'Admin'}',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 24),
          StatCard(
            label: 'Your Role',
            value: 'Clinic Admin',
            icon: Icons.business_outlined,
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Appointments',
            subtitle: 'Clinic-wide schedule overview',
            onTap: () => context.go('/appointments'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Billing',
            subtitle: 'Invoices and revenue',
            onTap: () => context.go('/billing'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Staff Messages',
            subtitle: 'Team communications',
            onTap: () => context.go('/messages'),
          ),
        ],
      ),
    );
  }
}
