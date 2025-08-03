const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
const { S3Client , PutObjectCommand, S3Client } = require("@aws-sdk/client-s3");
const mime = require("mime-types");
require("dotenv").config();

const s3Client = new S3Client({
    region: 'auto',
    endpoint: process.env.S3_ENDPOINT,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    }
})

const PROJECT_ID = process.env.PROJECT_ID;

async function init() {
    console.log("Executing script.js");
    const outDirPath = path.join(__dirname , 'output');

    const p = exec(`cd ${outDirPath} && npm install && npm run build`);

    p.stdout.on("data" , function(data) {
        console.log(data.toString());
    })

    p.stdout.on("error" , function(data) {
        console.log("Error" , data.toString());
    })

    p.on("close" , async function () {
        console.log("Build Complete");
        const distFolderPath = path.join(__dirname , 'output' , 'dist');
        const distFolderContents = fs.readFileSync(distFolderPath , { recursive: true });

        for(const filepath of distFolderContents) {
            // Checking if the filepath is not a directory
            if(fs.lstatSync(filepath).isDirectory()) continue;

            console.log("Uploading" , filepath);

            // To put the code into the AWS S3
            const command = new PutObjectCommand({
                Bucket: process.env.BUCKET_NAME,
                Key: `__outputs/${PROJECT_ID}/${filepath}`,
                Body: fs.createReadStream(filepath),
                // To check the content type of the file bein uploaded to s3
                ContentType: mime.lookup(filepath),
            })

            await S3Client.send(command);
            console.log("Uploaded" , filepath);
        }

        console.log("Done...");
    })
}

init();