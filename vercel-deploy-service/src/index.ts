import { createClient } from 'redis';

const subscriber = createClient();

subscriber.on('error', (err: unknown) => console.error('Redis Client Error', err));

async function main() {
    await subscriber.connect();

    while (true) {
        try {
            const response = await subscriber.brPop('build-queue', 0);
            console.log('Received from queue:', response);
        } catch (err) {
            console.error('Error during BRPOP:', err);
        }
    }
}

main();