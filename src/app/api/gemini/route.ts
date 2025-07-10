import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    // Wenn der API_KEY nicht geladen wird, geben wir das direkt zurück
    return NextResponse.json(
      {
        error: 'Server configuration error: GEMINI_API_KEY is NOT set in environment variables.',
        details: 'Please ensure .env.local is in the project root and contains GEMINI_API_KEY=YOUR_KEY.',
        env_vars_present: Object.keys(process.env).length > 0 // Prüfen, ob überhaupt Env-Variablen geladen werden
      },
      { status: 500 }
    );
  }

  // Wenn der API_KEY geladen wird, fahren wir mit der normalen Logik fort
  const genAI = new GoogleGenerativeAI(API_KEY);

  try {
    const { prompt, type } = await request.json();

    if (!prompt || !type) {
      return NextResponse.json({ error: 'Prompt and type are required.' }, { status: 400 });
    }

    let modelName = '';
    let fullPrompt = '';

    if (type === "Music Concept" || type === "Video Script") {
      modelName = "gemini-pro";
      const model = genAI.getGenerativeModel({ model: modelName }); // Model hier definieren, da es hier verwendet wird
      if (type === "Music Concept") {
        fullPrompt = `Generate a detailed music concept based on the following idea: "${prompt}". Include genre, mood, instrumentation, and a brief narrative.`;
      } else if (type === "Video Script") {
        fullPrompt = `Write a short video script (30-60 seconds) based on the following idea: "${prompt}". Include scene descriptions, dialogue (if any), and a clear message.`;
      }
      const result = await model.generateContent(fullPrompt);
      const response = await result.response;
      const text = response.text();
      return NextResponse.json({ text });

    } else if (type === "Storyboard") {
      modelName = "gemini-pro-vision";
      console.warn("Image generation via Gemini-Pro-Vision is a placeholder. Consider a dedicated image generation API.");
      const model = genAI.getGenerativeModel({ model: modelName }); // Model hier definieren, da es hier verwendet wird
      return NextResponse.json({ imageUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==" });
    }

    return NextResponse.json({ error: 'Invalid generation type.' }, { status: 400 });

  } catch (error: unknown) { // Typ von 'any' zu 'unknown' geändert
    console.error("API Route Error during content generation:", error);

    let errorMessage = 'An unexpected error occurred during generation.';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = (error as { message: string }).message; // Typ-Assertion für den Zugriff auf 'message'
    } else if (typeof error === 'string') {
        errorMessage = error;
    }

    // Zusätzliche Prüfungen für spezifische Fehlerobjekte, falls die API sie zurückgibt
    const apiError = error as { response?: { status?: number; data?: { error?: { message?: string } } }; message?: string };

    if (apiError.response && apiError.response.status) {
        errorMessage = `Gemini API Error: Status ${apiError.response.status}`;
        if (apiError.response.data && apiError.response.data.error && apiError.response.data.error.message) {
            errorMessage += ` - ${apiError.response.data.error.message}`;
        }
    } else if (apiError.message && apiError.message.includes("API key not valid")) {
        errorMessage = "Gemini API Error: API key not valid. Please check your .env.local file.";
    } else if (apiError.message && apiError.message.includes("403 Forbidden")) {
        errorMessage = "Gemini API Error: 403 Forbidden. Check API key permissions or project settings.";
    } else if (apiError.message && apiError.message.includes("429 Too Many Requests")) {
        errorMessage = "Gemini API Error: 429 Too Many Requests. You have exceeded your quota.";
    }


    return NextResponse.json({ error: `Server Error: ${errorMessage}` }, { status: 500 });
  }
}
