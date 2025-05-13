import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
