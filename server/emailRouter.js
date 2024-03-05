var express = require('express');
var emailRouter = express.Router();
var cors = require('./cors');
var nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '871882971291-qs71sfkfkhe522a0rajscvb9t90em7bd.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04dWPFVPHNud0CgYIARAAGAQSNwF-L9Ir1Y1-fBeoDsoKAFK5rgZqM4ebeQv8mG50ZgXizdBPNndgOBNBbrBO9Tb7L98QQDaA9_0';

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

console.log('cors:', cors.cors);
emailRouter.route('/')
.options(cors.cors,(req,res)=>{
    console.log("Coming email here");
    res.sendStatus(200);
})
.post(cors.cors, async (req,res, next) => {
    console.log('oooo, req.body', req.body);

    const accessToken = await oAuth2Client.getAccessToken();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        // host: "smtp.gmail.com",
        // port: 465,
        // secure: true,
        // // secure: true, // Use `true` for port 465, `false` for all other ports
        // auth: {
        //     user: 'buro.gacaferi@gmail.com',
        //     pass: "pwpm jaoa vptk sohk"
        // }
        auth: {
            type: 'OAuth2',
            user: 'buro.gacaferi@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    });

    const mailOptions = {
        from: 'buro.gacaferi@gmail.com',
        to: 'edona.gacaferi@outlook.de', // this one should be the forwarded email
        subject: 'Buro Service',
        text: 'Your app is still in progress, but if you want to know more information about it contact me on whatsapp LOL.'
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('result:', result);
});

module.exports = emailRouter;