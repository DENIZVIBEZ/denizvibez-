export enum GenerationType {
    MusicConcept = "Music Concept",
    VideoScript = "Video Script",
    Storyboard = "Storyboard",
}

export interface GenerationResult {
    type: GenerationType;
    prompt: string;
    text?: string;
    imageUrl?: string;
}
