import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lucky Wheel - Free Online Spinning Wheel for Games & Prizes',
  description: 'Spin the wheel of fortune and win amazing prizes! Perfect for games, giveaways, raffles, and decision making. Free online spinning wheel with customizable options and fair random selection.',
  keywords: 'spinning wheel, wheel of fortune, lucky wheel, spin wheel, random picker, prize wheel, roulette, decision maker, raffle wheel, game wheel, prize generator, random selector, spin game, online wheel, giveaway wheel',
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1.0',
  
  // Open Graph
  openGraph: {
    type: 'website',
    title: 'Lucky Wheel - Free Online Spinning Wheel for Games & Prizes',
    description: 'Spin the wheel of fortune and win amazing prizes! Perfect for games, giveaways, raffles, and decision making.',
    url: '/spin',
    images: [
      {
        url: '/meta/image.jpeg',
        width: 1200,
        height: 630,
        alt: 'Lucky Wheel Game',
      },
    ],
  },
  
  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Lucky Wheel - Free Online Spinning Wheel for Games & Prizes',
    description: 'Spin the wheel of fortune and win amazing prizes! Perfect for games, giveaways, raffles, and decision making.',
    images: ['/meta/image.jpeg'],
  },
};

export default function SpinLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
