export const dynamic = 'force-dynamic';

import AuthGate from '@/components/AuthGate';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGate>
      {children}
    </AuthGate>
  );
}
