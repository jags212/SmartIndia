function ValidateForm() {
    if (!BlankTextBox('txtFirstName', 'First Name')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtFirstName')) {
        return false;
    }
    else if (!BlankTextBox('txtLastName', 'Last Name')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtLastName')) {
        return false;
    }
    else if (!BlankTextBox('txtEmail', 'Email')) {
        return false;
    }
    else if (!IsSpecialCharacter1stPalce('txtEmail')) {
        return false;
    }
    else if (!ValidateEmail('txtEmail')) {
        return false;
    }
    else if (!BlankTextBox('txtPassword', 'Password')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtPassword')) {
        return false;
    }
    else if (!isValidPassword('txtPassword')) {
        return false;
    }
    else if (!BlankTextBox('txtCnfmPassword', 'Confirm Password')) {
        return false;
    }
    else if (!IsWhiteSpace1stPalce('txtCnfmPassword')) {
        return false;
    }
    else if (!isPasswordMatch('txtPassword', 'txtCnfmPassword')) {
        return false;
    }
    else if ($("#chkTC").prop("checked") == false) {
        BootstrapAlert("Please check Terms and Conditions box !", "chkTC");
        return false;
    }
    else {
        return true;
    }
} 