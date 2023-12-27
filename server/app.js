const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv/config")
const {default : mongoose} = require("mongoose");

app.use(cors({origin : true}));
app.use(express.json());

app.get("/", (req, res) => {
    return res.json("COMS 319")
})

const userRoute = require("./routes/auth");
app.use("/api/users/", userRoute);

// Artist Routes
const artistRoutes = require("./routes/artist");
app.use("/api/artist/", artistRoutes);

// Album Routes
const albumRoutes = require("./routes/album");
app.use("/api/album/", albumRoutes);

// Songs Routes
const songRoutes = require("./routes/songs");
app.use("/api/songs/", songRoutes);

mongoose.connect("mongodb+srv://admin:admin@cluster0.yvc51gi.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser : true});
mongoose.connection
.once("open", () => console.log("connected"))
.on("error", (error) => {
    console.log(error)})

app.listen(4000, () => console.log("Listening to port 4000"));

