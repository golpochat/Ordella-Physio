import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/core/routing/role_routes.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/notes/screens/notes_screen.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';
import 'package:ordella_mobile/widgets/error/error_view.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';
import 'package:ordella_mobile/widgets/modals/confirm_dialog.dart';

final noteDetailProvider =
    FutureProvider.autoDispose.family<ClinicalNote, String>((ref, id) {
  return ref.watch(notesServiceProvider).getNote(id);
});

class NoteDetailScreen extends ConsumerWidget {
  const NoteDetailScreen({super.key, required this.id});

  final String id;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final async = ref.watch(noteDetailProvider(id));
    final canWrite = RoleRoutes.canWriteNotes(ref.watch(authProvider).roles);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Note Details'),
        actions: [
          if (canWrite)
            IconButton(
              icon: const Icon(Icons.edit),
              onPressed: () => context.push('/notes/$id/edit'),
            ),
          if (canWrite)
            IconButton(
              icon: const Icon(Icons.delete_outline),
              onPressed: () async {
                final confirmed = await showConfirmDialog(
                  context: context,
                  title: 'Delete Note',
                  message: 'This action cannot be undone.',
                  confirmLabel: 'Delete',
                  isDestructive: true,
                );
                if (confirmed == true) {
                  await ref.read(notesServiceProvider).deleteNote(id);
                  ref.invalidate(notesProvider);
                  if (context.mounted) context.pop();
                }
              },
            ),
        ],
      ),
      body: async.when(
        loading: () => const LoadingView(),
        error: (e, _) => ErrorView(
          message: e.toString(),
          onRetry: () => ref.invalidate(noteDetailProvider(id)),
        ),
        data: (note) => ListView(
          padding: const EdgeInsets.all(16),
          children: [
            InfoCard(
              title: note.type,
              subtitle: note.createdAt ?? '',
              child: Text(note.content),
            ),
          ],
        ),
      ),
    );
  }
}
