import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'ZeBook - Assistente Jurídico',
  description: 'Chatbot especializado em conteúdo jurídico para concursos públicos',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}