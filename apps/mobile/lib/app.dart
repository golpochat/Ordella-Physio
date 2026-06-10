import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ordella_mobile/core/routing/app_router.dart';
import 'package:ordella_mobile/core/theme/app_theme.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

class OrdellaApp extends ConsumerWidget {
  const OrdellaApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    final auth = ref.watch(authProvider);

    return MaterialApp.router(
      title: 'Ordella Physio',
      theme: AppTheme.light,
      routerConfig: router,
      builder: (context, child) {
        if (!auth.isInitialized) {
          return const Scaffold(body: LoadingView(message: 'Starting app...'));
        }
        return child ?? const SizedBox.shrink();
      },
    );
  }
}
