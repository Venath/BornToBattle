const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//const dotenv = require("dotenv");
const app = express();
//require("dotenv").config();

//const PORT = process.env.PORT || 8070;
const PORT =8020;
//const MONGODB_URL='mongodb+srv://venath1:venath@prjapp.9knjsqh.mongodb.net/crud?retryWrites=true&w=majority'
const MONGODB_URL='mongodb+srv://born_to_battle:BTB69@borntobattle.0k5sqj7.mongodb.net/BornToBattle?retryWrites=true&w=majority'



app.listen(PORT,()=>{console.log(`App is running on ${PORT}`);
});

app.use(cors());
 app.use(bodyParser.json());

// const URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL)
.then(()=>{
    console.log('DB connected');
})
.catch((err)=>{ console.log('DB connection error',err);})

//venath line 30
const candidateRouter =require("./routes/venath_registration_routes/candidates");
app.use(candidateRouter);

const judgeRouter = require('./routes/venath_registration_routes/judges_route');
app.use(judgeRouter);

const managerRouter = require('./routes/managers/managers_route');
app.use(managerRouter);

const adminRouter = require('./routes/admin/admin_route');
app.use(adminRouter);

const loginsRouter = require('./routes/venath_registration_routes/candidate_signup_route');
app.use(loginsRouter);

const JloginsRouter = require('./routes/venath_registration_routes/judge_signup_route');
 app.use(JloginsRouter);

 const candidateGroupRouter =require("./routes/venath_registration_routes/candidate_group_route");
 app.use(candidateGroupRouter);


 
//thamindu line 54
const commentRouter = require('./routes/Thamindu_AudienceRoutes/commentRoutes');
app.use(commentRouter);

const A_signupRoutes = require('./routes/Thamindu_AudienceRoutes/A_signupRoutes');
app.use(A_signupRoutes);

const audienceRouter = require("./routes/Thamindu_AudienceRoutes/audienceRoutes");
app.use(audienceRouter);

const AudienceManagerRoutes = require('./routes/Thamindu_AudienceRoutes/AudienceManagerRoutes');
app.use(AudienceManagerRoutes);

// const A_signupRoutes = require('./routes/Thamindu_AudienceRoutes/A_signupRoutes');
// app.use(A_signupRoutes);

// const audienceRouter =require("./routes/Thamindu_AudienceRoutes/audienceRoutes");
// app.use(audienceRouter);










//gimhani line 82

const eventRoutes = require('./routes/gimhani_event_routes/Events_route');
app.use(eventRoutes);

const eventCatRoutes = require('./routes/gimhani_event_routes/Event_categories');
app.use(eventCatRoutes);

const notifRoutes = require('./routes/gimhani_event_routes/Notifications_route');
app.use(notifRoutes);





















//nisitha line 113
const stalllerRouter = require('./routes/Staller/stallerRoutes')
app.use(stalllerRouter)

const stallItems = require('./routes/Staller/itemRoutes')
app.use(stallItems)

























//lakruwan line 144
const scoreRouter = require("./routes/Scores/scoreRoutes");
app.use("/score",scoreRouter);



























//vishmitha line 174

const mediaRouter = require("./routes/Media/gallery");
app.use(mediaRouter);

const requestForm = require("./routes/Media/mediaRequestForm");
app.use("/requestform",requestForm);























//naduni line 204
const paymentForm = require("./routes/payment/competitors");
app.use("/payment",paymentForm);



























//dhananji line 234
const sponsorRouter = require('./routes/sponsor/sponsorrouts')
app.use("/sponsor",sponsorRouter)






























///


//const loginsRouter = require('./routes/signup');
//app.use(loginsRouter);


// npm install react-scripts
// npm install axios
// npm install web-vitals
//npm install concurrently
//npm install multer