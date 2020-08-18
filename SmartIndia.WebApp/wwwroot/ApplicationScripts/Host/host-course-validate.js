function ValidateForm() {
    if (!BlankTextBox('txtName', 'Course Name')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtName')) {
        return false;
    }
    else if (!BlankTextBox('txtDesc', 'Description')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtDesc')) {
        return false;
    }
    else if (!BlankTextBox('txtTopics', 'Topics')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtTopics')) {
        return false;
    }
    else if (!BlankTextBox('sdatepicker', 'Start Date')) {
        return false;
    }
    else if (!BlankTextBox('edatepicker', 'End Date')) {
        return false;
    }
    else if (!CompareDateRange('sdatepicker', 'edatepicker', 'Start Date', 'End Date')) {
        return false;
    }
    else if (!BlankTextBox('durationDate', 'Duration')) {
        return false;
    }
    else if (!BlankTextBox('txtCost', 'Cost')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtCost')) {
        return false;
    }
    else if (!DecimalNumber('txtCost', 'Cost')) {
        return false;
    }

    else if (!ValidateDropdown('ddlFrequency', 'Class Frequency')) {
        return false;
    }
    else if (!BlankTextBox('txtNoOfClass', 'No Of Classes')) {
        return false;
    }
    else {
        return true;
    }
} 