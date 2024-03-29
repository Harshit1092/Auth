const User = require('../models/User');
const jwt = require('jsonwebtoken');
const UserOTPverification = require('../models/UserOTPverification');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const maxAge = 3 * 24 * 60 * 60; //jwt token expires in 3 days
const dotenv = require('dotenv');
const expirytime=2; //otp expires in 2 minutes
dotenv.config();

const createToken = (id) => {
  return jwt.sign({ id }, 'secret key from my side', { expiresIn: maxAge });
};

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.AUTH_USER,
    pass: process.env.AUTH_PASS,
  },
});

const sendverificationotp = async (result, res) => {
  const otp = Math.floor(100000 + Math.random() * 900000);

  let mailOptions = {
    from: process.env.AUTH_USER,
    to: result.email,
    subject: 'OTP for verification',
    html: `<p>OTP for verification in our app is <b>${otp}</b> .</p>
        <p> This OTP will expire in 2 minutes.</p>`,
  };
  const salt = await bcrypt.genSalt();
  const hashotp = await bcrypt.hash(otp.toString(), salt);

  const ifexist = await UserOTPverification.findOne({ email: result.email });
  if (ifexist) {
    try {
      await UserOTPverification.updateOne(
         { email : result.email },
         { $set: { otp:hashotp,createdAt:Date.now(),expiresAt:Date.now()+expirytime*60*100 } }
      );
   } catch (e) {
     console.log(e);
   }

  } else {
    const newotp = await new UserOTPverification({
      email: result.email,
      otp: hashotp,
      createdAt: Date.now(),
      expiresAt: Date.now() + expirytime * 60 * 1000, //otp expires in 2 minutes
    });
    await newotp.save();
  }
  await transporter
    .sendMail(mailOptions)
    .then((data) => {
      res.status(200).json({ message: 'otp sent successfully' });
    })
    .catch(async (err) => {
      console.log(err);
      await UserOTPverification.deleteOne({ email: result.email });
      res.status(400).json({ error: 'something went wrong111' });
    });
};

const signup_get = (req, res) => {
  res.send('signup');
};
const login_get = (req, res) => {
  res.send('login');
};
const signup_post = async (req, res) => {
  const { email, name, education, mobile, otp } = req.body;
  if (!email || !otp) {
    res.status(400).json('please enter email and otp');
  } else {
    const result = await User.findOne({ email: email });

    if (result) {
      return res
        .status(400)
        .json({ error: 'User already exist.Please login.' });
    } else {
      const UserOTPverify = await UserOTPverification.findOne({ email: email });
      if (UserOTPverify) {
        const { _id, expiresAt } = UserOTPverify;
        const hasedOTP = UserOTPverify.otp;
        if (expiresAt <= Date.now()) {
          await UserOTPverify.deleteOne({ _id });
          return res.status(400).json({ error: 'otp expired' });
        } else {
          const isvalid = await bcrypt.compare(otp.toString(), hasedOTP);
          if (isvalid) {
            const newuser = new User({
              email,
              name,
              education,
              mobile,
            });
            newuser
              .save()
              .then((result) => {
                try {
                  const token = createToken(result._id);
                  res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                  });
                  return res.status(201).json({
                    email: result.email,
                    id: result._id,
                    name: result.name,
                  });
                } catch (err) {
                  res.status(400).json({ error: err });
                }
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json({ error: 'something went wrong' });
              });
            await UserOTPverify.deleteOne({ _id });
          } else {
            return res.status(400).json({ error: 'invalid otp' });
          }
        }
      } else {
        return res
          .status(400)
          .json({ error: 'OTP not sent. please send otp again' });
      }
    }
  }
};

const login_post = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    res.status(400).json('please enter email and otp');
  } else {
    const result = await User.findOne({ email: email });

    if (!result) {
      return res
        .status(400)
        .json({ error: 'User account does not exist. Please signup first.' });
    } else {
      const UserOTPverify = await UserOTPverification.findOne({ email: email });
      if (UserOTPverify) {
        const { _id, expiresAt } = UserOTPverify;
        const hasedOTP = UserOTPverify.otp;
        if (expiresAt <= Date.now()) {
          await UserOTPverify.deleteOne({ _id });
          return res.status(400).json({ error: 'otp expired' });
        } else {
          const isvalid = await bcrypt.compare(otp.toString(), hasedOTP);
          if (isvalid) {
            User.findOne({ email: email })
              .then((result) => {
                try {
                  const token = createToken(result._id);
                  res.cookie('jwt', token, {
                    httpOnly: true,
                    maxAge: maxAge * 1000,
                  });
                  return res.status(201).json({
                    user: result.email,
                    id: result._id,
                    name: result.name,
                  });
                } catch (err) {
                  res.status(400).json({ error: 'some error occured' });
                }
              })
              .catch((err) => {
                console.log(err);
                return res.status(400).json({ error: 'something went wrong' });
              });
            await UserOTPverify.deleteOne({ _id });
          } else {
            return res.status(400).json({ error: 'invalid otp' });
          }
        }
      } else {
        return res
          .status(400)
          .json({ error: 'OTP not sent. please send otp again' });
      }
    }
  }
};
const sendsignupotp_post = (req, res) => {
  // res.send('new login');
  let { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'please add email' });
  } else {
    User.findOne({ email: email })
      .then((result) => {
        if (result) {
          return res
            .status(400)
            .json({ error: 'User already exist.Please login.' });
        } else {
          UserOTPverification.findOne({ email: email })
            .then((result) => {
              if (result) {
                if (result.expiresAt > Date.now()) {
                  return res.status(400).json({
                    error:
                      'otp sent.If you want to resend otp then click on resend otp button.',
                  });
                } else {
                  sendverificationotp({ email }, res);
                }
              } else {
                sendverificationotp({ email }, res);
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(400).json({ error: 'something went wrong' });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: 'something went wrong' });
      });
  }
};

const sendloginotp_post = (req, res) => {
  // res.send('new login');
  console.log(req.body.email);
  let { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'please add email' });
  } else {
    User.findOne({ email: email })
      .then((result) => {
        if (!result) {
          return res.status(400).json({
            error: 'User account does not exist. Please signup first.',
          });
        } else {
          UserOTPverification.findOne({ email: email })
            .then((result) => {
              if (result) {
                if (result.expiresAt > Date.now()) {
                  return res.status(400).json({
                    error:
                      'otp sent.If you want to resend otp then click on resend otp button.',
                  });
                } else {
                  sendverificationotp({ email }, res);
                }
              } else {
                sendverificationotp({ email }, res);
              }
            })
            .catch((err) => {
              console.log(err);
              return res.status(400).json({ error: 'something went wrong' });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ error: 'something went wrong' });
      });
  }
};

const resendotp_post = (req, res) => {
  let { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'please add email' });
  } else {
    UserOTPverification.findOne({ email: email }).then((result) => {
      if (!result) {
        return res.status(400).json({
          error: 'otp not sent even once. please use send otp button',
        });
      } else {
        sendverificationotp({ email }, res);
      }
    });
  }
};

const logout_get = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/login');
};


const getProfileInfo = async (req, res) => {
  try {
    const id = req.query.userId;
    const user = await User.findById(id);

    if (!user) {
      res.status(400).json({ error: "User not found" });
    }

    res.status(200).json({ user }); 
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signup_get,
  login_get,
  signup_post,
  login_post,
  sendloginotp_post,
  sendsignupotp_post,
  resendotp_post,
  logout_get,
  getProfileInfo
};
