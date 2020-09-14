function ValidateForm() {
    if ($('#myregiTab li #email-tab').hasClass('active')) {
        if (!BlankTextBox('txtEmail', 'Email')) {
            return false;
        }
        else if (!IsSpecialCharacter1stPalce('txtEmail')) {
            return false;
        }
        else if (!ValidateEmail('txtEmail')) {
            return false;
        }
    }
    else {
        if (!BlankTextBox('txtMobileNo', 'Mobile No')) {
            return false;
        }
        else if (!IsSpecialCharacter1stPalce('txtMobileNo')) {
            return false;
        }
    }
    if (!BlankTextBox('txtPassword', 'Password')) {
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