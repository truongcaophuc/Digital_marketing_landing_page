import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '../contexts/LanguageContext';
import SocialMediaFloat from '../components/SocialMediaFloat';
import ChatwootWidget from '../components/ChatwootWidget';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Digital Marketing Agency - Grow Your Business Online',
  description: 'Professional digital marketing services including SEO, social media marketing, paid advertising, and content marketing. Transform your business with our proven strategies.',
  keywords: 'digital marketing, SEO, social media marketing, paid advertising, content marketing, online marketing, business growth',
  authors: [{ name: 'Digital Agency' }],
  creator: 'Digital Agency',
  publisher: 'Digital Agency',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://digitalagency.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Digital Marketing Agency - Grow Your Business Online',
    description: 'Professional digital marketing services to transform your business with proven strategies.',
    url: 'https://digitalagency.com',
    siteName: 'Digital Agency',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Marketing Agency',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Agency - Grow Your Business Online',
    description: 'Professional digital marketing services to transform your business with proven strategies.',
    images: ['/og-image.jpg'],
    creator: '@digitalagency',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0891b2" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50`}>
        <LanguageProvider>
          <div className="min-h-screen">
            {children}
            <SocialMediaFloat />
            <ChatwootWidget />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
