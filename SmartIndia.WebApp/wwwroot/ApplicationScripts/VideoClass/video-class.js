


function base64url(source) {
    // Encode in classical base64
    encodedSource = CryptoJS.enc.Base64.stringify(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
}
var header = {
    "alg": "HS256",
    "typ": "JWT"
};
var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
var encodedHeader = base64url(stringifiedHeader);

var result = parseJwt(localStorage.getItem("jwtToken"));
var uid = result.unique_name;
var role = result.role;
var moderator;
if (role == "Host") {
    moderator = true;
}
else {
    moderator = false;
}
var name = localStorage.getItem("firstName");
var EmailId = localStorage.getItem("emailID");

var payload1 = {
    "context": {
        "user": {
            "avatar": "https://smart.datatech.ind.in/assets/img/user1.jpg",
            "name": name,
            "email": EmailId,
            "id": uid.toString(),
            "secret": "E0DF5"
        }
    },
    "aud": "jitsi",
    "iss": "A8E7B",
    "sub": "vc.easternbay.in",
    "room": "*",
    "moderator": moderator
};

var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload1));
var encodedData = base64url(stringifiedData);

var token = encodedHeader + "." + encodedData;
var secret = "E0DF5";

var signature = CryptoJS.HmacSHA256(encodedHeader + "." + encodedData, secret);
var enclodeSignature = base64url(signature);

var signedToken = token + "." + enclodeSignature;

//var signedToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjb250ZXh0Ijp7InVzZXIiOnsiYXZhdGFyIjoiaW1nXC91c2VyLnBuZyIsIm5hbWUiOiJTdXJ5YSBTYWdhciBTd2FpbiIsImVtYWlsIjoic3VyeWFzYWdhcjA5MUBnbWFpbC5jb20iLCJpZCI6IjEiLCJzZWNyZXQiOiJFMERGNSJ9fSwiYXVkIjoiaml0c2kiLCJpc3MiOiJBOEU3QiIsInN1YiI6InZjLmVhc3Rlcm5iYXkuaW4iLCJyb29tIjoiKiIsIm1vZGVyYXRvciI6dHJ1ZX0.d1_CZqFA61IeVVeQ-IX6en84x4mlbsgdAwPhgONTWFU";

var apiObj = null;
var toolbarWeb = ['closedcaptions', 'desktop', 'fullscreen', 'fodeviceselection', 'profile', 'chat', 'recording', 'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand', 'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts', 'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'];
var toolbarMod = ['closedcaptions', 'desktop', 'fullscreen', 'fodeviceselection', 'profile', 'chat', 'recording', 'etherpad', 'sharedvideo', 'settings', 'raisehand', 'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts', 'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone', 'security'];
var toolbarPart = ['closedcaptions', 'desktop', 'fullscreen', 'fodeviceselection', 'profile', 'chat', 'etherpad', 'sharedvideo', 'settings', 'raisehand', 'videoquality', 'filmstrip', 'feedback', 'tileview', 'download'];

function StartMeeting() {
    var domain = "vc.easternbay.in";
    utype = "moderator";
    rtype = "web";

    if (utype == 'moderator' && rtype == 'web') { toolbar = toolbarWeb; }
    else if (utype == 'moderator') { toolbar = toolbarMod; }
    else { toolbar = toolbarPart; }
    // console.log(toolbar);
    var options = {

        roomName: $('#room_id').val().toString(),
        width: '100%',
        onload: this.afterLoadComplete(),
        height: '500px',
        parentNode: document.querySelector('#videoContainer'),
        jwt: signedToken,
        configOverwrite: {
            startWithAudioMuted: false,
        },
        interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_PROMOTIONAL_CLOSE_PAGE: true,
            TOOLBAR_BUTTONS: toolbar
        },
        userInfo: {
            email: EmailId,
            displayName: name
        }
    };
    debugger;
    var api = new JitsiMeetExternalAPI(domain, options);
    $('body').on('click', '#aviMeetEnd', function () {
        api.dispose();
        window.location.href = '/ManageUsers/Users/Login';
    });
    $('body').on('click', '#aviAud', function () {
        toggleimg("aviAud", "micon", "micoff");
        api.executeCommand('toggleAudio');
    });
    $('body').on('click', '#aviVid', function () {
        toggleimg("aviVid", "von", "voff");
        api.executeCommand('toggleVideo');
    });

    $("#aviCont").click(function () {
        api.executeCommand('toggleContactList');
    });
}

$(document).ready(function () {
    actUrl = location.href;
});

function afterLoadComplete() {
    console.log("Video loaded");
    var newURL = location.href.split("?")[0];
    window.history.pushState('object', document.title, newURL);
}

function toggleimg(id, src1, src2) {
    var src = $("#" + id).find("img").attr('src');
    var newsrc = (src == "/assets/img/" + src1 + ".png") ? "/assets/img/" + src2 + ".png" : "/assets/img/" + src1 + ".png";
    $("#" + id).find("img").attr('src', newsrc);
}

$('body').on('keyup', '[data-search]', function () {
    var searchVal = $(this).val();
    console.log(searchVal);
    var filterItems = $('[data-filter-item]');

    if (searchVal != '') {
        filterItems.addClass('hidden');
        $('[data-filter-item][data-filter-name*="' + searchVal.toLowerCase() + '"]').removeClass('hidden');
    } else {
        filterItems.removeClass('hidden');
    }
});

$('body').on('click', '#inv_box_img', function () {
    $(".inv_box").toggleClass("toggle_box");
});

// Chat Functionality
function showChat(rname, refresh = 0) {
    console.log("showChat Fun" + refresh);
    console.log(rname);
    var element = function (id) {
        return document.getElementById(id);
    }
    var messages = element('messages');
    // Connect to socket.io
    var socket = io.connect('https://139.59.29.40:3098', { query: "foo=" + rname });
    var tempname;

    // Check for connection
    if (socket !== undefined) {
        console.log('Connected to socket...');
        if (refresh == 1) {
            socket.emit('clear');
            console.log("refresh");
        }
        // socket.on('reload', function (data) {
        //     location.reload();
        // });
        // Handle Output
        socket.on('output', function (data) {
            // console.log(data);
            if (data.length) {
                for (var x = 0; x < data.length; x++) {
                    // Build out message div
                    var message = document.createElement('div');
                    // console.log(data[x].name+ ' -- ' + username.value);
                    // message.setAttribute('class', 'chat-message');
                    if (tempname == data[x].name) {
                        message.innerHTML = "<div class='chat-message'>" + data[x].message + "</div>";
                    } else {
                        message.innerHTML = "<h6 class='pname'>" + data[x].name + "</h6> <div class='chat-message'>" + data[x].message + "</div>";
                    }

                    messages.appendChild(message);
                    tempname = data[x].name;
                    // messages.insertBefore(message, messages.firstChild);
                }
                scrollSmoothToBottom('messages');
            }
        });
    }
}

function scrollSmoothToBottom(id) {
    $("#" + id).animate({ scrollTop: $('#' + id).prop("scrollHeight") }, 500);
}

$('body').on('click', '#web-btn', function () {
    rname = $('#rname').val();
    activateWebinar(rname);
    setTimeout(function () { window.location = actUrl; $('.loader').hide(); }, 2000);


});