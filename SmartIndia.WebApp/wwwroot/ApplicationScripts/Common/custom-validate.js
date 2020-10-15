
function BootstrapAlert(msg, cntr) {
    var $textAndPic = $('<div></div>');
    $textAndPic.append('<img src="../../assets/img/white-logo.png" />');
    $textAndPic.append('Information');

    BootstrapDialog.show({
        message: msg,
        title: $textAndPic,
        buttons: [{
            id: 'btn-ok',
            icon: 'fa fa-check',
            label: 'OK',
            cssClass: 'btn btn-success',
            autospin: false,
            action: function (dialogRef) {
                dialogRef.close();
                if (cntr == 'reload') {
                    top.hidePageModal({ reload: true });
                }
            }
        }],
        onhidden: function (dialogRef) {
            if (cntr != '')
                $('#' + cntr).focus();
        },
        onshown:
            function (dialogRef) {
                var $exampleModal = $("#btn-ok");
                $exampleModal.focus();
            }
    });
}
function IsSpecialCharacter1stPalce(cntr) {
    var strValue = $('#' + cntr).val();
    // BootstrapAlert(strValue);
    if (strValue != "") {
        var FistChar = strValue.charAt(0);
        if (/^[a-zA-Z0-9]*$/.test(FistChar) == false) {
            BootstrapAlert('Special characters Or White space are not allowed at first place !!!', cntr);
            return false;
        } else { return true; }
        return true;
    }
    else
        return true;
}
function IsWhiteSpace1stPalce(cntr) {
    var strValue = $('#' + cntr).val();
    // BootstrapAlert(strValue);
    if (strValue != "") {
        var FistChar = strValue.charAt(0);
        if (FistChar == " ") {
            BootstrapAlert('White space are not allowed at 1st place !!!', cntr);
            return false;
        } else { return true; }
        return true;
    }
    else
        return true;
}

function DecimalNumber(cntr, strText) {
    var regexPattern = /^\d{0,18}(\.\d{1,3})?$/;
    var entered_value = $('#' + cntr).val();
    if (!regexPattern.test(entered_value)) {
        BootstrapAlert('Enter a valid ' + strText, cntr);
        return false;
    }
    else
        return true;
}

function MobileNumber(cntr) {
    var Mobile = /^[7-9][0-9]{9}$/
    var entered_no = $('#' + cntr).val();
    if (entered_no != '') {
        if (!Mobile.test(entered_no)) {
            BootstrapAlert('Enter a valid Mobile Number', cntr);
            return false;
        }
        else
            return true;
    }
    else
        return true;
}
function CompareDateRange(Controlname1, Controlname2, Fieldname1, Fieldname2) {
    var fromDate = $("input#" + Controlname1).val();
    var toDate = $("input#" + Controlname2).val();
    //BootstrapAlert(fromDate+'==='+toDate);
    if (toDate != "") {
        var dateParts = fromDate.split("-");
        var newDateStr = dateParts[1] + " " + dateParts[0] + ", " + dateParts[2];
        var fdate = new Date(newDateStr);
        // BootstrapAlert(fdate);
        var dateParts1 = toDate.split("-");
        var newDateStr1 = dateParts1[1] + " " + dateParts1[0] + ", " + dateParts1[2];
        var tdate = new Date(newDateStr1);
        // BootstrapAlert(tdate);
        if (fdate > tdate) {
            BootstrapAlert("Invalid Date Range!\n" + Fieldname2 + " can not be before " + Fieldname1, Controlname2);
            return false;
        }
        return true;
    }
}


function CompareNumberRange(Controlname1, Controlname2, Fieldname1, Fieldname2) {

    var min = $("#" + Controlname1).val();
    var max = $("#" + Controlname2).val();
    if (max != null && max != "") {
        alert("o");
        if (min > max) {
            BootstrapAlert("Invalid Price Range!\n" + Fieldname2 + " can not be less than " + Fieldname1, Controlname2);
            return false;
        }
        return true;
    }
}

function CompareTwoDate(Controlname1, Controlname2, Fieldname1, Fieldname2) {
    var fromDate = $("input#" + Controlname1).val();
    var toDate = $("input#" + Controlname2).val();
    //BootstrapAlert(fromDate+'==='+toDate);
    if (toDate != "") {
        var dateParts = fromDate.split("-");
        var newDateStr = dateParts[1] + " " + dateParts[0] + ", " + dateParts[2];
        var fdate = new Date(newDateStr);
        // BootstrapAlert(fdate);
        var dateParts1 = toDate.split("-");
        var newDateStr1 = dateParts1[1] + " " + dateParts1[0] + ", " + dateParts1[2];
        var tdate = new Date(newDateStr1);
        // BootstrapAlert(tdate);
        if (fdate > tdate) {
            BootstrapAlert(Fieldname2 + " can not be before " + Fieldname1, Controlname2);
            return false;
        }
        return true;
    }
}

function ValidateEmail(cntr) {
    var email = $('#' + cntr).val();
    //BootstrapAlert(email);
    if (email != "") {
        var reg = /^[A-Za-z0-9]([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        //var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        if (!reg.test(email)) {
            BootstrapAlert('Enter a valid email id', cntr);
            return false;
        }
        else
            return true;
    }
    else
        return true;
};


function ValidateDropdown(cntr, strText) {
    var strValue = $('#' + cntr).val();
    if (strValue.length == 0 || strValue == "0") {
        BootstrapAlert("Please Select " + strText, cntr);
        return false;
    }
    else
        return true;
}

function BlankTextBox(cntr, strText) {
    var strValue = $('#' + cntr).val();
    if (strValue == "") {
        BootstrapAlert(strText + " can not be left blank", cntr);
        return false;
    }
    else
        return true;
}
function CheckSpanLength(cntr, strText) {
    var strValue = $('.' + cntr).length;
    if (strValue == 1) {
        BootstrapAlert(strText + " can not be left blank", cntr);
        return false;
    }
    else
        return true;
}
function CheckSpanLengthFromID(cntr, strText) {
    var result = [];
    var days = "";
    $('#' + cntr).each(function () {
        days += $(this).attr("data-val") + ",";
    });
    var array1 = days.split(",");
    $.each(array1, function (i) {
        if (array1[i] == "undefined") {
        }
        else if (array1[i] == "") {
        }
        else {
            var dayName = array1[i];
            result.push(dayName);
        }
    });
    if (result.length == 0) {
        BootstrapAlert(strText + " can not be left blank", cntr);
        return false;
    }
    else
        return true;
}



function ValidateFile(cntr, strText) {
    //debugger;
    var strValue = $('#' + cntr).get(0).files.length;
    if (strValue == "0") {
        BootstrapAlert("Please upload " + strText + " copy", cntr);
        return false;
    }
    else
        return true;
}

function CheckFileType(cntr, ftype) {

    // Get the file upload control file extension
    var extn = $('#' + cntr).val().split('.').pop().toLowerCase();
    if (extn != '') {
        //debugger;        
        // Create array with the files extensions to upload
        var fileListToUpload;
        if (parseInt(ftype) == 1)
            fileListToUpload = new Array('pdf', 'gif', 'jpg', 'jpeg');
        else if (parseInt(ftype) == 2)
            fileListToUpload = new Array('gif', 'jpg', 'jpeg');
        else
            fileListToUpload = new Array('pdf');

        //Check the file extension is in the array.               
        var isValidFile = $.inArray(extn, fileListToUpload);

        // isValidFile gets the value -1 if the file extension is not in the list.  
        if (isValidFile == -1) {
            if (parseInt(ftype) == 1)
                BootstrapAlert('Please select a valid file of type pdf/gif/jpeg.', cntr);
            else if (parseInt(ftype) == 2)
                BootstrapAlert('Please select a valid file of type gif/jpeg.', cntr);
            else
                BootstrapAlert('Please select a valid pdf file only', cntr);
            $('#' + cntr).replaceWith($('#' + cntr).val('').clone(true));
        }
        else {
            // Restrict the file size to 500 KB.
            if ($('#' + cntr).get(0).files[0].size > (1024 * 500)) {
                BootstrapAlert('File size should not exceed 500 KB.', cntr);
                $('#' + cntr).replaceWith($('#' + cntr).val('').clone(true));
            }
            if ($('#' + cntr).get(0).files[0].name.length > 50) {
                BootstrapAlert('File Name should be maximum 50 Characters', cntr);
                $('#' + cntr).replaceWith($('#' + cntr).val('').clone(true));
            }
            else
                return true;
        }
    }
    else
        return true;
}

function CheckZero(cntr, strText) {
    var strValue = $('#' + cntr).val();
    if (strValue == "0") {
        BootstrapAlert(strText + " can not be zero", cntr);
        return false;
    }
    else
        return true;
}

function ValidatePAN(cntr) {
    var PAN = $('#' + cntr).val();
    if (PAN != "") {
        var panPat = /^([a-zA-Z]{5})(\d{4})([a-zA-Z]{1})$/;
        var code = /([C,P,H,F,A,T,B,L,J,G])/;
        var code_chk = PAN.substring(3, 4);
        if (PAN.search(panPat) == -1) {
            BootstrapAlert("Invalid Pan No", cntr);
            return false;
        }
        if (!code.test(code_chk)) {
            BootstrapAlert("Invaild PAN No.", cntr);
            return false;
        }
        else
            return true;
    }
    else
        return true;
}


function CheckGreaterDate(cntr, strText) {
    var myDate = $("input#" + cntr).val();
    // BootstrapAlert(myDate + '===' + curDate);
    if (curDate != "") {
        var dateParts = myDate.split("-");
        var newDateStr = dateParts[1] + " " + dateParts[0] + ", " + dateParts[2];
        var cDate = new Date(newDateStr);
        //BootstrapAlert(cDate);
        var dateParts1 = curDate.split("-");
        var newDateStr1 = dateParts1[1] + " " + dateParts1[0] + ", " + dateParts1[2];
        var tdate = new Date(newDateStr1);
        //BootstrapAlert(tdate);
        if (cDate > tdate) {
            BootstrapAlert(strText + " must be less than or equal to current date", cntr);
            return false;
        }
        return true;
    }
}

function CheckLessDate(cntr, strText) {
    var myDate = $("input#" + cntr).val();
    var now = new Date();
    //BootstrapAlert(myDate + '===' + curDate);
    if (curDate != "") {
        var dateParts = myDate.split("-");
        var newDateStr = dateParts[1] + " " + dateParts[0] + ", " + dateParts[2];
        var cDate = new Date(newDateStr);
        //BootstrapAlert(cDate);
        var dateParts1 = curDate.split("-");
        var newDateStr1 = dateParts1[1] + " " + dateParts1[0] + ", " + dateParts1[2];
        var tdate = new Date(newDateStr1);
        //BootstrapAlert(tdate);
        if (cDate < tdate) {
            BootstrapAlert(strText + " must be greater than or equal to current date", cntr);
            return false;
        }
        return true;
    }
}


function CheckUncheckGrid() {
    var totChk = $('.RowCheck input[type="checkbox"]').length;
    var totChecked;
    $('[id$=chkSelectAll]').change(function () {
        if ($(this).is(':checked')) {
            $('.RowCheck input[type="checkbox"]').prop('checked', true);
        } else {
            $('.RowCheck input[type="checkbox"]').prop('checked', false);
        }
    });
    $('.RowCheck input[type="checkbox"]').change(function () {
        totChecked = $('.RowCheck input[type="checkbox"]:checked').length;
        if (totChecked == totChk) {
            $('[id$=chkSelectAll]').prop('checked', true);
        } else {
            $('[id$=chkSelectAll]').prop('checked', false);
        }
    });
}

function CheckTime(ctrlDate, cntrFromTime, cntrToTime) {
    var myDate = $("input#" + ctrlDate).val();
    var myFromTime = $("input#" + cntrFromTime).val();
    var myToTime = $("input#" + cntrToTime).val();
    //BootstrapAlert(myDate + '===' + curDate);
    if (myDate != "") {
        var dateParts = myDate.split("-");
        var newDateStr = dateParts[1] + " " + dateParts[0] + ", " + dateParts[2];
        var StartTime = new Date(newDateStr + ' ' + myFromTime);
        // BootstrapAlert(StartTime);       
        //        var dateParts1 = curDate.split("-");
        //        var newDateStr1 = dateParts1[1] + " " + dateParts1[0] + ", " + dateParts1[2];
        var EndTime = new Date(newDateStr + ' ' + myToTime);
        //BootstrapAlert(EndTime);
        var DiffTime = new Number(EndTime.getTime() - StartTime.getTime());
        if (DiffTime < 0) {
            BootstrapAlert('Out Time Can Not Be Earlier Than In Time', cntrToTime);
            //$('#txtOutTime').focus();
            return false;
        }
        return true;
    }
}

function DateDifference(Controlname1, Controlname2, DType) {
    var fromDate = $("input#" + Controlname1).val();
    var toDate = $("input#" + Controlname2).val();
    //BootstrapAlert(fromDate+'==='+toDate);
    if (toDate != "") {
        var dateParts = fromDate.split("-");
        var newDateStr = dateParts[1] + " " + dateParts[0] + ", " + dateParts[2];
        var fdate = new Date(newDateStr);
        // BootstrapAlert(fdate);
        var dateParts1 = toDate.split("-");
        var newDateStr1 = dateParts1[1] + " " + dateParts1[0] + ", " + dateParts1[2];
        var tdate = new Date(newDateStr1);
        // BootstrapAlert(tdate);
        var diff_date = tdate - fdate; BootstrapAlert(diff_date, '');
        var num_years = diff_date / 31536000000;
        var num_months = (diff_date % 31536000000) / 2628000000;
        var num_days = ((diff_date % 31536000000) % 2628000000) / 86400000;

        if (DType == "D") {
            return Math.floor(num_days);
        }
        if (DType == "M") {
            return Math.floor(num_months);
        }
        if (DType == "Y") {
            return Math.floor(num_years);
        }
    }
}

function GetDateDifference(fromDate, toDate, DType) {
    //BootstrapAlert(fromDate+'==='+toDate);    
    if (toDate != "") {
        var dateParts = fromDate.split("-");
        var newDateStr = dateParts[1] + " " + dateParts[0] + ", " + dateParts[2];
        var fdate = new Date(newDateStr);
        //BootstrapAlert(fdate);
        var dateParts1 = toDate.split("-");
        var newDateStr1 = dateParts1[1] + " " + dateParts1[0] + ", " + dateParts1[2];
        var tdate = new Date(newDateStr1);
        //BootstrapAlert(tdate);
        var diff_date = tdate - fdate;
        //BootstrapAlert(diff_date);
        var num_years = diff_date / 31536000000;
        var num_months = (diff_date % 31536000000) / 2628000000;
        var num_days = ((diff_date % 31536000000) % 2628000000) / 86400000;
        //BootstrapAlert(num_years);
        if (DType == "D") {
            return Math.floor(num_days);
        }
        if (DType == "M") {
            return Math.floor(num_months);
        }
        if (DType == "Y") {
            return Math.floor(num_years);
        }
    }
}

// For checking max length (controlId, CharacterLimit, SpanId)
function chkMaxLength(e, t, n) { try { if (document.getElementById(e) != null) { e = document.getElementById(e) } if (e != null) { if (e.value[0] == " ") { e.value = e.value.substr(1, e.value.length); e.value = e.value.trim() } if (e.value.length > t) { e.value = e.value.substring(0, t); BootstrapAlert("Maximum " + t + " characters are allowed.", e); e.focus() } } n = document.getElementById(n); if (n != null) { if (e.value.length == 0) { $(n).html("Maximum " + t + " characters are allowed.") } else { $(n).html(t - e.value.length + " characters are left.") } } } catch (r) { } }
// To check decimal (controlId, DecimalPlaces)
function CheckDecimal(e, t) { try { var n = ""; var r; if (parseInt(t)) { r = t } else { r = 2 } var i = document.getElementById(e); if (i == "undefined" || i == null) { i = e } if (typeof i.value === "undefined") { n = i.innerHTML.trim() } else { n = i.value.trim() } if (n.split(".").length - 1 > 1 || n.charAt(n.length - 1) == "." || n.charAt(0) == ".") { if (typeof i.value === "undefined") { setTimeout(function () { BootstrapAlert("Please enter valid decimal !", ''); $("#" + i.getAttribute("id")).effect("shake", { direction: "left", times: 2, distance: 5 }, 800) }, 1) } else { setTimeout(function () { BootstrapAlert("Please enter valid decimal !", $(i)); $(i).focus() }, 1) } return false } else { if (n.substr(n.lastIndexOf(".") + 1, n.length).length > r && n.lastIndexOf(".") > -1) { if (typeof i.value === "undefined") { setTimeout(function () { BootstrapAlert("Only " + r + " digits are allowed after decimal !", $("#" + i.getAttribute("id"))); $("#" + i.getAttribute("id")).effect("shake", { direction: "left", times: 2, distance: 5 }, 800) }, 1) } else { setTimeout(function () { BootstrapAlert("Only " + r + " digits are allowed after decimal !", $(i)); $(i).focus() }, 1) } return false } else { return true } } } catch (s) { } }
// To make decimal (controlId, DecimalPlace)
function makeDecimal(e, t) { var n = document.getElementById(e); var r; if (parseInt(t)) { r = t } else { r = 2 } if (n == "undefined" || n == null) { n = e } if (typeof n.value === "undefined") { if (n.innerHTML.trim().length > 0) { n.innerHTML = parseFloat(n.innerHTML.trim()).toFixed(r) } } else { if (n.value.trim().length > 0) { n.value = parseFloat(n.value.trim()).toFixed(r) } } }
// Remove Initial space (controlId)
function RemoveInitialSpace(e) { var t = document.getElementById(e); if (t == "undefined" || t == null) { t = e } try { if (t.value[0] == " ") { t.value = t.value.substr(1, t.value.length); t.value = t.value.trim() } } catch (n) { } }
// Scroll to Page top
$.fn.scrollView = function () { return this.each(function () { $("html, body").animate({ scrollTop: $(this).offset().top - 20 }, 100) }) }
// Check selection of records before delete (GridViewId, CheckBoxCellNo)
function CheckBeforeDelete(e, t) {
    try {
        var n = false; $("#" + e + " tr").find("td:nth-child(" + t + ")").each(function () {
            if ($(this).find("input:checkbox").prop("checked") === true) { n = true }
        });
        if (n) {

            if (BootStrapDelete("Are you sure you want to Delete the Record(s) !")) {
                return true
            } else {
                return false
            }
        } else {
            setTimeout(function () {
                BootstrapAlert("Please select a Record to Delete !", '');
                $("#" + e + " tr").each(function () {
                    //if (!$(this).find("td:eq(" + (parseInt(t) - 1) + ")").find("input:checkbox").prop("disabled")) {
                    if ($(this).find("td:eq(" + (parseInt(t) - 1) + ")").find('.RowCheck').length > 0) {
                        $(this).find("td:eq(" + (parseInt(t) - 1) + ")").effect("highlight", { color: "#d9534f" }, 1e3)
                    }
                })
            }, 1); return false;
        }
    } catch (r) { BootstrapAlert(r) }
}

//To Check the checkbox selected in the gridview for Submit
function CheckGridSubmit(e, t, Message) {
    try {
        var n = false; $("#" + e + " tr").find("td:nth-child(" + t + ")").each(function () {
            if ($(this).find("input:checkbox").prop("checked") === true) { n = true }
        });
        if (n) {
            if (BootStrapSubmitConfirm("Are you sure you want to submit the record(s) !")) {
                return true
            } else {
                return false
            }
            //return true;
        }
        else {
            setTimeout(function () {
                BootstrapAlert('Please select a Record to ' + Message + ' !', '');

                $("#" + e + " tr").each(function () {
                    //if (!$(this).find("td:eq(" + (parseInt(t) - 1) + ")").find("input:checkbox").prop("disabled")) {
                    if ($(this).find("td:eq(" + (parseInt(t) - 1) + ")").find('.RowCheck').length > 0) {
                        $(this).find("td:eq(" + (parseInt(t) - 1) + ")").effect("highlight", { color: "#d9534f" }, 1e3)
                    }
                })
            }, 1); return false;
        }
    } catch (r) { BootstrapAlert(r) }
}
// Put Water Mark for a TextBox / TextArea (controlId, defaultValue)
function WaterMark(a, r) { try { var t = $("#" + a); ("undefined" == t || null == t) && (t = a), t.attr("placeholder", r) } catch (e) { } }
//************************************************************************************************************

//To Check Length of a string
function checkLength(cntr, chr) {
    maxLen = chr; // max number of characters allowed            
    var strValue = $('#' + cntr).val();
    //BootstrapAlert(strValue); BootstrapAlert(strValue.length);
    if (strValue.length > maxLen) {
        // BootstrapAlert message if maximum limit is reached.        
        var msg = "You have reached your maximum limit of characters allowed";
        BootstrapAlert(msg, cntr);
        // Reached the Maximum length so trim the textarea
        $('#' + cntr).val(strValue.substring(0, maxLen));
        $(".remaining").html(0);
    }
    else {
        // Maximum length not reached so update the value of my_text counter
        $(".remaining").html(maxLen - strValue.length);
    }
}

function checkLengthBySpanId(cntr, chr, spanid) {
    maxLen = chr; // max number of characters allowed            
    var strValue = $('#' + cntr).val();
    //BootstrapAlert(strValue); BootstrapAlert(strValue.length);
    if (strValue.length > maxLen) {
        // BootstrapAlert message if maximum limit is reached.        
        var msg = "You have reached your maximum limit of characters allowed";
        BootstrapAlert(msg, cntr);
        // Reached the Maximum length so trim the textarea
        $('#' + cntr).val(strValue.substring(0, maxLen));
        $('#' + spanid).val(0);
    }
    else {
        // Maximum length not reached so update the value of my_text counter
        $('#' + spanid).val(maxLen - strValue.length);
    }
}


//==========================================================================


function ValidateCheckListBox(chklist, msg) {
    try {
        var chkboxlist = $('#' + chklist + ' input:checked');
        if (chkboxlist.length > 0) {
            return true;
        }
        else {
            BootstrapAlert('Please select atleast one ' + msg, chklist);
            return false;
        }
    } catch (e) {

    }
}
function MinimumLengthValidation(textbox, length, msg) {
    try {
        var textboxid = $('#' + textbox);
        if (textboxid.val().length < length) {
            BootstrapAlert("Please enter minimum " + length + msg, textbox);

            return false;
        }
        else {
            return true;
        }

    } catch (e) {

    }
}
function groupTable($rows, startIndex, total) {
    if (total === 0) {
        return;
    }
    var i, currentIndex = startIndex, count = 1, lst = [];
    var tds = $rows.find('td:eq(' + currentIndex + ')');
    var ctrl = $(tds[0]);
    lst.push($rows[0]);
    for (i = 1; i <= tds.length; i++) {
        if (ctrl.text() == $(tds[i]).text()) {
            count++;
            $(tds[i]).addClass('deleted');
            lst.push($rows[i]);
        }
        else {
            if (count > 1) {
                ctrl.attr('rowspan', count);
                groupTable($(lst), startIndex + 1, total - 1)
            }
            count = 1;
            lst = [];
            ctrl = $(tds[i]);
            lst.push($rows[i]);
        }
    }
}

(function ($) {

    $.fn.areYouSure = function (options) {

        var settings = $.extend(
            {
                'message': 'You have unsaved changes!',
                'dirtyClass': 'dirty',
                'change': null,
                'silent': false,
                'addRemoveFieldsMarksDirty': false,
                'fieldEvents': 'change keyup propertychange input',
                'fieldSelector': ":input:not(input[type=submit]):not(input[type=button])"
            }, options);

        var getValue = function ($field) {
            if ($field.hasClass('ays-ignore')
                || $field.hasClass('aysIgnore')
                || $field.attr('data-ays-ignore')
                || $field.attr('name') === undefined) {
                return null;
            }

            if ($field.is(':disabled')) {
                return 'ays-disabled';
            }

            var val;
            var type = $field.attr('type');
            if ($field.is('select')) {
                type = 'select';
            }

            switch (type) {
                case 'checkbox':
                case 'radio':
                    val = $field.is(':checked');
                    break;
                case 'select':
                    val = '';
                    $field.find('option').each(function (o) {
                        var $option = $(this);
                        if ($option.is(':selected')) {
                            val += $option.val();
                        }
                    });
                    break;
                default:
                    val = $field.val();
            }

            return val;
        };

        var storeOrigValue = function ($field) {
            $field.data('ays-orig', getValue($field));
        };

        var checkForm = function (evt) {

            var isFieldDirty = function ($field) {
                var origValue = $field.data('ays-orig');
                if (undefined === origValue) {
                    return false;
                }
                return (getValue($field) != origValue);
            };

            var $form = ($(this).is('form'))
                ? $(this)
                : $(this).parents('form');

            // Test on the target first as it's the most likely to be dirty
            if (isFieldDirty($(evt.target))) {
                setDirtyStatus($form, true);
                return;
            }

            $fields = $form.find(settings.fieldSelector);

            if (settings.addRemoveFieldsMarksDirty) {
                // Check if field count has changed
                var origCount = $form.data("ays-orig-field-count");
                if (origCount != $fields.length) {
                    setDirtyStatus($form, true);
                    return;
                }
            }

            // Brute force - check each field
            var isDirty = false;
            $fields.each(function () {
                $field = $(this);
                if (isFieldDirty($field)) {
                    isDirty = true;
                    return false; // break
                }
            });

            setDirtyStatus($form, isDirty);
        };

        var initForm = function ($form) {
            var fields = $form.find(settings.fieldSelector);
            $(fields).each(function () { storeOrigValue($(this)); });
            $(fields).unbind(settings.fieldEvents, checkForm);
            $(fields).bind(settings.fieldEvents, checkForm);
            $form.data("ays-orig-field-count", $(fields).length);
            setDirtyStatus($form, false);
        };

        var setDirtyStatus = function ($form, isDirty) {
            var changed = isDirty != $form.hasClass(settings.dirtyClass);
            $form.toggleClass(settings.dirtyClass, isDirty);

            // Fire change event if required
            if (changed) {
                if (settings.change) settings.change.call($form, $form);

                if (isDirty) $form.trigger('dirty.areYouSure', [$form]);
                if (!isDirty) $form.trigger('clean.areYouSure', [$form]);
                $form.trigger('change.areYouSure', [$form]);
            }
        };

        var rescan = function () {
            var $form = $(this);
            var fields = $form.find(settings.fieldSelector);
            $(fields).each(function () {
                var $field = $(this);
                if (!$field.data('ays-orig')) {
                    storeOrigValue($field);
                    $field.bind(settings.fieldEvents, checkForm);
                }
            });
            // Check for changes while we're here
            $form.trigger('checkform.areYouSure');
        };

        var reinitialize = function () {
            initForm($(this));
        }

        if (!settings.silent && !window.aysUnloadSet) {
            window.aysUnloadSet = true;
            $(window).bind('beforeunload', function () {
                $dirtyForms = $("form").filter('.' + settings.dirtyClass);
                if ($dirtyForms.length == 0) {
                    return;
                }
                // Prevent multiple prompts - seen on Chrome and IE
                if (navigator.userAgent.toLowerCase().match(/msie|chrome/)) {
                    if (window.aysHasPrompted) {
                        return;
                    }
                    window.aysHasPrompted = true;
                    window.setTimeout(function () { window.aysHasPrompted = false; }, 900);
                }
                return settings.message;
            });
        }

        return this.each(function (elem) {
            if (!$(this).is('form')) {
                return;
            }
            var $form = $(this);

            $form.submit(function () {
                $form.removeClass(settings.dirtyClass);
            });
            $form.bind('reset', function () { setDirtyStatus($form, false); });
            // Add a custom events
            $form.bind('rescan.areYouSure', rescan);
            $form.bind('reinitialize.areYouSure', reinitialize);
            $form.bind('checkform.areYouSure', checkForm);
            initForm($form);
        });
    };
})(jQuery);


function BootStrapRedirect(msg, url) {

    BootstrapDialog.show({
        closable: false, // <-- Default value is false
        message: msg,
        buttons: [{
            label: 'Ok',
            cssClass: 'btn-success',
            action: function (dialogRef) {
                if (url != '') {
                    window.location.href = url;
                }
                else {
                    dialogRef.close();
                }
            }
        }]
    });
    $('.close').hide();
}

function BootStrapSubmit(cntr, msgSave, msgUpdate, fun) {
    var Msg;
    if ($('#' + cntr).val() == 'Update') {
        Msg = msgUpdate;
    }
    else {
        Msg = msgSave;
    }
    var $textAndPic = $('<div></div>');
    $textAndPic.append('<img src="../../assets/img/white-logo.png" />');
    $textAndPic.append('Confirmation');

    BootstrapDialog.confirm({
        title: $textAndPic,
        message: Msg,
        type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: true, // <-- Default value is false
        draggable: true, // <-- Default value is false
        btnOKLabel: 'Ok', // <-- Default value is 'OK',
        btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
        btnOKClass: 'btn btn-success', // <-- If you didn't specify it, dialog type will be used,
        callback:
            function (result) {
                // result will be true if OK button was click, while it will be false if users close the dialog directly.
                if (result) {
                    fun(); //fun() : javascript function write before call BootStrapSubmit
                } else {
                    return true;
                }
                return result;
            }
    });
}

function BootStrapSubmitClaim(cntr, msgSave, status) {
    //debugger;
    var Msg;
    if ($('#' + cntr).val() == 'Update') {
        Msg = msgUpdate;
    }
    else {
        Msg = msgSave;
    }
    var $textAndPic = $('<div></div>');
    $textAndPic.append('<img src="../../assets/img/white-logo.png" />');
    $textAndPic.append('Confirmation');

    BootstrapDialog.confirm({
        title: $textAndPic,
        message: Msg,
        type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: true, // <-- Default value is false
        draggable: true, // <-- Default value is false
        btnOKLabel: 'Ok', // <-- Default value is 'OK',
        btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
        btnOKClass: 'btn btn-success', // <-- If you didn't specify it, dialog type will be used,
        callback: function (result) {
            //            BootstrapAlert(result);
            //            // result will be true if button was click, while it will be false if users close the dialog directly.
            if (result) {

                if (status == 'A') {

                    $("#hidAppFlag").val("1");
                }
                else if (status == 'R') {

                    $("#hidRejFlag").val("1");
                }
                else if (status == 'I') {

                    $("#hidInvFlag").val("1");
                }
                console.log(cntr);
                //__doPostBack(cntr, '');
                setTimeout(function () { __doPostBack(cntr); }, 1);
                if ($(this).dialog.isOpen === true) {
                    $(this).dialog("close");
                }
            } else {

            }
            return result;

        }

    });



}
function ConfirmAction(cntr, msgSave, msgUpdate) {
    var strValue = $('#' + cntr).val();
    if (strValue == 'Update') {
        if (confirm(msgUpdate)) {
            return true;
        }
        else
            return false;
    }
    else {
        if (confirm(msgSave)) {
            return true;
        }
        else
            return false;
    }
}
function ConfirmDelete(msg) {
    if (confirm(msg)) {
        return true;
    }
    else
        return false;
}
function BootStrapDelete(Msg) {
    BootstrapDialog.confirm({
        title: 'Confirmation',
        message: Msg,
        type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: true, // <-- Default value is false
        draggable: true, // <-- Default value is false
        btnOKLabel: 'Ok', // <-- Default value is 'OK',
        btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
        btnOKClass: 'btn btn-success', // <-- If you didn't specify it, dialog type will be used,
        callback: function (result) {
            //            BootstrapAlert(result);
            //            // result will be true if button was click, while it will be false if users close the dialog directly.
            if (result) {
                $("#hidDeleteFlag").val("1");
                //__doPostBack('btnDelete', '');
                setTimeout(function () { __doPostBack('btnDelete'); }, 1);
            }
            return result;
        }
    });
}
function BootStrapSubmitConfirm(Msg) {
    BootstrapDialog.confirm({
        title: 'Confirmation',
        message: Msg,
        type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: true, // <-- Default value is false
        draggable: true, // <-- Default value is false
        btnOKLabel: 'Ok', // <-- Default value is 'OK',
        btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
        btnOKClass: 'btn btn-success', // <-- If you didn't specify it, dialog type will be used,
        callback: function (result) {
            //            BootstrapAlert(result);
            //            // result will be true if button was click, while it will be false if users close the dialog directly.
            if (result) {
                $("#hidSubmitFlag").val("1");
                setTimeout(function () { __doPostBack('btnSubmit'); }, 1);
                if ($(this).dialog.isOpen === true) {
                    $(this).dialog("close");
                }
                //$(this).dialog("close");
            } else {

            }
            return result;

        }

    });



}
function BootStrapImageButtonDelete(Msg, ctl) {
    var ctlid = ctl.id;

    var row = ctl.parentNode.parentNode; //to get row containing image
    var rowIndex = row.rowIndex - 1; //row index of that row.
    //BootstrapAlert(rowIndex);

    BootstrapDialog.confirm({
        title: 'Confirmation',
        message: Msg,
        type: BootstrapDialog.TYPE_PRIMARY, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: true, // <-- Default value is false
        draggable: true, // <-- Default value is false
        btnOKLabel: 'Ok', // <-- Default value is 'OK',
        btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
        btnOKClass: 'btn btn-success', // <-- If you didn't specify it, dialog type will be used,
        callback: function (result) {

            //            // result will be true if button was click, while it will be false if users close the dialog directly.
            if (result) {
                $("#hidDeleteFlag").val("1");
                $("#hidRowIndex").val(rowIndex);
                //__doPostBack(ctlid, '');
                setTimeout(function () { __doPostBack(ctlid); }, 1);
            }
            return result;
        }
    });
}

function TextCounter(ctlTxtName, lblCouter, numTextSize) {
    var txtName = document.getElementById(ctlTxtName).value;
    var txtNameLength = txtName.length;
    if (parseInt(txtNameLength) > parseInt(numTextSize)) {
        var txtMaxTextSize = txtName.substr(0, numTextSize)
        document.getElementById(ctlTxtName).value = txtMaxTextSize;
        BootstrapAlert("Entered Text Exceeds '" + numTextSize + "' Characters.");
        document.getElementById(lblCouter).innerHTML = 0;
        return false;
    }
    else {
        document.getElementById(lblCouter).innerHTML = parseInt(numTextSize) - parseInt(txtNameLength);
        return true;
    }
}
function MinimumNumLengthValidation(textbox, length) {
    try {
        var textbox = $('#' + textbox);
        if (textbox.val().length < length) {
            BootstrapAlert("Please enter minimum " + length + " numbers");
            textbox.focus();
            return false;
        }
        else {
            return true;
        }

    } catch (e) {

    }
}
function chkSingleQuote(Controlname) {
    var objfrm = document.getElementById(Controlname);
    var strInput = new String(objfrm.value);
    var str1 = strInput;
    for (var i = 0; i < str1.length; i++) {
        var ch = str1.substring(i, i + 1);
        if (ch == "'") {
            BootstrapAlert('Single Quote not allowed!', Controlname);
            return false;
        }
    }
    return true;

}



function callconfirm(cntr, msgSave, msgUpdate) {
    var isConfirmed
    BootstrapDialog.confirm({
        title: 'Submission',
        message: 'Are you Sure you want want to Save?',
        type: BootstrapDialog.TYPE_WARNING, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
        closable: false, // <-- Default value is false
        draggable: false, // <-- Default value is false
        btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
        btnOKLabel: 'Ok', // <-- Default value is 'OK',
        btnOKClass: 'btn btn-success', // <-- If you didn't specify it, dialog type will be used,
        callback: function (result) {
            if (result) {
                // whatever code you want to run on callback
                // to submit the form
                $("#Form1").submit();
            }
        }
    });
}
function isValidPassword(cntr) {
    var strInput = new String($('#' + cntr).val())
    if (trim(strInput) == "") {
        return true;
    }
    var pattern = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
    if (pattern.test($('#' + cntr).val())) {
        return true;
    } else {
        BootstrapAlert('Passwords must be at least 8 characters and contain at 3 of 4 of the following: upper case (A-Z), lower case (a-z), number (0-9) and special character (e.g. !@#$%^&*)', cntr);
        return false;
    }
}
function isPasswordMatch(pwd, cpwd) {

    if ($('#' + pwd).val() != $('#' + cpwd).val()) {
        BootstrapAlert("Passwords do not match.", cpwd);
        return false
    }
    else
        return true
}
//-------------------------------------Function to Trim a String--------------------------------------------
function trim(strString) {
    var strCopy = new String(strString)
    strCopy = strCopy.replace(/^\s+/, "")
    strCopy = strCopy.replace(/\s+$/, "")
    return strCopy.toString()
}
//-------------------------------------Function to Generate 4 digit Random Number for OTP--------------------------------------------
function generateOTP() { 
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
} 
//-----------------------Get Query String Parameter values using param name
function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}  