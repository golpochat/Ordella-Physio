import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/common/models/domain_models.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/notes/screens/note_detail_screen.dart';
import 'package:ordella_mobile/features/notes/screens/notes_screen.dart';
import 'package:ordella_mobile/widgets/buttons/primary_button.dart';
import 'package:ordella_mobile/widgets/inputs/app_text_field.dart';

class NoteFormScreen extends ConsumerStatefulWidget {
  const NoteFormScreen({super.key, this.noteId});

  final String? noteId;

  @override
  ConsumerState<NoteFormScreen> createState() => _NoteFormScreenState();
}

class _NoteFormScreenState extends ConsumerState<NoteFormScreen> {
  final _formKey = GlobalKey<FormState>();
  final _typeController = TextEditingController(text: 'progress');
  final _contentController = TextEditingController();
  final _patientIdController = TextEditingController();
  bool _loading = false;
  bool _initialized = false;

  @override
  void dispose() {
    _typeController.dispose();
    _contentController.dispose();
    _patientIdController.dispose();
    super.dispose();
  }

  Future<void> _loadNote() async {
    if (widget.noteId == null || _initialized) return;
    final note = await ref.read(notesServiceProvider).getNote(widget.noteId!);
    _typeController.text = note.type;
    _contentController.text = note.content;
    _patientIdController.text = note.patientId;
    setState(() => _initialized = true);
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    final user = ref.read(authProvider).user;
    if (user == null) return;

    setState(() => _loading = true);

    try {
      final service = ref.read(notesServiceProvider);
      if (widget.noteId != null) {
        final draft = ClinicalNote(
          id: widget.noteId!,
          tenantId: user.tenantId,
          patientId: _patientIdController.text.trim(),
          therapistId: user.id,
          type: _typeController.text.trim(),
          content: _contentController.text.trim(),
        );
        await service.updateNote(widget.noteId!, draft);
        ref.invalidate(noteDetailProvider(widget.noteId!));
      } else {
        final draft = ClinicalNote(
          id: '',
          tenantId: user.tenantId,
          patientId: _patientIdController.text.trim(),
          therapistId: user.id,
          type: _typeController.text.trim(),
          content: _contentController.text.trim(),
        );
        await service.createNote(draft);
      }
      ref.invalidate(notesProvider);
      if (mounted) context.pop();
    } finally {
      if (mounted) setState(() => _loading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (widget.noteId != null && !_initialized) {
      _loadNote();
    }

    return Scaffold(
      appBar: AppBar(
        title: Text(widget.noteId == null ? 'New Note' : 'Edit Note'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Form(
          key: _formKey,
          child: Column(
            children: [
              AppTextField(
                label: 'Patient ID',
                controller: _patientIdController,
                validator: (v) => v == null || v.isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: 'Type',
                controller: _typeController,
                validator: (v) => v == null || v.isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 16),
              AppTextField(
                label: 'Content',
                controller: _contentController,
                maxLines: 8,
                validator: (v) => v == null || v.isEmpty ? 'Required' : null,
              ),
              const SizedBox(height: 24),
              PrimaryButton(
                label: widget.noteId == null ? 'Create Note' : 'Save Changes',
                isLoading: _loading,
                onPressed: _submit,
              ),
            ],
          ),
        ),
      ),
    );
  }
}
