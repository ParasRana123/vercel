import { createClient } from 'redis';
import { downloadS3Folder } from './aws';

const subscriber = createClient();

subscriber.on('error', (err: unknown) => console.error('Redis Client Error', err));

async function main() {
    await subscriber.connect();

    while (true) {
        try {
            const response = await subscriber.brPop('build-queue', 0);
            const id = response?.element;
            await downloadS3Folder(`output/${id}`);
        } catch (err) {
            console.error('Error during BRPOP:', err);
        }
    }
}

main();