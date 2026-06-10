import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:intl/intl.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/lists/app_list_tile.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

final appointmentsProvider = FutureProvider.autoDispose<List<Appointment>>((ref) {
  final service = ref.watch(appointmentServiceProvider);
  final user = ref.watch(authProvider).user;
  final role = user?.role ?? '';

  if (role == 'THERAPIST') {
    return service.listAppointments(therapistId: user?.id);
  }
  return service.listAppointments(patientId: user?.id);
});

class AppointmentsScreen extends ConsumerWidget {
  const AppointmentsScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(appointmentsProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Appointments')),
      body: async.when(
        loading: () => const LoadingView(message: 'Loading appointments...'),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(appointmentsProvider),
        ),
        data: (items) {
          if (items.isEmpty) {
            return const Center(child: Text('No appointments found'));
          }
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final item = items[index];
              final start = DateTime.tryParse(item.startTime);
              final subtitle = start != null
                  ? DateFormat.yMMMd().add_jm().format(start.toLocal())
                  : item.startTime;

              return AppListTile(
                title: '${item.type} — ${item.status}',
                subtitle: subtitle,
                onTap: () => context.push('/appointments/${item.id}'),
              );
            },
          );
        },
      ),
    );
  }
}
