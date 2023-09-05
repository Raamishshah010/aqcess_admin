function login() {

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    if (email === "" || password === "") window.alert("Please enter all credentials")

    var settings = {
        "url": "https://aqcess-f278n.ondigitalocean.app/admin/login",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "email": email,
            "password": password
        }),
    };

    $.ajax(settings).done(function (response) {
        
        if(response.status === 200) {
            window.location.href = '../dashboard.html'
        }else{
            window.alert('Something went worng')
        }
    });
}