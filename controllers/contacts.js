var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');


exports.index = (req, res) => {
    var token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var loged = true;
            if (decoded.master == 1)
                var mastr = true;
            res.render('contact/contact.hbs', { loged: loged, master: mastr });
        } else {
            res.redirect('/Login');
        }
    });
};

exports.send = (req, res) => {
    var token = req.cookies['jwt'];
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
        if (!err) {
            var loged = true;
            if (decoded.master == 1)
                var mastr = true;
            var {
                name,
                email,
                message
            } = req.body;

            var transporter = nodemailer.createTransport({
                service: process.env.CONTACT_EMAIL_SERVICE,
                auth: {
                    user: process.env.CONTACT_EMAIL_USER,
                    pass: process.env.CONTACT_EMAIL_PASS
                }
            });
            var mailOptions = {
                from: email,
                to: process.env.CONTACT_EMAIL_DEST,
                subject: process.env.CONTACT_EMAIL_SUBJ,
                text: message
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            // TODO: Add Message notify send status...
            res.render('contacts', { loged: loged, master: mastr });
        } else {
            res.redirect('/Login');
        }
    });
};


function validEmail(str) {
    var pattern = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'i'); // fragment locator
    return !!pattern.test(str);
}