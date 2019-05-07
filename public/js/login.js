$(document).ready(() => {
    let print = user => {
        console.log(JSON.stringify(user));
        // $("#userInfo").html("User Info: " + JSON.stringify(user));
    };

    $("#signin").click(() => {
        $("#signup").css("border-bottom", "none");
        $("#signin").css("border-bottom", "2px solid #42A164");
        $("#signupcon").css("display", "none");
        $("#signincon").css("display", "inline");
    });

    $("#signup").click(() => {
        $("#signin").css("border-bottom", "none");
        $("#signup").css("border-bottom", "2px solid #42A164");
        $("#signincon").css("display", "none");
        $("#signupcon").css("display", "inline");
    });


    $("#submitUP").click(() => {
        console.log("Sign up");
        if ($("#pass1").val() == $("#cpass1").val())
            $.ajax({
                type: "post",
                url: "/users",
                dataType: 'json',
                data: {
                    username: $("#uname1").val(),
                    email: $("#email1").val(),
                    password: $("#pass1").val()
                },
                success: user => print(user),
                error: err => print(err.responseText)
            });
    });

    $("#submitIN").click(() => {
        console.log("Sign in");
        $.ajax({
            type: "post",
            url: "/login",
            dataType: 'json',
            data: {
                username: $("#unameIN1").val(),
                password: $("#passIN1").val()
            },
            success: user => {
                print(user);
                window.location.href="main";
            },
            error: err => print(err.responseText)
        });
    });


});
