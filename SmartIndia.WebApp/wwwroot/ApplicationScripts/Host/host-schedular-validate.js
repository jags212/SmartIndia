﻿function ValidateSchedularForm() {

    if (!ValidateDropdown('inputCourses', 'Course Name')) {
        return false;
    }
    else if (!BlankTextBox('BatchNameOnce', 'Batch Name')) {
        return false;
    }
    else if (!BlankTextBox('ScDate', 'Date')) {
        return false;
    }
    else if (!ValidateDropdown('StartTime', 'Start Time')) {
        return false;
    }
    else if (!ValidateDropdown('Duration', 'Duration')) {
        return false;
    }
   
    else {
        return true;
    }
}

function ValidateSchedularFormRc() {

    if (!ValidateDropdown('inputCourses', 'Course Name')) {
        return false;
    }
    else if (!BlankTextBox('BatchNameOnce', 'Batch Name')) {
        return false;
    }
    if (!ValidateDropdown('ddlrecurringschedule', 'Recurring Schedule')) {
        return false;
    }
    else if (!BlankTextBox('datepickerFrom', 'From Date')) {
        return false;
    }
    else if (!BlankTextBox('datepickerTo', 'To Date')) {
        return false;
    }
    else if (!ValidateDropdown('StartTime', 'Start Time')) {
        return false;
    }
    else if (!ValidateDropdown('Duration', 'Duration')) {
        return false;
    }

    else if (!CompareDateRange('datepickerFrom', 'datepickerTo', 'From Date', 'To Date')) {
        return false;
    }

    else {
        return true;
    }
}

function ValidateSchedulingForm() {

    if (!ValidateDropdown('inputCourses', 'Course Name')) {
        return false;
    }
    if (!BlankTextBox('ScDate', 'Date')) {
        return false;
    }
    else if (!BlankTextBox('StartTime', 'Start Time')) {
        return false;
    }
    else if (!BlankTextBox('Duration', 'End Time')) {
        return false;
    }
    else if (!BlankTextBox('Remarks', 'Remarks')) {
        return false;
    }
    else {
        return true;
    }
}
function ValidateReschedulingCancel() {
    if (!BlankTextBox('cancelReason', 'Reason')) {
        return false;
    }

    else {
        return true;
    }
}