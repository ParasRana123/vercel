import express from "express";
import cors from "cors";
import simpleGit from "simple-git";
import { generate } from "./utils";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.post("/deploy" , async (req , res) => {
    const repoUrl = req.body.repoUrl;
    const id = generate();
    await simpleGit().clone(repoUrl , `output/${id}`);
    console.log(repoUrl);
    res.json({
        "id" : id
    });
})

app.listen(3000);