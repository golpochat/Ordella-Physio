import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/common/models/auth_user.dart';
import 'package:ordella_mobile/core/theme/app_colors.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/widgets/loading/loading_view.dart';

class TenantSelectionScreen extends ConsumerStatefulWidget {
  const TenantSelectionScreen({super.key});

  @override
  ConsumerState<TenantSelectionScreen> createState() =>
      _TenantSelectionScreenState();
}

class _TenantSelectionScreenState extends ConsumerState<TenantSelectionScreen> {
  List<TenantEntry> _tenants = [];
  bool _loading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _loadTenants();
  }

  Future<void> _loadTenants() async {
    setState(() {
      _loading = true;
      _error = null;
    });
    try {
      final tenants = await ref.read(tenantServiceProvider).fetchTenants();
      setState(() => _tenants = tenants);
    } catch (e) {
      setState(() => _error = e.toString());
    } finally {
      setState(() => _loading = false);
    }
  }

  Future<void> _selectTenant(TenantEntry tenant) async {
    await ref.read(authProvider.notifier).selectTenant(tenant.id);
    if (mounted) context.pop();
  }

  @override
  Widget build(BuildContext context) {
    final selectedId = ref.watch(authProvider).tenantId;

    return Scaffold(
      appBar: AppBar(title: const Text('Select Clinic')),
      body: _loading
          ? const LoadingView(message: 'Loading clinics...')
          : _error != null
              ? Center(child: Text(_error!, style: const TextStyle(color: AppColors.error)))
              : ListView.builder(
                  padding: const EdgeInsets.all(16),
                  itemCount: _tenants.length,
                  itemBuilder: (context, index) {
                    final tenant = _tenants[index];
                    final isSelected = tenant.id == selectedId;

                    return Card(
                      child: ListTile(
                        title: Text(tenant.name),
                        subtitle: Text(tenant.slug ?? tenant.id),
                        trailing: isSelected
                            ? const Icon(Icons.check_circle, color: AppColors.primary)
                            : null,
                        onTap: () => _selectTenant(tenant),
                      ),
                    );
                  },
                ),
    );
  }
}
