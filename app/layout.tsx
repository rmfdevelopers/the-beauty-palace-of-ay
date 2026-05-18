import { Cormorant_Garamond, Outfit } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700'] 
});

const body = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700', '800'] 
});

export const metadata = {
  title: 'The Beauty Palace of AY | Luxury Salon Lagos',
  description: 'Redefining Elegance, One Braid at a Time. Premier luxury hair and nail artistry in Lagos, Nigeria.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}