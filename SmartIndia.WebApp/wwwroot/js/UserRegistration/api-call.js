$('#btnSignUp').click(function () {
    function CallSave() {
        var usersParam = JSON.stringify({
            ACTIONCODE: 'A',
            FirstName: $('#txtFirstName').val(),
            LastName: $('#txtLastName').val(),
            EmailId: $('#txtEmail').val(),
            MobileNo: $('#txtMobileNo').val(),
            Password: $('#txtCnfmPassword').val(),
            MobileCountryCode: $('#country-listbox li').find(".dial-code").html()
        });
        $.ajax({
            url: ServiceURL + "/api/UserRegistration/AddUser",
            type: "POST",
            data: usersParam,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data == "1") {
                    BootStrapRedirect('User Registration Successful.', "/ManageUsers/Users/Thankyou"); 
                }
                else if (data == "3") {
                    BootstrapAlert('Data Alreday Exist.');
                }
                else {
                    BootstrapAlert('Something went wrong. Please try again');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(textStatus + "\nError Tirado: \n" + errorThrown);
            }
        });
    }
    if (ValidateForm()) {
        if (BootStrapSubmit('btnSignUp', 'Are You Sure To Register ?', 'Are You Sure To Update ?', CallSave)) {
            return false;
        }
        else {
            return true;
        }
    }
}); 
