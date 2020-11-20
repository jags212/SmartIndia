
$(document).ready(function () {
   // CheckEnrollOrNot();
    BindHostPlan();
})

function BindHostPlan() {
    jQuery.support.cors = true;
    var usersParam = JSON.stringify({
        ACTIONCODE: "F"
    });
    $.ajax(
        {
            type: "GET",
            url: ServiceURL + "/api/HostPlan/BindHostPlan",
            data: JSON.parse(usersParam),
            dataType: "json",
            contentType: "application/json",
            success: function (data) {
                var trHTML = '';
                var cls = '';
               //Free Plan
                $('#planNameFree').html(data[0].planName);
                $('#planAmtfree').html(data[0].planAmount);
                $('#nofat0').html(data[0].noofAttendee);
                if (data[0].noofAttendee != 0) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#noofAttendee').addClass(cls);
                

                if (data[0].emailSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#emailSupport').addClass(cls);

                if (data[0].phoneSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#emailSupport').addClass(cls);

                if (data[0].phoneSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#phoneSupport').addClass(cls);
                if (data[0].coursePromotion == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#coursePromotion').addClass(cls);
                if (data[0].contentServices == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#ContentServices').addClass(cls);
                if (data[0].profileManagement == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#profileManagement').addClass(cls);
                if (data[0].selectionSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#selectionSupport').addClass(cls);

                //Starter Plan
                $('#planNameFree1').html(data[1].planName);
                $('#planAmtfree1').html(data[1].planAmount);
                $('#nofat1').html(data[1].noofAttendee);
                if (data[1].noofAttendee != 0) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#noofAtt').addClass(cls);


                if (data[1].emailSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#emailSupport1').addClass(cls);

                if (data[1].phoneSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#emailSupport1').addClass(cls);

                if (data[1].phoneSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#phoneSupport1').addClass(cls);
                if (data[1].coursePromotion == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#coursePromotion1').addClass(cls);
                if (data[1].contentServices == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#ContentServices1').addClass(cls);
                if (data[1].profileManagement == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#profileManagement1').addClass(cls);
                if (data[1].selectionSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#selectionSupport1').addClass(cls);
                //Extended Plan
                $('#planNameFree2').html(data[2].planName);
                $('#planAmtfree2').html(data[2].planAmount);
                $('#nofat2').html(data[2].noofAttendee);
                if (data[2].noofAttendee != 0) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#noofAttendee2').addClass(cls);


                if (data[2].emailSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#emailSupport2').addClass(cls);

                if (data[2].phoneSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#emailSupport2').addClass(cls);

                if (data[2].phoneSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#phoneSupport2').addClass(cls);
                if (data[2].coursePromotion == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#coursePromotion2').addClass(cls);
                if (data[2].contentServices == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#ContentServices2').addClass(cls);
                if (data[2].profileManagement == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#profileManagement2').addClass(cls);
                if (data[2].selectionSupport == true) {
                    cls = "bx bx-check-double";
                }
                else {
                    cls = "bx bx-x";
                }
                $('#selectionSupport2').addClass(cls);

            },
            error: function (msg) {
                alert(msg.responseText);
            }
        });
}