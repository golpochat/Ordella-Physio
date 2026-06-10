import 'package:flutter/material.dart';
import 'package:ordella_mobile/core/theme/app_colors.dart';
import 'package:ordella_mobile/widgets/avatars/user_avatar.dart';

class AppListTile extends StatelessWidget {
  const AppListTile({
    super.key,
    required this.title,
    this.subtitle,
    this.leadingName,
    this.trailing,
    this.onTap,
  });

  final String title;
  final String? subtitle;
  final String? leadingName;
  final Widget? trailing;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        onTap: onTap,
        leading: leadingName != null ? UserAvatar(name: leadingName!) : null,
        title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: subtitle != null
            ? Text(subtitle!, style: const TextStyle(color: AppColors.textSecondary))
            : null,
        trailing: trailing ?? (onTap != null ? const Icon(Icons.chevron_right) : null),
      ),
    );
  }
}
