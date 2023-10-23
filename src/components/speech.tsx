

import { SpeechClient } from "@google-cloud/speech";

export async function syncRecognize(
    filename,
    encoding,
    sampleRateHertz,
    languageCode
) {
    try {

        // Imports the Google Cloud client library
        const fs = require('fs');

        // Creates a client
        const client = new SpeechClient();

        /**
         * TODO(developer): Uncomment the following lines before running the sample.
         */
        // const filename = 'Local path to audio file, e.g. /path/to/audio.raw';
        // const encoding = 'Encoding of the audio file, e.g. LINEAR16';
        // const sampleRateHertz = 16000;
        // const languageCode = 'BCP-47 language code, e.g. en-US';

        const config = {
            encoding: encoding,
            sampleRateHertz: sampleRateHertz,
            languageCode: languageCode,
        };
        const audio = {
            content: fs.readFileSync(filename).toString('base64'),
        };

        const request = {
            config: config,
            audio: audio,
        };

        // Detects speech in the audio file
        const [response] = await client.recognize(request);
        const transcription = response.results
            .map(result => result.alternatives[0].transcript)
            .join('\n');
        console.log('Transcription: ', transcription);
    } catch (error) {
        console.error('Error detecting speech:', error);
        throw error; // Puedes manejar el error según las necesidades de tu aplicación
    }
}
