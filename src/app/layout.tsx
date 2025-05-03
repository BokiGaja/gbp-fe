import './globals.css';

import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={workSans.className}>
      {children}
    </div>
  );
}
