import { GenerationType, GenerationResult } from '@/types'; // Korrigierter Pfad

// Diese Funktionen rufen jetzt unsere eigene Next.js API Route auf
const API_ROUTE_URL = '/api/gemini';

export async function generateText(prompt: string, type: GenerationType): Promise<string> {
    const response = await fetch(API_ROUTE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        // Wir werfen den detaillierten Fehler vom Server weiter
        throw new Error(errorData.error || 'Failed to generate text from API route.');
    }

    const data = await response.json();
    return data.text;
}

export async function generateImage(prompt: string): Promise<string> {
    const response = await fetch(API_ROUTE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, type: GenerationType.Storyboard }), // Typ für Bildgenerierung
    });

    if (!response.ok) {
        const errorData = await response.json();
        // Wir werfen den detaillierten Fehler vom Server weiter
        throw new Error(errorData.error || 'Failed to generate image from API route.');
    }

    const data = await response.json();
    return data.imageUrl;
}
