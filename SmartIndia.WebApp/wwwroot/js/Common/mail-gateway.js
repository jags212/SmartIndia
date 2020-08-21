function sendEmail(firstName, mailid, emailOTP) {
    var settings = {
        "url": "https://api.sendinblue.com/v3/smtp/email",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "api-key": "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",
            "Content-Type": "application/json",
            "Cookie": "__cfduid=de102df93cd9a52372104c9283d73f9b61598012846"
        },
        "data": JSON.stringify(
            {
                "sender": {
                    "name": "Smart India",
                    "email": "napoleon.mohanta@gmail.com"
                },
                "to": [
                    {
                        "email": "" + mailid + "",
                        "name": "" + firstName + ""
                    }
                ],
                "subject": "Smart India OTP Confirmation",
                "htmlContent": "<html><head></head><body><p>Hello " + firstName + ",</p>Greetings from Smart India. Your OTP is <b>" + emailOTP + "</b>. Code is valid for 5 minutes.</p></body></html>"
            }
        ),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}