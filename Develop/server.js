const express = require('express');
const app = express();
let PORT = process.env.PORT || 8080;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public")); // static files are files that clients download as they are from the server. 
// express by defualt doesnt allow you to serve static files, so you need to enable it using #7 line. 

require("./apiRoutes")(app);
require("./htmlRoutes")(app);

app.listen(PORT, function(){
    console.log("App listening on PORT " + PORT)
});