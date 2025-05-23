
import { createClient, commandOptions } from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";
import { buildProject } from "./utils";
const subscriber = createClient();
subscriber.connect();

const publisher = createClient();
publisher.connect();

async function main() {
    while(1) {
        const res = await subscriber.brPop(
            commandOptions({ isolated: true }),
            'build-queue',
            0
          );
        // @ts-ignore;
        const id = res.element
        
        await downloadS3Folder(`output/${id}`)
        console.log("Downloaded from S3");
        await buildProject(id);
        console.log("Build Finished");
        copyFinalDist(id);
        publisher.hSet("status", id, "deployed")
    }
}
main();