function addResidentArea() {
    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let plan = document.getElementById('plan').value;

    if (name === "" || address === "" || plan === "") return window.alert("Please enter all required fields");


    $('#subBtn').html('Please Wait.....');
    $('#subBtn').addClass('disabled')
    var settings = {
        "url": "https://aqcess-f278n.ondigitalocean.app/admin/add-resident",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "name": name,
            "address": address,
            "plan": plan
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);
        window.alert("Area Added Successfully");
        window.location.reload();
    });

}