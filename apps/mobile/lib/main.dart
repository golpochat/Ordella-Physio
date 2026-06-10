import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:ordella_mobile/app.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';

Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();

  final container = ProviderContainer();
  await container.read(cacheServiceProvider).init();

  runApp(
    UncontrolledProviderScope(
      container: container,
      child: const OrdellaApp(),
    ),
  );
}
