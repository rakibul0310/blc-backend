const nodemailer = require("nodemailer");

const sendForgotPasswordMail = (email, token) => {
  const reset_password_url = `https://rightfuture.in/resetpassword/${token}`;
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
    to: email,
    subject: "Forgot Password",
    html: `<div style="width: 100%; padding: 20px 10px; font-weight: 600">
    <div style="width: 100%">
      <p style="width: 100%; text-align: center">
        Please click the button below to reset your password.
      </p>
      <p style="width: 100%; text-align: center; margin-top: 30px">
        <a
          href="${reset_password_url}"
          style="
            padding: 12px 8px;
            background-color: #348edb;
            color: #ffff;
            cursor: pointer;
            text-decoration: none;
          "
          >reset password</a
        >
      </p>
    </div>
    <p>Regards,</p>
    <a target="_blank" href="https://rightfuture.in//">Right Future</a>
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

module.exports = sendForgotPasswordMail;
