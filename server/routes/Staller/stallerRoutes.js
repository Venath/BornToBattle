const router = require("express").Router();
let Staller = require("../../models/Staller/stallerModels");


//create

router.route("/staller/create").post((req, res) => {

    const sbn = req.body.sbn;
    const companyName = req.body.companyName;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const mobile = Number(req.body.mobile);
    const address = req.body.address;
    const city = req.body.city;
    const province = req.body.province;
    const postalCode = Number(req.body.postalCode);
    const email = req.body.email;
 
    const newstaller = new Staller({
        sbn,
        companyName,
        firstName,
        lastName,
        mobile,
        address,
        city,
        province,
        postalCode,
        email,
    })

    newstaller.save().then(() => {
        res.json("Staller created.");
    }).catch((err) => {
        console.log("obapan");
    })
})


//Read

router.route("/staller/read").post((req, res) => {

    Staller.find().then((stallerRoutes) => {
        res.json(stallerRoutes)
        console.log(stallerRoutes);
    }).catch((err) => {
        console.log(err)
    })
}) 


//Update

//get ID route

router.route("/staller/get/:Stallerid").get(async (req, res) => {
    let Stallerid = req.params.Stallerid;

    const getID = await Staller.findById(Stallerid)
    .then( (staller) => {
        res.json(staller)
    }).catch((err) => {
        console.log(err)
    })

})

router.route("/staller/update/:Stallerid").put(async (req, res) => {
    let Stallerid = req.params.Stallerid;
    const { sbn, companyName, firstName, lastName, mobile, address, city, province, postalCode, email, } = req.body;

    //check the updated data
    console.log("Received Update Payload:", req.body);

    const updateStaller = {
        sbn,
        companyName, 
        firstName,
        lastName,
        mobile,
        address,
        city,
        province,
        postalCode,
        email,
    }

    const update = await Staller.findByIdAndUpdate(Stallerid , updateStaller, { new: true })
        .then(() => {
            res.status(200).send({ status: "Staller Updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error in updating staller data", /*error: err.message*/ })
        })
})

//Delete

router.route("/staller/delete/:Stallerid").delete( async(req, res) => {
    let Stallerid = req.params.Stallerid;

    await Staller.findByIdAndDelete(Stallerid).then(()=> {
        res.status(200).send({status: "Staller deleted"});
    }).catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "error in deleting the staller"})
    })
})


module.exports = router;
