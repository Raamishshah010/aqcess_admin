let urlParam = new URLSearchParams(window.location.search);

let myParam = urlParam.get('id');

console.log(myParam);


var settings = {
    "url": "https://aqcess-f278n.ondigitalocean.app/admin/single-security",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "userID": myParam
    }),
};

$.ajax(settings).done(function(response) {
    console.log(response);


    $('#managerDetails').append(`
    <h4 class="mt-5">Name : ${response.data.fullName}</h4>

    <p>Email: <strong> ${response.data.email}</strong></p>
    <p>Address: <strong> ${response.data.address}</strong></p>
    <p>Pin: <strong> ${response.data.pin}</strong></p>
    <p>Status: <span id="checkStatus"> </span></p>
    <button class="btn btn-primary mt-5" id="checkBlock">Block The Security Guard</button>
    
    `);


    if (response.data.isBlocked) {
        $('#checkBlock').html('Click To  Unblock')
        $('#checkStatus').append(`
        <span class="badge badge-danger">Blocked</span> 
        `)
    } else {
        $('#checkBlock').html('Click To Block')

        $('#checkStatus').append(`
        <span class="badge badge-success">Active</span> 
        `)
    }


    $('#checkBlock').on('click', () => {
        var settings = {
            "url": "https://aqcess-f278n.ondigitalocean.app/admin/block-security",
            "method": "POST",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json"
            },
            "data": JSON.stringify({
                "userID": myParam
            }),
        };

        $.ajax(settings).done(function(response) {
            console.log(response);
            window.alert('Status Updated Successfully');
            window.location.reload();
        });
    })
});