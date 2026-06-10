import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

final invoiceDetailProvider =
    FutureProvider.autoDispose.family<Invoice, String>((ref, id) {
  return ref.watch(billingServiceProvider).getInvoice(id);
});

class BillingDetailScreen extends ConsumerWidget {
  const BillingDetailScreen({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(invoiceDetailProvider(id));

    return Scaffold(
      appBar: AppBar(title: const Text('Invoice Details')),
      body: async.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(invoiceDetailProvider(id)),
        ),
        data: (invoice) => ListView(
          padding: const EdgeInsets.all(16),
          children: [
            InfoCard(
              title: invoice.invoiceNumber,
              subtitle: invoice.status,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _row('Total', '${invoice.currency} ${invoice.total}'),
                  _row('Subtotal', '${invoice.currency} ${invoice.subtotal}'),
                  _row('Tax', '${invoice.currency} ${invoice.tax}'),
                  _row('Discount', '${invoice.currency} ${invoice.discount}'),
                  if (invoice.dueDate != null) _row('Due Date', invoice.dueDate!),
                  if (invoice.notes != null) _row('Notes', invoice.notes!),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _row(String label, String value) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 8),
      child: Row(
        children: [
          SizedBox(
            width: 100,
            child: Text('$label:', style: const TextStyle(fontWeight: FontWeight.w600)),
          ),
          Expanded(child: Text(value)),
        ],
      ),
    );
  }
}
