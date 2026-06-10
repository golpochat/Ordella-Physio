import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/dashboard/widgets/dashboard_scaffold.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';

class PatientDashboard extends ConsumerWidget {
  const PatientDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;

    return DashboardScaffold(
      title: 'Patient Portal',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Welcome, ${user?.displayName ?? 'Patient'}',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 24),
          StatCard(
            label: 'Your Role',
            value: 'Patient',
            icon: Icons.person_outline,
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Upcoming Appointments',
            subtitle: 'View and manage your schedule',
            onTap: () => context.go('/appointments'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Clinical Notes',
            subtitle: 'Read notes from your care team',
            onTap: () => context.go('/notes'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Billing & Invoices',
            subtitle: 'Review payments and statements',
            onTap: () => context.go('/billing'),
          ),
        ],
      ),
    );
  }
}
