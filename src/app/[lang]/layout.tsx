import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Providers } from '@/app/providers';

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
  const { lang } = await params;
  let messages;

  try {
    messages = (await import(`@/messages/${lang}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={lang} messages={messages}>
      <Providers>
        <main>
          {children}
        </main>
      </Providers>
    </NextIntlClientProvider>
  );
}
