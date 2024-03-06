var express = require('express');
var emailRouter = express.Router();
var cors = require('./cors');
var nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '871882971291-qs71sfkfkhe522a0rajscvb9t90em7bd.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04dWPFVPHNud0CgYIARAAGAQSNwF-L9Ir1Y1-fBeoDsoKAFK5rgZqM4ebeQv8mG50ZgXizdBPNndgOBNBbrBO9Tb7L98QQDaA9_0';
const USER_EMAIL ='buro.gacaferi@gmail.com';
const RECEIVER_EMAIL = 'vetongacaferi95@gmail.com'; //'edona.gacaferi@outlook.de'

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

    const bodyMessage = req.body;

    const accessToken = await oAuth2Client.getAccessToken();

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: USER_EMAIL,
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }
    });
    const bodyHtml = `
    <p>Name:${bodyMessage.name}</p>
    <p>Email Address: ${bodyMessage.emailAddress}</p>
    <p>Phone Number: ${bodyMessage.phoneNumber}</p>
    <p>Message: ${bodyMessage.message}</p>
    `;

    const mailOptions = {
        from: USER_EMAIL,
        to: RECEIVER_EMAIL, // this one should be the forwarded email
        subject: 'Buro Service',
        html: bodyHtml
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('result:', result);
});

module.exports = emailRouter;