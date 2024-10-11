const router = require("express").Router();
const { request } = require("express");
let score = require("../../models/Score/scoreModels.js");

router.route("/add").post((req,res)=>{
    const Cname = req.body.Cname;
    const Category = req.body.Category;
    const Performance = req.body.Performance;
    const Costume = req.body.Costume;
    const Technique = req.body.Technique;
    const Timing = req.body.Timing;
    const Feedback = req.body.Feedback;

    const newScore = new score({
        Cname,
        Category,
        Performance,
        Costume,
        Technique,
        Timing,
        Feedback
    })

    newScore.save().then(()=>{
        res.json("Score Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{
    score.find().then((score)=>{
        res.json(score)
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/update/:id").put(async (req, res) => {
    let scoreid = req.params.id;
    const { Performance, Costume, Technique, Timing, Feedback } = req.body;

    const updatescore = {
        Performance,
        Costume,
        Technique,
        Timing,
        Feedback
    }

    try {
        const updatedScore = await score.findByIdAndUpdate(scoreid, updatescore);
        res.status(200).send({ status: "Score updated" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Score update unsuccessful", error: err.message });
    }
})


    router.route("/delete/:id").delete(async (req,res)=>{
        let userid = req.params.id;
        
        await score.findByIdAndDelete(userid).then(()=>{
            res.status(200).send({stauts:"Score deleted"})
        }).catch((err)=>{
            console.log(err.message);
            res.status(500).send({status:"Error with delete score", error:err.message});
        })
    })


router.route("get/:id").get(async(req,res)=>{
    let userid = req.params.id;

    const user = await score.findById(userid).then(()=>{
        res.status(200).send({status: "Score fetched", user:user})
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete score", error:err.message});
    })
})

module.exports = router;
