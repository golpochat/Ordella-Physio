import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/lists/app_list_tile.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

final billingProvider = FutureProvider.autoDispose<List<Invoice>>((ref) {
  final service = ref.watch(billingServiceProvider);
  final user = ref.watch(authProvider).user;
  return service.listInvoices(patientId: user?.id);
});

class BillingScreen extends ConsumerWidget {
  const BillingScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(billingProvider);

    return Scaffold(
      appBar: AppBar(title: const Text('Billing')),
      body: async.when(
        loading: () => const LoadingView(message: 'Loading invoices...'),
        error: (e, _) => ErrorView(
          message: e.toString(),
          isOffline: e.toString().contains('SocketException'),
          onRetry: () => ref.invalidate(billingProvider),
        ),
        data: (items) {
          if (items.isEmpty) {
            return const Center(child: Text('No invoices found'));
          }
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final invoice = items[index];
              return AppListTile(
                title: invoice.invoiceNumber,
                subtitle: '${invoice.status} — ${invoice.currency} ${invoice.total}',
                onTap: () => context.push('/billing/${invoice.id}'),
              );
            },
          );
        },
      ),
    );
  }
}
