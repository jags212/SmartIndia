function ValidateSchedularForm() {

    if (!ValidateDropdown('inputCourses', 'Course Name')) {
        return false;
    }
    else if (!BlankTextBox('BatchNameOnce', 'Batch Name')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('BatchNameOnce')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('BatchNameOnce')) {
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
function ValidateSchedularFormRcC() {

    if (!ValidateDropdown('inputCourses', 'Course Name')) {
        return false;
    }
    else if (!BlankTextBox('BatchNameOnce', 'Batch Name')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('BatchNameOnce')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('BatchNameOnce')) {
        return false;
    }
    if (!ValidateDropdown('ddlrecurringschedule', 'Recurring Schedule')) {
        return false;
    }

    else {
        return true;
    }
}
function ValidateSchedularFormRc() {


    
    if (!BlankTextBox('datepickerFrom', 'From Date')) {
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
function ValidateSchedularFormRcweek() {


    if (!CheckSpanLength('selected-items span', 'Day of Week')) {
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
function ValidateSchedularFormRcMonthly() {
    
    if (!CheckSpanLengthFromID('dayOfMonthSection span', 'Day of Month')) {
        return false;
    }
   else if (!ValidateDropdown('ddlyearfrom', 'From Date')) {
        return false;
    }
    else if (!ValidateDropdown('ddlmonthfrom', 'From Date')) {
        return false;
    }

    else if (!ValidateDropdown('ddlyesrto', 'To Date')) {
        return false;
    } else if (!ValidateDropdown('ddlmonthto', 'To Date')) {
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
    else if (!BlankTextBox('BatchNameOnce', 'Batch Name')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('BatchNameOnce')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('BatchNameOnce')) {
        return false;
    }
    else if (!BlankTextBox('Remarks', 'Remarks')) {
        return false;
    }
    else {
        return true;
    }
}
function ValidateUpdateSchedulingForm() {

    if (!ValidateDropdown('uinputCourses', 'Course Name')) {
        return false;
    }
    if (!BlankTextBox('uScDate', 'Date')) {
        return false;
    }
    else if (!BlankTextBox('uStartTime', 'Start Time')) {
        return false;
    }
    else if (!BlankTextBox('uDuration', 'End Time')) {
        return false;
    }
    else if (!BlankTextBox('uBatchNameOnce', 'Batch Name')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('uBatchNameOnce')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('uBatchNameOnce')) {
        return false;
    }
    else if (!BlankTextBox('uRemarks', 'Remarks')) {
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