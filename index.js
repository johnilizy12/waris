require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose")
var TempMail = require('node-temp-mail');;
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;
const path = require('path');
const bodyparser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));


app.post('/email', (req, res) => {
    // Let's create an address object so it can be accessed by the module.

    var address = new TempMail(req.body.email);
    // We a lready have the address object, so now let's access it and get a list of the emails in a nice & neat json object.
    address.fetchEmails(function (err, body) {
        res.send(body)
    });
    // If for any reason you need to see the full temporary email address, you can use the following function.
    address.getAddress()
    
});

app.listen(PORT);
console.log('App is running on port:' + PORT);