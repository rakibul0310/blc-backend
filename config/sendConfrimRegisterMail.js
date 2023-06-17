const nodemailer = require("nodemailer");

const sendConfrimRegistrationMail = (user, initialTrx, userId) => {
  let transpoter = nodemailer.createTransport({
    service: "Gmail",
    port: 587,
    secure: false,
    auth: {
      user: "help@rightfuture.in",
      pass: "goryulkqnnmiwoes",
    },
  });

  let mailOption = {
    from: "Right Future",
    to: user.email,
    subject: "Successfully registered",
    text: `Hello! ${user.name}
            Here is you user information - 
            Full Name: ${user.name}
            user ID: ${userId}
            Sponsor ID: ${user.sponsor_id}
            Sponsor Name: ${user.sponsor_name}
            Mobile: ${user.mobile}
            Email: ${user.email}
            Transaction Password: ${initialTrx}`,
    html: `<div>
    <img src="https://i.ibb.co/cvJj0TG/rightfuture.png" alt="logo" />
    <h1 style="text-align: center;">Welcome to <a href="https://rightfuture.in//">Right Future</a></h1>
    <div  style="padding: 0 60px; width: 100%;">
            <h2>Hello! ${user.name},</h2>
            <p style="text-align: left;">Here is you ID information - </p>
            <p style="text-align: left; margin-left: 20px">Full Name: ${user.name}</p>
            <p style="text-align: left; margin-left: 20px">user ID: ${user.user_id}</p>
            <p style="text-align: left; margin-left: 20px">Sponsor ID: ${user.sponsor_id}</p>
            <p style="text-align: left; margin-left: 20px">Sponsor Name: ${user.sponsor_name}</p>
            <p style="text-align: left; margin-left: 20px">Mobile: ${user.mobile}</p>
            <p style="text-align: left; margin-left: 20px">Email: ${user.email}</p>
            <p style="text-align: left; margin-left: 20px">Transaction Password: ${initialTrx}</p>        
    </div>
</div>`,
  };

  transpoter.sendMail(mailOption, async (error, info) => {
    if (error) {
      //console.log(error);
    } else {
      //console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendConfrimRegistrationMail;
