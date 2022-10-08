import Router from "express";
import { User } from "../models/userModel.js";
import { Client } from "../models/clientModel.js"
import { Token } from "../models/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import Nylas from 'nylas';
import { generateOTP } from "../utils/otp.js"

Nylas.config({
    clientId: process.env['NYLAS_CLIENT_ID'],
    clientSecret: process.env['NYLAS_CLIENT_SECRET'],
});
console.log(process.env['NYLAS_ACCESS_TOKEN'])
const nylas = Nylas.with(process.env['NYLAS_ACCESS_TOKEN']);
const router = Router();
import nodemailer from 'nodemailer';


// Endpoint for Register
router.post("/signup", async(req, res) => {
    const { email, password } = req.body;
    console.log(email, 'email')
    if (!email || !password) {
        return res
            .status(404)
            .json({ msg: "Please Provide all necessary fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ msg: "User Already Exists!" });
    }

    //genrate otp     
    const OTP = generateOTP()

    console.log();

    //for update otp if alredy creted and create otp if not created
    const token = Token.findOne({ email: email }, (err, user) => {

        if (user) {
            // console.log("old user");
            // console.log(user, "user");
            Token.findOneAndUpdate({ email: user.email }, { token: OTP }, { useFindAndModify: false })
                .then(() => {
                    res.status(200)
                })
        } else {
            // console.log(" hy else called", email, OTP);
            const mytoken = new Token({
                // userId:
                email: email,
                token: OTP
            })
            mytoken.save().then(() => {
                res.status(200)
            })
        }
    });

    const output = `
    <p>You have a new contact request</p>
    <h3>BlockReward Verification Code</h3>
    <ul>  
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Your OTP is :${OTP}</h3>
    `;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'raju.smarttechnica@gmail.com',
            pass: 'eglnwjtvdgxiisrg'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: ' "BlockReward.com"  <topdevking@gmail.com>',
        to: req.body.email,
        subject: 'BlockReward Verification Code',
        html: output
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("error");

            console.log(error);
        } else {
            // console.log('Email sent: ' + info.response);
            const newUser = new User({
                email,
                passwordHash,
            });
            // console.log(newUser)
            const savedUser = newUser.save();
            res.send({ user: savedUser, msg: "PLEASE CHECK YOUR EMAIL FOR OTP PASSWORED" })

        }
    });

    const mytoken = jwt.sign({
            userId: savedUser._id,
            emailConfirmed: false,
        },
        process.env["JWT_SECRET"], {
            expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
        }
    );

    let emailVerifyToken = jwt.sign({
            userId: savedUser._id
        },
        process.env["JWT_EMAIL_VERIFY_SECRET"]
    );
    let verifyUrl = `${process.env["FRONT_URL"]}/verifyEmail?token=${emailVerifyToken}`;
    const draft = nylas.drafts.build({
        subject: 'Verify Email',
        body: `<html>
                 Please click <a href="${verifyUrl}">this url</a> to verify your email!
                </html>`,
        to: [{ name: 'My Event Friend', email: savedUser.email }]
    });
    draft.send();

    res.send({ token: mytoken });
});

router.post("/resendOTP", async(req, res) => {
    const { email } = req.body;
    console.log('body')
    if (!email) {
        return res
            .status(404)
            .json({ msg: "Please Provide all necessary fields" });
    }

    //genrate otp     
    const OTP = generateOTP()

    //for update otp if alredy creted and create otp if not created
    const token = Token.findOne({ email: email }, (err, user) => {

        if (user) {
            // console.log("old user");
            // console.log(user, "user");
            Token.findOneAndUpdate({ email: user.email }, { token: OTP }, { useFindAndModify: false })
                .then(() => {
                    res.status(200)
                })
        } else {
            // console.log(" hy else called", email, OTP);
            const mytoken = new Token({
                // userId:
                email: email,
                token: OTP
            })
            mytoken.save().then(() => {
                res.status(200)
            })
        }
    });

    const output = `
    <p>You have a new contact request</p>
    <h3>BlockReward Verification Code</h3>
    <ul>  
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Your OTP is :${OTP}</h3>
    `;

    const saltRounds = 10;
    //for hash password
    // const passwordHash = await bcrypt.hash(password, saltRounds);

    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'raju.smarttechnica@gmail.com',
            pass: 'eglnwjtvdgxiisrg'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: ' "BlockReward.com"  <topdevking@gmail.com>',
        to: req.body.email,
        subject: 'BlockReward Verification Code',
        html: output
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log("error");

            console.log(error);
        } else {

            res.send({ msg: "PLEASE CHECK YOUR EMAIL FOR OTP PASSWORED" })

        }
    });

    console.log(token, "token")

    res.send({ token: token });
});


// Endpoint for Login
router.post("/login", async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "Email or Password is missing" });
    }

    const matchUser = await User.findOne({ email });

    if (!matchUser) {
        return res.status(400).json({ msg: "Email or Password is not matched" });
    } else {

        if (!matchUser.verified === true) {
            console.log(!matchUser.verified === true);


            //genrate otp     
            const OTP = generateOTP()

            console.log();

            //for update otp if alredy creted and create otp if not created
            const token = Token.findOne({ email: email }, (err, user) => {

                if (user) {
                    // console.log("old user");
                    // console.log(user, "user");
                    Token.findOneAndUpdate({ email: user.email }, { token: OTP }, { useFindAndModify: false })
                        .then(() => {
                            res.status(200)
                        })
                } else {
                    // console.log(" hy else called", email, OTP);
                    const mytoken = new Token({
                        // userId:
                        email: email,
                        token: OTP
                    })
                    mytoken.save().then(() => {
                        res.status(200)
                    })
                }
            });

            const output = `
<p>You have a new contact request</p>
<h3>BlockReward Verification Code</h3>
<ul>  
  <li>Email: ${req.body.email}</li>
</ul>
<h3>Your OTP is :${OTP}</h3>
`;

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            var transporter = nodemailer.createTransport({
                service: 'Gmail',
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'raju.smarttechnica@gmail.com',
                    pass: 'eglnwjtvdgxiisrg'
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            var mailOptions = {
                from: ' "BlockReward.com"  <topdevking@gmail.com>',
                to: req.body.email,
                subject: 'BlockReward Verification Code',
                html: output
            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log("error");

                    console.log(error);
                } else {
                    // console.log('Email sent: ' + info.response);
                    const newUser = new User({
                        email,
                        passwordHash,
                    });

                    res.send({ msg: "PLEASE CHECK YOUR EMAIL FOR OTP PASSWORED" })

                }
            });


            return res.status(400).json({ msg: "PLEASE CHECK YOUR EMAIL FOR OTP PASSWORED" });
        }

        const matchPassword = await bcrypt.compare(
            password,
            matchUser.passwordHash
        );

        if (!matchPassword) {
            return res.status(401).json({ msg: "Email or Password is not matched!" });
        }
        const token = jwt.sign({
                userId: matchUser._id,
                emailConfirmed: matchUser.emailConfirmed,
            },
            process.env["JWT_SECRET"], {
                expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
            }
        );
        console.log(process.env["COOKIE_SECURE"])
        res.send({ msg: "succes", token: token, id: matchUser._id });
    }
});

// Endpoint for Logout
router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none"
    }).send();
});

// Endpoint to check if logged in
router.get("/loggedin", (req, res) => {
    if (!req.user) {
        return res.json({ loggedIn: false, emailConfirmed: false });
    }
    if (req.user.emailConfirmed)
        return res.json({ loggedIn: true, emailConfirmed: true });
    else
        return res.json({ loggedIn: true, emailConfirmed: false });


});
router.get("/sendVerifyEmail", (req, res) => {
    if (!req.user) {
        return res.status(401).json({ msg: "Invalid Token" });
    }

    User.findById(req.user.userId).then(user => {
        if (user.emailConfirmed)
            return res.json({ status: 1, msg: "Already Email Verified!" })
        let emailVerifyToken = jwt.sign({
                userId: user._id
            },
            process.env["JWT_EMAIL_VERIFY_SECRET"]
        );
        let verifyUrl = `${process.env["FRONT_URL"]}/verifyEmail?token=${emailVerifyToken}`;
        const draft = nylas.drafts.build({
            subject: 'Verify Email',
            body: `<html>
                             Please click <a href="${verifyUrl}">this url</a> to verify your email!
                            </html>`,
            to: [{ name: 'My Event Friend', email: user.email }]
        });
        draft.send().then(message => {
            return res.json({ status: 2, msg: "Successfully verification email was sent!" });
        }).catch(err => {
            return res.json({ status: 3, msg: "Error in verification email!" });
        })

    }).catch(err => {
        console.log(err);
        return res.status(401).json({ msg: "Invalid Token3" });
    })
});

router.post("/sendResetEmail", (req, res) => {


    User.findOne({ email: req.body.email }).then(user => {
        let emailVerifyToken = jwt.sign({
                userId: user._id,
                email: user.email
            },
            process.env["JWT_SECRET"]
        );
        let verifyUrl = `${process.env["FRONT_URL"]}/resetPassword?token=${emailVerifyToken}`;
        const draft = nylas.drafts.build({
            subject: 'Reset Password',
            body: `<html>
                             Please click <a href="${verifyUrl}">this url</a> to reset your password!
                            </html>`,
            to: [{ name: 'My Event Friend', email: user.email }]
        });
        draft.send().then(message => {
            return res.json({ status: 2, msg: "Successfully reset email was sent!" });
        }).catch(err => {
            return res.json({ status: 3, msg: "Error in sending reset email!" });
        })

    }).catch(err => {
        return res.status(401).json({ msg: "Not Found Email!" });
    })
});

router.get("/verifyEmail", (req, res) => {

    if (!req.user) {
        return res.status(401).json({ msg: "Invalid Token" });
    }

    jwt.verify(req.query.token, process.env['JWT_EMAIL_VERIFY_SECRET'], async(error, decoded) => {

        if (error) {
            return res.status(401).json({ msg: "Invalid Verification Token" });
        } else if (req.user.userId !== decoded.userId) {
            return res.status(401).json({ msg: "Please Open verification page on the same browser in which you logged in!" });
        } else {
            let result = await User.findByIdAndUpdate(decoded.userId, {
                emailConfirmed: true,

            });
            console.log(result, decoded.userId)
            const token = jwt.sign({
                    userId: req.user.userId,
                    emailConfirmed: true
                },
                process.env["JWT_SECRET"], {
                    expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
                }
            );
            return res.json({ token: token });
        }
    })

});

// Database CRUD Operations
// @POST Request to otpvalidation 
// POST
// otpvalidation for registration

router.post("/otpvalidate", (req, res) => {
    console.log(" OTP VALIDATION API CALL");

    //get email and password
    const { token } = req.body
    const email = req.body.tokenemail

    console.log(email);
    console.log(token);

    //chek the email and token from the token table 
    Token.findOne({ email: email }, (err, logg) => {
        if (logg) {

            //check is user is google login user or not
            //chek password is curect as user databise and than send the message in front end for popup mesaage 
            if (token === logg.token) {

                // for null the token after validate 

                Token.findOneAndUpdate({ email: logg.email }, { token: null }, { useFindAndModify: false })
                    .then(() => {
                        res.status(200);
                    })

                User.findOneAndUpdate({ email: logg.email }, { verified: true }, { useFindAndModify: false })
                    .then(() => {
                        res.status(200);
                    })

                console.log("newpassword", logg.email);

                res.send({ message: "validate Successfull", logg: logg })
            } else {
                res.send({ message: "OTP didn't match" })
            }
            // })
        } else {
            res.send({ message: "Enter valid OTP" })

        }
    })
})

// Database CRUD Operations
// @POST Request to otpvalidation 
// POST
// otpvalidation for chnage password

router.post("/otpvalidateforgotpass", (req, res) => {
    console.log("login called");

    //get email and password
    const { token } = req.body
    const email = req.body.tokenemail

    console.log(token);
    console.log(email);

    //chek the email in databise is match or not 
    User.findOne({ email: email }, (err, logg) => {
        if (logg) {
            // console.log(logg);
            //check is user is google login user or not
            //chek password is curect as user databise and than send the message in front end for popup mesaage 
            if (token === logg.token) {

                // for null the token after validate 

                User.findOneAndUpdate({ email: logg.email }, { token: null }, { useFindAndModify: false })
                    .then(() => {
                        res.status(200);
                    })
                console.log("newpassword", logg.email);

                res.send({ message: "validate Successfull", logg: logg })
            } else {
                res.send({ message: "OTP didn't match" })
            }
            // })
        } else {
            res.send({ message: "User not registered" })
        }
    })
})

// Database CRUD Operations
// @POST Request to otpvalidation 
// POST
// changepassword

router.post("/changepassword", (req, res) => {
    console.log("login called");

    //get email and password
    const password = req.body.updatepassword
    const email = req.body.tokenemail

    User.findOneAndUpdate({ email: email }, { password: password }, { useFindAndModify: false })
        .then(() => {
            res.send({ message: "password chnage Successfull" })
        })

})



router.post("/resetPassword", (req, res) => {
    let { email, token, newpassword, confirmpassword } = req.body;
    jwt.verify(token, process.env['JWT_SECRET'], async(error, decoded) => {
        if (error) {
            return res.status(401).json({ msg: "Invalid Reset Token" });
        } else if (decoded.email !== email) {
            return res.status(401).json({ msg: "Invalid Reset Token" });
        } else {
            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(newpassword, saltRounds);
            console.log(decoded.userId, passwordHash, newpassword)
            User.findByIdAndUpdate(decoded.userId, { passwordHash: passwordHash, emailConfirmed: true })
                .then(user => {
                    const newToken = jwt.sign({
                            userId: user._id,
                            emailConfirmed: true
                        },
                        process.env["JWT_SECRET"], {
                            expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
                        }
                    );
                    return res.json({ token: newToken });
                }).catch(error => {
                    return res.status(401).json({ msg: "New Email Save Error!" });
                })

            // const token = jwt.sign(
            //     {
            //         userId: req.user._id,
            //         isUser: req.user.isUser,
            //         emailConfirmed: true
            //     },
            //     process.env["JWT_SECRET"],
            //     {
            //         expiresIn: process.env["TOKEN_EXPIRATION_TIME"]
            //     }
            // );

        }
    })

});

router.post("/info", (req, res) => {
    const { language, experience, time, phoneNumber, userId, availableTime, firstName, location, lastName, company } = req.body;
    User.findById(userId, function(err, user) {
        if (!user) {
            Client.findById(userId, function(err, client) {
                client.firstName = firstName;
                client.lastName = lastName;
                client.phoneNumber = phoneNumber
                client.company = company
                client.location = location.label;
                client.save()
                    .then((client) => res.json("client updated"))
                    .catch((error) => console.log(error, 'error'))
                if (!client) {
                    res.status(404).send("file is not found");
                }
            })
        } else {
            if (user.isInterpreter == "interpreter") {
                user.language = language;
                user.experience = experience;
                user.time = time;
                user.phoneNumber = phoneNumber;
                user.availableTime = availableTime;
                user.location = location.label;
            }
            user
                .save()
                .then((user) => {
                    res.json("user updated!");
                })
                .catch((err) => {
                    res.status(400).send("Update not possible");
                });
        }
    });
})

router.get("/get", (req, res) => {
    const userId = req.query.userId;
    User.findById(userId, function(err, user) {
        if (!user) {
            Client.findById(userId, function(err, client) {
                res.send({ data: "client", email: client.email })
                if (!client) {
                    res.status(404).send("user is not found");
                }
            })
        } else {
            res.send({ data: "Interpreter", email: user.email })
        }
    })
})

export default router;