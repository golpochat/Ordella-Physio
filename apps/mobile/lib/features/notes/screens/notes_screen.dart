import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/core/routing/role_routes.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/lists/app_list_tile.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

final notesProvider = FutureProvider.autoDispose<List<ClinicalNote>>((ref) {
  final service = ref.watch(notesServiceProvider);
  final user = ref.watch(authProvider).user;
  final role = user?.role ?? '';

  if (role == 'THERAPIST') {
    return service.listNotes(therapistId: user?.id);
  }
  return service.listNotes(patientId: user?.id);
});

class NotesScreen extends ConsumerWidget {
  const NotesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(notesProvider);
    final canWrite = RoleRoutes.canWriteNotes(ref.watch(authProvider).roles);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Clinical Notes'),
        actions: [
          if (canWrite)
            IconButton(
              icon: const Icon(Icons.add),
              onPressed: () => context.push('/notes/new'),
            ),
        ],
      ),
      body: async.when(
        loading: () => const LoadingView(message: 'Loading notes...'),
        error: (e, _) => ErrorView(
          message: e.toString(),
          isOffline: e.toString().contains('SocketException'),
          onRetry: () => ref.invalidate(notesProvider),
        ),
        data: (items) {
          if (items.isEmpty) {
            return const Center(child: Text('No notes found'));
          }
          return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: items.length,
            itemBuilder: (context, index) {
              final note = items[index];
              return AppListTile(
                title: note.type,
                subtitle: note.content.length > 80
                    ? '${note.content.substring(0, 80)}...'
                    : note.content,
                onTap: () => context.push('/notes/${note.id}'),
              );
            },
          );
        },
      ),
    );
  }
}
