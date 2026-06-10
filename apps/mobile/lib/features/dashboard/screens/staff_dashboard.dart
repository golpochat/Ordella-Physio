import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/dashboard/widgets/dashboard_scaffold.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';

class StaffDashboard extends ConsumerWidget {
  const StaffDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;

    return DashboardScaffold(
      title: 'Staff Portal',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Welcome, ${user?.displayName ?? 'Staff'}',
              style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 24),
          StatCard(label: 'Your Role', value: 'Staff', icon: Icons.badge_outlined),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Appointments',
            subtitle: 'Front-desk scheduling',
            onTap: () => context.go('/appointments'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Billing',
            subtitle: 'Invoice management',
            onTap: () => context.go('/billing'),
          ),
        ],
      ),
    );
  }
}
