const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
console.log("app.get started running")
res.sendFile(__dirname + "/signup.html")
});


app.post("/",function(req,res){
    const firstName = req.body.fn;
    const lastName = req.body.ln; 
    const email = req.body.ei;
    console.log(firstName, lastName, email);

    const data ={
      members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
                 FNAME: firstName,
                 LNAME: lastName
                    },
               }]
              
    };

    const options={
      method: "POST",
      auth: "harsh:API_KEY"
    }
    

    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/audience_id";

    const request = https.request(url, options, function(response){

      if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html")
      }else{
        res.sendFile(__dirname + "/failure.html")
      }
         response.on("data",function(data){
          console.log(JSON.parse(data));
        })
    })

    

    request.write(jsonData);
    request.end();


});

app.post("/failure",function(req,res){
  res.redirect("/")
})


app.listen(process.env.PORT||3000,function(){
    console.log("server started on port 3000")
});





// ***code for authentication***
// mailchimp.setConfig({
//     apiKey: "a9e1812a2b9c564422e127d686a5a4c4-us21",
//     server: "us21",
//   });


//***function to unsubscribe***
// const client = require("@mailchimp/mailchimp_marketing");
// const unsubscribe = async () => {
//     const response = await mailchimp.lists.setListMember(
//       "list_id",
//       "subscriber_hash",
//       {status:"unsubscribed" }
//     );
//     console.log(response);
// }
//     unsubscribe();


// ***for getting list information***
//   const getlist = async () => {
//     const response = await mailchimp.lists.getList("list_id");
//     console.log(response);
//   };
//   getlist();



// ***function to permanently delete the member***
// const client = require("@mailchimp/mailchimp_marketing");

// client.setConfig({
//   apiKey: "a9e1812a2b9c564422e127d686a5a4c4-us21",
//   server: "us21",
// });

// const run = async () => {
//   const response = await client.lists.deleteListMemberPermanent(
//     "list id",
//     "subcriber hash"
//   );
//   console.log(response);
// };

// run();



// ******For testing first API request*********
// mailchimp.setConfig({
//     apiKey: "harsh:a9e1812a2b9c564422e127d686a5a4c4-us21",
//     server: "us21",
//   });
  
//   async function run() {
//     const response = await mailchimp.ping.get();
//     console.log(response);
//   }
  
//   run();
//});


  // mailchimp.setConfig({
    //     apiKey: "a9e1812a2b9c564422e127d686a5a4c4-us21",
    //     server: "us21",
    //   });

    //   const addSubscriber = async () => {
    //     const response = await mailchimp.lists.addListMember("013e828438", {
    //       email_address: email,
    //       status: "subscribed",
    //       merge_fields: {
    //         FNAME: firstName,
    //         LNAME: lastName
    //     },
    //     });
    //     }
      
    //    addSubscriber();
    //   // res.redirect('/')








//a9e1812a2b9c564422e127d686a5a4c4-us21   api key
//013e828438                              audience id
//https://<dc>.api.mailchimp.com/3.0/     URL