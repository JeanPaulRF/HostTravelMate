// vision.tsx

import { ImageAnnotatorClient } from '@google-cloud/vision';

export async function detectLandmarks(base64Image: string): Promise<void> {
    try {
        const client = new ImageAnnotatorClient();
        const [result] = await client.landmarkDetection({
            image: {
                content: base64Image,
            },
        });

        const landmarks = result.landmarkAnnotations;
        console.log('Landmarks:');
        landmarks.forEach(landmark => console.log(landmark));
    } catch (error) {
        console.error('Error detecting landmarks:', error);
        throw error; // Puedes manejar el error según las necesidades de tu aplicación
    }
}
