import 'package:flutter/material.dart';
import 'package:ordella_mobile/core/theme/app_colors.dart';
import 'package:ordella_mobile/widgets/buttons/primary_button.dart';

class ErrorView extends StatelessWidget {
  const ErrorView({
    super.key,
    required this.message,
    this.onRetry,
    this.isOffline = false,
  });

  final String message;
  final VoidCallback? onRetry;
  final bool isOffline;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Padding(
        padding: const EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(
              isOffline ? Icons.cloud_off : Icons.error_outline,
              size: 48,
              color: isOffline ? AppColors.warning : AppColors.error,
            ),
            const SizedBox(height: 16),
            Text(
              isOffline ? 'Offline — showing cached data' : 'Something went wrong',
              style: Theme.of(context).textTheme.titleMedium,
              textAlign: TextAlign.center,
            ),
            const SizedBox(height: 8),
            Text(
              message,
              style: const TextStyle(color: AppColors.textSecondary),
              textAlign: TextAlign.center,
            ),
            if (onRetry != null) ...[
              const SizedBox(height: 24),
              PrimaryButton(label: 'Retry', onPressed: onRetry, isExpanded: false),
            ],
          ],
        ),
      ),
    );
  }
}
