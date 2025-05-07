import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';
import { Providers } from '@/app/providers';

import { Work_Sans } from 'next/font/google';

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-work-sans',
});

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'sr-Latn' }];
}

interface Props {
  children: ReactNode;
  params: {
    lang: string;
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const lang = params.lang;
  let messages;

  try {
    messages = (await import(`@/messages/${lang}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={lang} className={workSans.className}>
      <body>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <Providers>
            <Navigation />
            <main>
              {children}
            </main>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
