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

//venath
const candidateRouter =require("./routes/venath_registration/candidates");
app.use(candidateRouter);

const judgeRouter = require('./routes/venath_registration/judges_route');
app.use(judgeRouter);

const managerRouter = require('./routes/managers/managers_route');
app.use(managerRouter);


const adminRouter = require('./routes/admin/admin_route');
app.use(adminRouter);











//thamindu
const commentRouter = require('./routes/Thamindu_AudienceRoutes/commentRoutes');
app.use(commentRouter);

const A_signupRoutes = require('./routes/Thamindu_AudienceRoutes/A_signupRoutes');
app.use(A_signupRoutes);

const audienceRouter =require("./routes/Thamindu_AudienceRoutes/audienceRoutes");
app.use(audienceRouter);



















//gimhani






























//nisitha






























//lakruwan





























//vishmitha





























//naduni





























//dhananji





























///


//const loginsRouter = require('./routes/signup');
//app.use(loginsRouter);


// npm install react-scripts
// npm install axios
// npm install web-vitals
//npm install concurrently
//npm install multer