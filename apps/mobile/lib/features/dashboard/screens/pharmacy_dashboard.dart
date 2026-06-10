import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/dashboard/widgets/dashboard_scaffold.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';

class PharmacyDashboard extends ConsumerWidget {
  const PharmacyDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;

    return DashboardScaffold(
      title: 'Pharmacy Portal',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Welcome, ${user?.displayName ?? 'Pharmacy'}',
              style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 24),
          StatCard(label: 'Your Role', value: 'Pharmacy', icon: Icons.local_pharmacy_outlined),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Patient Notes',
            subtitle: 'Read-only clinical context',
            onTap: () => context.go('/notes'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Messages',
            subtitle: 'Coordinate with clinic staff',
            onTap: () => context.go('/messages'),
          ),
        ],
      ),
    );
  }
}
