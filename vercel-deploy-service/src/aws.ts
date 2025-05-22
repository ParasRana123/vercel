import { S3 } from "aws-sdk";
import fs from "fs";
import path, { resolve } from "path";
require("dotenv").config();

const s3 = new S3({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    endpoint: process.env.S3_ENDPOINT
});

const UPLOAD_BASE_PATH = path.resolve("C:/1_Paras Admissions/1_IIIT Nagpur/PROJECTS/vercel/vercel-upload-service/dist");

export async function downloadS3Folder(prefix: string) {
    const allFiles = await s3.listObjectsV2({
        Bucket: "vercel",
        Prefix: prefix
    }).promise();

    const allPromises = allFiles.Contents?.map(async ({ Key }) => {
        return new Promise(async (resolve) => {
            if (!Key) {
                resolve("");
                return;
            }

            const finalOutputPath = path.join(UPLOAD_BASE_PATH, Key);  // changed from __dirname
            const dirName = path.dirname(finalOutputPath);

            if (!fs.existsSync(dirName)) {
                fs.mkdirSync(dirName, { recursive: true });
            }

            const outputFile = fs.createWriteStream(finalOutputPath);
            s3.getObject({ Bucket: "vercel", Key })
                .createReadStream()
                .pipe(outputFile)
                .on("finish", () => {
                    resolve("");
                });
        });
    }) || [];

    console.log("awaiting");
    await Promise.all(allPromises.filter(x => x !== undefined));
}

export function copyFinalDist(id: string) {
    const folderPath = path.join(UPLOAD_BASE_PATH, `output/${id}/dist`); // changed from __dirname
    const allFiles = getAllFiles(folderPath);
    
    allFiles.forEach(file => {
        const relativePath = file.slice(folderPath.length + 1); // strip the local path
        uploadFile(`dist/${id}/${relativePath}`, file); // use S3-friendly path
    });
}

const getAllFiles = (folderPath: string): string[] => {
    if (!fs.existsSync(folderPath)) {
        console.error("❌ Folder not found:", folderPath);
        return [];
    }

    let response: string[] = [];

    const allFilesAndFolders = fs.readdirSync(folderPath);
    allFilesAndFolders.forEach(file => {
        const fullFilePath = path.join(folderPath, file);
        const stat = fs.statSync(fullFilePath);

        if (stat.isDirectory()) {
            response = response.concat(getAllFiles(fullFilePath));
        } else {
            response.push(fullFilePath);
        }
    });

    return response;
};

// Upload file to S3
const uploadFile = async (fileName: string, localFilePath: string) => {
    if (!fs.existsSync(localFilePath)) {
        console.error("❌ File not found:", localFilePath);
        return;
    }

    const fileContent = fs.readFileSync(localFilePath);
    
    const response = await s3.upload({
        Body: fileContent,
        Bucket: "vercel",
        Key: fileName, // e.g. relative path inside S3
    }).promise();

    console.log("✅ Uploaded:", response.Key);
};