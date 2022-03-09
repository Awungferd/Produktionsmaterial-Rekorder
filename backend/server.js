import express from "express"
import ArtikelModel from "./models/ArtikelSchema.js"
import cors from "cors"
import dotenv from "dotenv"
import {connectToMongodb} from "./libs/datanbank.js"

//connect to database
dotenv.config();
await connectToMongodb()

// configure app
const app = express();
app.use(express.json())
app.use(cors())
// app.use(express.urlencoded({ extended: true }));

// Returns data to the client side
app.get("/getEntries", (req, res) => {
    ArtikelModel.find({}, (err, result) => {

        if (err) {
            res.json(err)
        } else {
            res.json(result);
        }
    })
})

// Create new datatAdd data in database with the following endpoint 

app.post('/postErschaffen', async(req, res) => {
    const postlInfo = req.body
    const neuPost = new ArtikelModel(postlInfo)
    await neuPost.save()

    res.json(postlInfo)
})


app.listen(process.env.PORT, () => {
	console.log("Listening on http://localhost:" + process.env.PORT);
});