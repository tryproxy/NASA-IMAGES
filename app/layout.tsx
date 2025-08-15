import './globals.css';
import { Metadata } from 'next';
import { AppLayout } from '../widgets/AppLayout/AppLayout';
import { Providers } from './providers';

// eslint-disable-next-line react-refresh/only-export-components
export const metadata: Metadata = {
  title: 'NASA IMAGES',
  description: 'NASA IMAGES',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
