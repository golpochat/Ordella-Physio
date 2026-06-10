import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:ordella_mobile/features/appointments/screens/appointment_detail_screen.dart';
import 'package:ordella_mobile/features/appointments/screens/appointments_screen.dart';
import 'package:ordella_mobile/features/auth/providers/auth_provider.dart';
import 'package:ordella_mobile/features/auth/screens/login_screen.dart';
import 'package:ordella_mobile/features/auth/screens/register_screen.dart';
import 'package:ordella_mobile/features/auth/screens/tenant_selection_screen.dart';
import 'package:ordella_mobile/features/billing/screens/billing_detail_screen.dart';
import 'package:ordella_mobile/features/billing/screens/billing_screen.dart';
import 'package:ordella_mobile/features/dashboard/screens/role_dashboard_screen.dart';
import 'package:ordella_mobile/features/messaging/screens/conversation_screen.dart';
import 'package:ordella_mobile/features/messaging/screens/messaging_screen.dart';
import 'package:ordella_mobile/features/notes/screens/note_detail_screen.dart';
import 'package:ordella_mobile/features/notes/screens/note_form_screen.dart';
import 'package:ordella_mobile/features/notes/screens/notes_screen.dart';
import 'package:ordella_mobile/features/notifications/screens/notifications_screen.dart';
import 'package:ordella_mobile/features/profile/screens/profile_screen.dart';
import 'package:ordella_mobile/widgets/layout/main_shell.dart';

final _rootNavigatorKey = GlobalKey<NavigatorState>();

final routerProvider = Provider<GoRouter>((ref) {
  final auth = ref.watch(authProvider);
  final refresh = ValueNotifier<int>(0);
  ref.listen(authProvider, (_, __) => refresh.value++);

  return GoRouter(
    navigatorKey: _rootNavigatorKey,
    initialLocation: '/login',
    refreshListenable: refresh,
    redirect: (context, state) {
      final isInitialized = auth.isInitialized;
      final isAuthenticated = auth.isAuthenticated;
      final path = state.matchedLocation;

      final isAuthRoute = path == '/login' ||
          path == '/register' ||
          path == '/tenant-selection';

      if (!isInitialized) return null;

      if (!isAuthenticated && !isAuthRoute) {
        return '/login';
      }

      if (isAuthenticated && isAuthRoute) {
        return '/home';
      }

      return null;
    },
    routes: [
      GoRoute(path: '/login', builder: (_, __) => const LoginScreen()),
      GoRoute(path: '/register', builder: (_, __) => const RegisterScreen()),
      GoRoute(
        path: '/tenant-selection',
        builder: (_, __) => const TenantSelectionScreen(),
      ),
      StatefulShellRoute.indexedStack(
        builder: (context, state, navigationShell) {
          return MainShell(
            navigationShell: navigationShell,
            destinations: const [
              NavigationDestination(
                icon: Icon(Icons.dashboard_outlined),
                selectedIcon: Icon(Icons.dashboard),
                label: 'Home',
              ),
              NavigationDestination(
                icon: Icon(Icons.calendar_today_outlined),
                selectedIcon: Icon(Icons.calendar_today),
                label: 'Appointments',
              ),
              NavigationDestination(
                icon: Icon(Icons.note_alt_outlined),
                selectedIcon: Icon(Icons.note_alt),
                label: 'Notes',
              ),
              NavigationDestination(
                icon: Icon(Icons.receipt_long_outlined),
                selectedIcon: Icon(Icons.receipt_long),
                label: 'Billing',
              ),
              NavigationDestination(
                icon: Icon(Icons.chat_bubble_outline),
                selectedIcon: Icon(Icons.chat_bubble),
                label: 'Messages',
              ),
            ],
          );
        },
        branches: [
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/home',
                builder: (_, __) => const RoleDashboardScreen(),
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/appointments',
                builder: (_, __) => const AppointmentsScreen(),
                routes: [
                  GoRoute(
                    parentNavigatorKey: _rootNavigatorKey,
                    path: ':id',
                    builder: (_, state) =>
                        AppointmentDetailScreen(id: state.pathParameters['id']!),
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/notes',
                builder: (_, __) => const NotesScreen(),
                routes: [
                  GoRoute(
                    parentNavigatorKey: _rootNavigatorKey,
                    path: 'new',
                    builder: (_, __) => const NoteFormScreen(),
                  ),
                  GoRoute(
                    parentNavigatorKey: _rootNavigatorKey,
                    path: ':id/edit',
                    builder: (_, state) => NoteFormScreen(
                      noteId: state.pathParameters['id'],
                    ),
                  ),
                  GoRoute(
                    parentNavigatorKey: _rootNavigatorKey,
                    path: ':id',
                    builder: (_, state) =>
                        NoteDetailScreen(id: state.pathParameters['id']!),
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/billing',
                builder: (_, __) => const BillingScreen(),
                routes: [
                  GoRoute(
                    parentNavigatorKey: _rootNavigatorKey,
                    path: ':id',
                    builder: (_, state) =>
                        BillingDetailScreen(id: state.pathParameters['id']!),
                  ),
                ],
              ),
            ],
          ),
          StatefulShellBranch(
            routes: [
              GoRoute(
                path: '/messages',
                builder: (_, __) => const MessagingScreen(),
                routes: [
                  GoRoute(
                    parentNavigatorKey: _rootNavigatorKey,
                    path: ':id',
                    builder: (_, state) =>
                        ConversationScreen(id: state.pathParameters['id']!),
                  ),
                ],
              ),
            ],
          ),
        ],
      ),
      GoRoute(
        parentNavigatorKey: _rootNavigatorKey,
        path: '/notifications',
        builder: (_, __) => const NotificationsScreen(),
      ),
      GoRoute(
        parentNavigatorKey: _rootNavigatorKey,
        path: '/profile',
        builder: (_, __) => const ProfileScreen(),
      ),
    ],
  );
});
