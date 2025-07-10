import Link from 'next/link';
import WaveDivider from '@/components/WaveDivider';
import { Music, Video, Bot } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
        {/* Hintergrund-Video */}
        <video
          src="/_seed705966338.mp4" // Pfad zu Ihrem Video im public-Ordner
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
        ></video>

        {/* Dunkler Overlay für bessere Lesbarkeit */}
        <div className="absolute inset-0 bg-gradient-to-t from-nachtblau via-nachtblau/70 to-transparent"></div>

        {/* Inhalts-Container */}
        <div className="relative z-10 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-offwhite tracking-wider">
            DENIZVIBEZ
          </h1>
          <p className="mt-4 text-xl md:text-2xl font-light text-softgold">
            BUILT BY AI. MADE TO FEEL.
          </p>
          <p className="mt-8 max-w-2xl mx-auto text-offwhite/80">
            We blend artificial intelligence with human emotion to create unforgettable cinematic experiences, from evocative music to stunning visuals.
          </p>
          <Link
            href="/generator"
            className="mt-10 inline-block bg-softgold text-nachtblau font-bold py-3 px-8 rounded-full hover:bg-royalgold transition-all duration-300 transform hover:scale-105"
          >
            Start Creating
          </Link>
        </div>
      </section>

      {/* Services Teaser Section */}
      <section className="bg-nachtblau py-20 md:py-32 relative">
        {/* WaveDivider ohne Test-Border */}
        <WaveDivider className="absolute -top-1 left-0 right-0" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-cinzel text-offwhite">ARTIFICIAL AUTHENTIC EMOTIONS</h2>
          <p className="mt-4 max-w-3xl mx-auto text-offwhite/70">
            Our AI-powered suite offers a new canvas for creativity. Generate unique concepts for music, scripts for compelling videos, and visuals for your storyboards in seconds.
          </p>
          <div className="mt-16 grid md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <Music className="w-12 h-12 text-softgold" />
              <h3 className="mt-4 text-2xl font-cinzel">AI Music Concepts</h3>
              <p className="mt-2 text-offwhite/70">Generate rich, detailed concepts for soundtracks and image songs.</p>
            </div>
            <div className="flex flex-col items-center">
              <Video className="w-12 h-12 text-softgold" />
              <h3 className="mt-4 text-2xl font-cinzel">AI Video Scripts</h3>
              <p className="mt-2 text-offwhite/70">Create professional scripts for ads, social spots, and short films.</p>
            </div>
            <div className="flex flex-col items-center">
              <Bot className="w-12 h-12 text-softgold" />
              <h3 className="mt-4 text-2xl font-cinzel">AI Storyboards</h3>
              <p className="mt-2 text-offwhite/70">Visualize your scenes with stunning, AI-generated concept art.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
