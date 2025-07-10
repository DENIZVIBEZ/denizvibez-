'use client'; // Wichtig, weil wir interaktive Hooks wie useState verwenden

import React, { useState, useCallback } from 'react';
import { GenerationType, GenerationResult } from '@/types'; // Korrigierter Pfad
import { generateText, generateImage } from '@/services/geminiService'; // Korrigierter Pfad
import LoadingSpinner from '@/components/LoadingSpinner'; // Korrigierter Pfad
import Image from 'next/image'; // Importiere die Image-Komponente von Next.js

export default function GeneratorPage() {
  const [generationType, setGenerationType] = useState<GenerationType>(GenerationType.MusicConcept);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      if (generationType === GenerationType.MusicConcept || generationType === GenerationType.VideoScript) {
        const textResult = await generateText(prompt, generationType);
        setResult({ type: generationType, text: textResult, prompt });
      } else if (generationType === GenerationType.Storyboard) {
        const imageUrl = await generateImage(prompt);
        if(imageUrl.startsWith('data:image')){
            setResult({ type: generationType, imageUrl: imageUrl, prompt });
        } else {
            setError(imageUrl); // Display error from service
        }
      }
    } catch (e) {
      setError('An unexpected error occurred.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, generationType]);

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="mt-8 p-6 bg-black/10 border border-white/10 rounded-lg animate-fade-in-up">
        <h3 className="text-xl font-cinzel text-softgold">Generated {result.type}</h3>
        <p className="text-sm text-offwhite/60 mb-4 italic">Based on prompt: &quot;{result.prompt}&quot;</p>
        {result.text && <pre className="whitespace-pre-wrap font-opensans text-offwhite">{result.text}</pre>}
        {result.imageUrl && (
          <div className="relative w-full h-96 mt-4 rounded-lg overflow-hidden"> {/* Container für responsives Bild */}
            <Image
              src={result.imageUrl}
              alt="Generated storyboard"
              fill={true} // Bild füllt den Container aus
              style={{ objectFit: 'contain' }} // Bild wird skaliert, um in den Container zu passen
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsives Größen-Attribut
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-cinzel">Creative AI Generator</h1>
        <p className="mt-4 text-offwhite/80">Select a service, describe your vision, and let our AI bring it to life.</p>
      </div>

      <div className="mt-12 max-w-3xl mx-auto p-8 bg-black/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl">
        <div className="grid grid-cols-3 gap-2 rounded-lg bg-nachtblau/50 p-1 mb-6">
          {(Object.values(GenerationType)).map(type => (
            <button
              key={type}
              onClick={() => setGenerationType(type)}
              className={`py-2 px-4 rounded-md text-sm font-semibold transition-colors duration-300 ${generationType === type ? 'bg-softgold text-nachtblau' : 'text-offwhite hover:bg-white/10'}`}
            >
              {type}
            </button>
          ))}
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={`e.g., &quot;A melancholic piano melody for a rainy scene&quot; for ${generationType}...`}
          className="w-full h-32 p-3 bg-white/5 border border-white/20 rounded-lg text-offwhite focus:ring-2 focus:ring-softgold focus:outline-none transition"
        />

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="mt-6 w-full bg-softgold text-nachtblau font-bold py-3 px-8 rounded-full hover:bg-royalgold transition-all duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? <LoadingSpinner /> : 'Generate'}
        </button>

        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>

      {(isLoading && !result) && (
        <div className="mt-8">
            <p className="text-center text-softgold">Generating... this may take a moment, especially for images.</p>
        </div>
      )}
      {renderResult()}
    </div>
  );
};
