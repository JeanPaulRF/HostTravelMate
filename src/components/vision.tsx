import { ImageAnnotatorClient } from '@google-cloud/vision';

export async function detectLandmarks(base64Image: string): Promise<string[]> {
    try {
        const client = new ImageAnnotatorClient();
        const [result] = await client.landmarkDetection({
            image: {
                content: base64Image,
            },
        });

        const landmarks = result.landmarkAnnotations;
        // Mapea los textos de los landmarks y devuelve un array de strings
        const landmarkTexts = landmarks.map(landmark => landmark.description || '');
        return landmarkTexts;
    } catch (error) {
        console.error('Error detecting landmarks:', error);
        throw error; // Puedes manejar el error según las necesidades de tu aplicación
    }
}
