const request = require("request");

var smtpurl = "https://api.smtp2go.com/v3/email/send";

var smtpob = ("meteor.id", "bayu.adi@meteor.id") => {
  return {
    api_key: "your-api-key",
    to: [`${name} <${email}>`],
    sender: "My Company <hello@example.com>",
    subject: "A Subject",
    text_body: "some text",
  };
};

module.exports = function () {
  function send(name, email) {
    var src = smtpob(name, email);

    request
      .post({
        headers: { "content-type": "application/json" },
        url: smtpurl,
        body: JSON.stringify(src),
      })
      .on("response", function (response) {
        if (response.statusCode !== 200) {
          console.log(response.statusCode);
          console.log(response.statusMessage);
        }
      })
      .on("data", function (data) {
        console.log("decoded chunk: " + data);
      })
      .on("error", function (err) {
        console.log("Email sender", err);
      });
  }

  return { send: send };
};
