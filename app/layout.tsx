// import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Title',
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
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
