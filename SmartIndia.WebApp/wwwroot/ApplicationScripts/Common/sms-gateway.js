
function sendSMS(mobileno, smsOTP) {
    var settings = {
        "url": "http://59.162.167.52/api/MessageCompose?admin=napoleon.mohanta@gmail.com&user=karanjiacollege@gmail.com:G3L2P4V727&senderID=KJACLG&receipientno=" + mobileno + "&msgtxt=Greetings from SmartIndia . Your OTP code is: " + smsOTP + " . Code valid for 5 minutes only.&state=4",
        "method": "POST",
        "timeout": 0,
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}
