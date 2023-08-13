import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

//MIDDLEWARE
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//ROUTES
//random activity displayed on default when page is loaded:
app.get("/", async (req, res) => {   //making API requests using axios module:
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {error: error.message,});
  }
});





//when selection made and go button pushed:
app.post("/", async (req, res) => {
  console.log(req.body);
  const type=req.body.type;
  const participants = req.body.participants;

  
  //guessing all variations of selections for the link: 
  if(participants=="" && type=="") res.redirect("/"); //if chose random type and number -> give random selection
 
  try{
    const response = await axios.get("https://bored-api.appbrewery.com/filter?type=" + type +"&participants=" + participants);
    const result = response.data;  //result is an array of activities
    //picking random activity from the list sent to us
    res.render("index.ejs", {data: result[(Math.floor(Math.random() * result.length))]} )
  }
  catch(error){
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {error: "No activities found"});
  }
});




app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
