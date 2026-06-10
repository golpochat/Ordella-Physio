import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/dashboard/widgets/dashboard_scaffold.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';

class UserDashboard extends ConsumerWidget {
  const UserDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;

    return DashboardScaffold(
      title: 'User Portal',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text('Welcome, ${user?.displayName ?? 'User'}',
              style: Theme.of(context).textTheme.headlineSmall),
          const SizedBox(height: 24),
          StatCard(label: 'Your Role', value: 'User', icon: Icons.account_circle_outlined),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Appointments',
            subtitle: 'Your upcoming visits',
            onTap: () => context.go('/appointments'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Messages',
            subtitle: 'Stay in touch',
            onTap: () => context.go('/messages'),
          ),
        ],
      ),
    );
  }
}
