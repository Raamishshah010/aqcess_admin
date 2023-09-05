let urlParam = new URLSearchParams(window.location.search);

let myParam = urlParam.get('id');

console.log(myParam);

var settings = {
    "url": "https://aqcess-f278n.ondigitalocean.app/admin/single-resident",
    "method": "POST",
    "timeout": 0,
    "headers": {
        "Content-Type": "application/json"
    },
    "data": JSON.stringify({
        "pin": myParam
    }),
};

$.ajax(settings).done(function(response) {
    console.log(response);

    $('#areaDetails').append(`
    <h4 class="mt-5">Area Name : ${response.data.name}</h4>

    <p>Area Address: <strong> ${response.data.address}</strong></p>
    <p>Area Pin: <strong> ${response.data.pin}</strong></p>
    <p>Area Plan: <strong> ${response.data.plan}</strong></p>
    <br/>
    <p>Area Managers: <strong id="managers"></strong></p>
    <p>Area Security Guards: <strong  id="security"></strong></p>
    <p>Area Residents: <strong id="users"> asggs</strong></p>
    
    `);


    $('#name').val(response.data.name);
    $('#address').val(response.data.address);
    $('#plan').val(response.data.plan);
}).then(() => {


    // MANAGERS
    var settings = {
        "url": "https://aqcess-f278n.ondigitalocean.app/admin/all-managers-of-area",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "pin": myParam
        }),
    };

    $.ajax(settings).done(function(response) {
        console.log(response);

        $('#managers').html(response.data.length);

        if (response.data.length <= 0) {
            $('#managerTable').html(`<h6 class="m-5">No Data Found</h6>`)
        } else {
            response.data.forEach(function(item) {
                $('#managerTable').append(`
            <tr>
                            
                            <td class="font-weight-bold">${item.fullName}</td>
                            <td class="font-weight-bold">${item.email}</td>
                            <td class="font-weight-bold">${item.address}</td>
                            <td class="font-weight-bold">${item.pin}</td>
                            <td class="font-weight-bold">${item.date.slice(0,10)}</td>
                            <td class="font-weight-bold">
                                <a href="./manager-details.html?id=${item._id}" class="badge badge-primary"
                                >View Detail</a
                            >
                            </td>
                            
                        </tr>
            `);
            });
        };

    });



    // SECURITY

    var settings = {
        "url": "https://aqcess-f278n.ondigitalocean.app/admin/all-security-of-area",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "pin": myParam
        }),
    };

    $.ajax(settings).done(function(response) {
        $('#security').html(response.data.length);

        if (response.data.length <= 0) {
            $('#securityTable').html(`<h6 class="m-5">No Data Found</h6>`)
        } else {
            response.data.forEach(function(item) {
                $('#securityTable').append(`
            <tr>
                            
                            <td class="font-weight-bold">${item.fullName}</td>
                            <td class="font-weight-bold">${item.email}</td>
                            <td class="font-weight-bold">${item.address}</td>
                            <td class="font-weight-bold">${item.pin}</td>
                            <td class="font-weight-bold">${item.date.slice(0,10)}</td>
                            <td class="font-weight-bold">
                                <a href="./security-details.html?id=${element._id}" class="badge badge-primary"
                                >View Detail</a>
                            </td>
                            
                        </tr>
            `)
            })
        }

    });


    // USERS
    var settings = {
        "url": "https://aqcess-f278n.ondigitalocean.app/admin/all-users-of-area",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "pin": myParam
        }),
    };

    $.ajax(settings).done(function(response) {
        $('#users').html(response.data.length)

        console.log(response.data);
        if (response.data.length <= 0) {
            $('#userTable').html(`<h6 class="m-5">No Data Found</h6>`)
        } else {
            response.data.forEach(function(item) {
                $('#userTable').append(`
            <tr>
                            
                            <td class="font-weight-bold">${item.fullName}</td>
                            <td class="font-weight-bold">${item.email}</td>
                            <td class="font-weight-bold">${item.address}</td>
                            <td class="font-weight-bold">${item.pin}</td>
                            <td class="font-weight-bold">${item.date.slice(0,10)}</td>
                            <td class="font-weight-bold">
                                <a href="./user-details.html?id=${element._id}" class="badge badge-primary"
                                >View Detail</a>
                            </td>
                            
                        </tr>
            `)
            })
        }

    });



});


// EDIT AREA
function editResidentArea() {


    let updatedName = $('#name').val();
    let updatedAddress = $('#address').val();
    let updatedPlan = $('#plan').val();

    if (updatedName === "" || updatedAddress === "" || updatedPlan === "") return window.alert("Please enter all fields");


    $('#subBtn').html('Please Wait.....');
    $('#subBtn').addClass('disabled')
    var settings = {
        "url": "https://aqcess-f278n.ondigitalocean.app/admin/edit-resident",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "name": updatedName,
            "address": updatedAddress,
            "plan": updatedPlan,
            "pin": myParam
        }),
    };

    $.ajax(settings).done(function(response) {
        window.alert(response.message);
        window.location.reload();
    });

}