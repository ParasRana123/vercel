import express from "express"
import cors from "cors"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.post("/deploy" , (req , res) => {
    const repoUrl = req.body.repoUrl;
    console.log(repoUrl);

    res.json({});
})

app.listen(3000);