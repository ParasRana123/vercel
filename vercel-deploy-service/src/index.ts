import { createClient } from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";
import { buildProject } from "./utils";

// Create Redis clients
const subscriber = createClient();
const publisher = createClient();

// Connect both clients
async function connectClients() {
  try {
    await subscriber.connect();
    await publisher.connect();
    console.log("Connected to Redis");
  } catch (err) {
    console.error("Redis connection error:", err);
    process.exit(1);
  }
}

async function main() {
  await connectClients();

  while (true) {
    try {
      const res = await subscriber.brPop('build-queue', 0);
      if (!res || !res.element) {
        console.warn("No element received from queue");
        continue;
      }

      const id = res.element;
      console.log("Received build ID:", id);

      await downloadS3Folder(`output/${id}`);
      await buildProject(id);
      copyFinalDist(id);
    } catch (err) {
      console.error("Error processing job:", err);
    }
  }
}

main();