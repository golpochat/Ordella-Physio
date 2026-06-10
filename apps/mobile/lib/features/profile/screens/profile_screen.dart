import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/buttons/primary_button.dart';
import 'package:ordella_mobile/widgets/cards/info_card.dart';
import 'package:ordella_mobile/widgets/inputs/app_text_field.dart';

class ProfileScreen extends ConsumerStatefulWidget {
  const ProfileScreen({super.key});

  @override
  ConsumerState<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends ConsumerState<ProfileScreen> {
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  bool _editing = false;
  bool _saving = false;

  @override
  void initState() {
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((_) => _syncFromUser());
  }

  void _syncFromUser() {
    final user = ref.read(authProvider).user;
    _firstNameController.text = user?.firstName ?? '';
    _lastNameController.text = user?.lastName ?? '';
  }

  @override
  void dispose() {
    _firstNameController.dispose();
    _lastNameController.dispose();
    super.dispose();
  }

  Future<void> _save() async {
    setState(() => _saving = true);
    try {
      final updated = await ref.read(profileServiceProvider).updateProfile(
            firstName: _firstNameController.text.trim(),
            lastName: _lastNameController.text.trim(),
          );
      ref.read(authProvider.notifier).updateUser(updated);
      setState(() => _editing = false);
    } finally {
      if (mounted) setState(() => _saving = false);
    }
  }

  Future<void> _logout() async {
    await ref.read(authProvider.notifier).logout();
    if (mounted) context.go('/login');
  }

  @override
  Widget build(BuildContext context) {
    final user = ref.watch(authProvider).user;
    final tenantId = ref.watch(authProvider).tenantId;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
        actions: [
          IconButton(
            icon: Icon(_editing ? Icons.close : Icons.edit),
            onPressed: () {
              if (_editing) _syncFromUser();
              setState(() => _editing = !_editing);
            },
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          InfoCard(
            title: user?.displayName ?? 'User',
            subtitle: user?.email ?? '',
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Role: ${user?.role ?? '-'}'),
                const SizedBox(height: 4),
                Text('Tenant: ${tenantId ?? user?.tenantId ?? '-'}'),
              ],
            ),
          ),
          const SizedBox(height: 16),
          if (_editing) ...[
            AppTextField(
              label: 'First Name',
              controller: _firstNameController,
            ),
            const SizedBox(height: 16),
            AppTextField(
              label: 'Last Name',
              controller: _lastNameController,
            ),
            const SizedBox(height: 16),
            PrimaryButton(
              label: 'Save Profile',
              isLoading: _saving,
              onPressed: _save,
            ),
          ],
          const SizedBox(height: 16),
          SecondaryButton(
            label: 'Change Clinic / Tenant',
            onPressed: () => context.push('/tenant-selection'),
          ),
          const SizedBox(height: 16),
          SecondaryButton(
            label: 'Sign Out',
            onPressed: _logout,
          ),
        ],
      ),
    );
  }
}
