$("#phPublish").click(function () {
    $("#phPublish a").toggleClass("publish-active");
    $("#phPublish a").text($(this).text() == 'Publish' ? 'Published' : 'Publish');
});

$("#chPublish").click(function () {
    $("#chPublish a").toggleClass("publish-active");
    $("#chPublish a").text($(this).text() == 'Publish' ? 'Published' : 'Publish');
});

$("#liPublish").click(function () {
    $("#liPublish a").toggleClass("publish-active");
    $("#liPublish a").text($(this).text() == 'Publish' ? 'Published' : 'Publish');
});

$("#buPublish").click(function () {
    $("#buPublish a").toggleClass("publish-active");
    $("#buPublish a").text($(this).text() == 'Publish' ? 'Published' : 'Publish');
});
