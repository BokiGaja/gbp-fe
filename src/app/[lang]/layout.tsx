import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Navigation } from '@/components/Navigation';

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
    <html lang={lang}>
      <body>
        <NextIntlClientProvider locale={lang} messages={messages}>
          <Navigation />
          <main>
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
