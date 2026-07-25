import type { Metadata } from 'next';
import './globals.css';
import { GlobalShell } from '@/components/GlobalShell/GlobalShell';

export const metadata: Metadata = {
  title: 'ApexTix | Formula 1 Official Ticket Access',
  description: 'The ultimate destination for official Formula 1 ticket access. Book Grandstand, VIP Paddock, and General Admission passes for the 2026 Grand Prix season.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <GlobalShell>{children}</GlobalShell>
      </body>
    </html>
  );
}
