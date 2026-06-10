import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/dashboard/widgets/dashboard_scaffold.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';

class TherapistDashboard extends ConsumerWidget {
  const TherapistDashboard({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final user = ref.watch(authProvider).user;

    return DashboardScaffold(
      title: 'Therapist Portal',
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Welcome, ${user?.displayName ?? 'Therapist'}',
            style: Theme.of(context).textTheme.headlineSmall,
          ),
          const SizedBox(height: 24),
          StatCard(
            label: 'Your Role',
            value: 'Therapist',
            icon: Icons.medical_services_outlined,
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Today\'s Schedule',
            subtitle: 'Manage appointments',
            onTap: () => context.go('/appointments'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Clinical Notes',
            subtitle: 'Create and manage patient notes',
            onTap: () => context.go('/notes'),
          ),
          const SizedBox(height: 12),
          InfoCard(
            title: 'Messages',
            subtitle: 'Chat with patients and staff',
            onTap: () => context.go('/messages'),
          ),
        ],
      ),
    );
  }
}
