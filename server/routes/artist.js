const router = require("express").Router();
//Our artist model
const artist = require("../models/artist");


router.post("/save", async (req, res) => {
    const newArtist = artist(
        {
            name : req.body.name,
            imageURL : req.body.imageURL,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
        }
    )
    try {
        const savedArtist = await newArtist.save();
        return res.status(200).send({success : true, artist : savedArtist});
    } catch (error) {
        return res.status(400).send({success : false, msg: error});
    }
})

router.get("/getOne/:id", async(req, res) => {
    const filter = {_id: req.params.id};

    const data = await artist.findOne(filter);

    if (data) {
        return res.status(200).send({success : true, artist : data});
    } else {
        return res.status(400).send({success : false, msg: "Data not found"});
    }
})

router.get("/getAll", async (req, res) => {
    const options = {
        sort : {
            createdAt : 1,
        },
    }
    const data = await artist.find(options);
    if (data) {
        return res.status(200).send({success : true, artist : data});
    } else {
        return res.status(400).send({success : false, msg: "Data not found"});
    }
});

router.put("/update/:id", async(req, res) => {

    const filter ={_id : req.params.id};
    const options ={
        upsert : true,
        new : true
    };
    try {
        const result = await artist.findOneAndUpdate(filter, {
            name : req.body.name,
            imageURL : req.body.imageURL,
            instagram: req.body.instagram,
            twitter: req.body.twitter,
        }, options)

        return res.status(200).send({success : true, data : result});
    } catch (error) {
        return res.status(400).send({success : false, msg: error});
    }
})

router.delete("/delete/:id", async (req, res) => {
    const filter = {_id: req.params.id};

    const result = await artist.deleteOne(filter);
    if (result) {
        return res.status(200).send({success : true, msg: "Data deleted successfully", data: result});
    } else {
        return res.status(400).send({success : false, msg: "Data not found"});
    }
})
module.exports = router;