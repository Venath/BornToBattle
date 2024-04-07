const router = require ("express").Router();
let Sponsor = require ("../../models/sponsor/sponsor.js");
const multer = require('multer');

//data inserting or adding route
//http://localhost:8070/sponsor/add

// Multer configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './uploads')
    },
    filename: function (req, file, cb) { 
    return cb(null, `${Date.now()}_${file.originalname}`) 
    }
  })
  const upload = multer({ storage })

//create route
router.route("/add").post(upload.single('companyLogo'), (req,res)=>{
 
   const  sponsorName = req.body.sponsorName;
   const companyName = req.body.companyName;
   const sponsorPosition = req.body.sponsorPosition;
   const  contactPerson = Number(req.body.contactPerson);
   const companyPhone = Number(req.body.companyPhone);
   const address = req.body.address;
   const state = req.body.state;
   const  email = req.body.email;
   const website = req.body.website;

   console.log(req.file, req.body);//debug the image operation
   const companyLogo = req.file.filename;

    const newSponsor =  new Sponsor({

      sponsorName,
      companyName,
      sponsorPosition,
      companyLogo,
      contactPerson,
      companyPhone,
      address,
      state,
      email,
      website,

    });
    
    newSponsor.save().then(() => {
        res.json("Sponsor Added")
    }).catch((err)=>{
        console.log(err);
    })



})
//see who is in the list addedd by manager

//http://localhost:8070/sponsor/display

router.route("/read").get((req,res)=> {

    Sponsor:find().then((sponsors) =>{

        res.json(sponsors)
    }).catch((err)=>{

        console.log(err)

    })

})
//want to update the added list
//http://localhost:8070/sponsor/update/325fgsty23b6778dfjh
//for put method we can use post method also
router.route("/update/:id").put(async(req,res)=>{
//get user id from url
    let userId = req.params.id;//fetch the user id
    const {name , companyname,email,address} = req.body;//DStructure=going to update things get from the request body
//create a object putting what are going to update 

//get details via console
    console.log("Recieved updated payload", req.body);
    const updateSponsor = {

        name,
        companyname,
        email,
        address
//these data coming from front end 
    }
//find the one who needs to update
// without if condition
//first parameter is primary key and 2nd one is whtas want to update parameter
    const update = await Sponsor.findByIdAndUpdate(userId,updateSponsor).then(() =>
    {
//status = response for a error like 404(notfound(),401(unauthorized),200(success)
    res.status(200).send({status:"Sponsor updated"})//if update is success send s status to user,"user updated" and the updated details after the status

}).catch((err) => { 
    console.log(err);
    res.status(200).send({status:"Sponsor updation error"})
    //res.status(500).send({status:"error with updating data",error:err.message});
    //when you want to send a message to the front end use this
    })
    //findByIdAndUpdate = in here we are using only the id
//findOneAndUpdate=when we create actual aplications we have to  use nic,email,that moment we can say find one and update
})


//want to delete a sponsor
//find the sponsor who need to delete and then delete
//http://localhost:8070/sponsor/delete/325fgsty23b6778dfjh


router.route("/delete/:id").delete(async(req,res)=>{

    let userId = req.params.id;

//always async function is waiting for requesting promise,e promise ek enkl api balan inna ona nisa thmai api await keyword ek denne

    
    await Sponsor.findByIdAndDelete(userId)
    .then(() => { 

        res.status(200).send({status:"user deleted"});
    }).catch((errr) => {

        console.log(errr.message);
        res.status(500).send({status:"Error with delete user",error:errr.message})

    })

})
//get only one sponsors data

router.route("/get/:id").get(async(req,res)=> {

    let userId = req.params.id;
    const user = await Sponsor.findById(userId)
    .then((sponsor)=>{

        res.status(200).send({status:"user fetched",sponsor});
    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status:"Error with get user",error:err.message})

    })
})

module.exports = router;