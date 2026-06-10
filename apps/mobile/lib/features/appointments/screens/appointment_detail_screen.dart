import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:intl/intl.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

final appointmentDetailProvider =
    FutureProvider.autoDispose.family<Appointment, String>((ref, id) {
  return ref.watch(appointmentServiceProvider).getAppointment(id);
});

class AppointmentDetailScreen extends ConsumerWidget {
  const AppointmentDetailScreen({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(appointmentDetailProvider(id));

    return Scaffold(
      appBar: AppBar(title: const Text('Appointment Details')),
      body: async.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(appointmentDetailProvider(id)),
        ),
        data: (appointment) {
          final start = DateTime.tryParse(appointment.startTime);
          final end = DateTime.tryParse(appointment.endTime);
          final fmt = DateFormat.yMMMd().add_jm();

          return ListView(
            padding: const EdgeInsets.all(16),
            children: [
              InfoCard(
                title: appointment.type,
                subtitle: appointment.status,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    _row('Start', start != null ? fmt.format(start.toLocal()) : appointment.startTime),
                    _row('End', end != null ? fmt.format(end.toLocal()) : appointment.endTime),
                    _row('Patient', appointment.patientId),
                    _row('Therapist', appointment.therapistId),
                    if (appointment.notes != null) _row('Notes', appointment.notes!),
                    if (appointment.cancellationReason != null)
                      _row('Cancellation', appointment.cancellationReason!),
                  ],
                ),
              ),
            ],
          );
        },
      ),
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          SizedBox(width: 100, child: Text('$label:', style: const TextStyle(fontWeight: FontWeight.w600))),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }
}
