import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";
import path from "path";
import { getAllFiles } from "./file";
import { uploadFile } from "./aws"
import { createClient } from "redis"

const publisher = createClient();
publisher.connect();

const subscriber = createClient();
subscriber.connect();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.post("/deploy" , async (req , res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();
    await simpleGit().clone(repoUrl , path.join(__dirname , `output/${id}`));

    const files = getAllFiles(path.join(__dirname , `output/${id}`));

    files.forEach(async file => {
    const relativePath = file.slice(path.join(__dirname).length + 1).replace(/\\/g, '/');
    await uploadFile(relativePath, file);
});


    publisher.lPush("build-queue" , id);
    publisher.hSet("status" , id , "uploaded");

    console.log(files);
    res.json({
        "id" : id
    })
})

app.get("/status" , async (req , res) => {
    const id = req.query.id;
    const response = await subscriber.hGet("status" , id as string);
    res.json({
        status: response
    })
})

app.listen(3000);