import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Olavarría en Verano 2027', description: 'Agenda de actividades de Olavarría. Verano 2027.' };
export default function RootLayout({ children }: Readonly<{
    children: React.ReactNode;
}>) { return <html lang="es-AR"><body>{children}</body></html>; }
