// Uploading the files to the R2 Object Store on Cloud flare
import { S3 } from "aws-sdk";
import fs from "fs";
require("dotenv").config();

const s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_ENDPOINT
})

export const uploadFile = (fileName: string , localFilePath: string) => {
    const normalizedKey = fileName.replace(/\\/g, '/'); // Just in case

    const fileContent = fs.readFileSync(localFilePath);

    return s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: normalizedKey
    }).promise()
    .then((res) => {
        console.log(`✅ Uploaded: ${normalizedKey}`);
        return res;
    })
    .catch((err) => {
        console.error(`❌ Failed to upload ${normalizedKey}:`, err);
    });
};
