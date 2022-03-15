import express from "express"
import ArtikelModel from "./models/ArtikelSchema.js"
import cors from "cors"
import dotenv from "dotenv"
import { connectToMongodb } from "./libs/datanbank.js"

//connect to database
dotenv.config();
await connectToMongodb()

// configure app
const app = express();
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));


// Return all entries to the client side
app.get("/getEntries", (req, res) => {
    ArtikelModel.find({}, (err, result) => {

        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    })
})

// Create new item in database 
app.post('/postErschaffen', async (req, res) => {
    const postlInfo = req.body
    const neuPost = new ArtikelModel(postlInfo)
    await neuPost.save()
    res.json(postlInfo)
})

// Update entries 
app.patch('/bearbeiten', async (req, res) => {
    const result = await ArtikelModel.findOneAndUpdate({ _id: req.body._id },
        {
            material: req.body.material,
            chargenNr: req.body.chargenNr,
            menge: req.body.menge
        },
        { new: true })

    if (!result) {
        res.status(400).json({ message: "Failed to update!" })
    } else {
        console.log(res)
        return res.status(201).json(result)
    }
})

app.use((req, res) => {
	res.status(404);
	res.json({ error: "Resource not found 😥" });
});

// Launch Server
app.listen(process.env.PORT, () => {
    console.log("Listening on http://localhost:" + process.env.PORT);
});

