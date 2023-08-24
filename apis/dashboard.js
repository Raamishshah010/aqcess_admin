//ALL RESIDENTS
var settings = {
    "url": "http://192.168.0.127:3000/admin/all-resident",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function(response) {
    console.log(response);

    $('#residentCount').html(response.data.length);


    for (let i = response.data.length - 10; i < response.data.length; i++) {
        const element = response.data[i];
        console.log(element);

        if (element === undefined) {
            console.log('No Data');
        } else {
            $('#areaTable').append(`
            <tr>
            <td class="font-weight-bold">${element.name}</td>
                <td>${element.address}</td>
                <td>${element.pin}</td>
                <td>${element.plan}</td>
                
    
    
    
                <td class="font-weight-bold">
                    <a href="./area-details.html?id=${element.pin}" class="badge badge-primary"
                    >View Detail</a>
                </td>
                                                    
            </tr>
            `)
        }
    }

});

// ALL MANAGERS

var settings = {
    "url": "http://192.168.0.127:3000/admin/all-managers",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function(response) {
    console.log(response);
    $('#managersCount').html(response.data.length);

});

// ALL SECURITY

var settings = {
    "url": "http://192.168.0.127:3000/admin/all-security-guards",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function(response) {
    console.log(response);
    $('#secutiyCount').html(response.data.length);

});

// ALL USERS

var settings = {
    "url": "http://192.168.0.127:3000/admin/all-users",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function(response) {
    console.log(response);
    $('#usersCount').html(response.data.length);

    for (let i = response.data.length - 10; i < response.data.length; i++) {
        const element = response.data[i];
        if (element === undefined) {
            console.log('No Data');
        } else {
            $('#userTable').append(`
            <tr>
                            
                            <td class="font-weight-bold">${element.fullName}</td>
                            <td class="font-weight-bold">${element.email}</td>
                            <td class="font-weight-bold">${element.address}</td>
                            <td class="font-weight-bold">${element.pin}</td>
                            <td class="font-weight-bold">${element.date.slice(0,10)}</td>
                            <td class="font-weight-bold">
                                <a href="./user-details.html?id=${element._id}" class="badge badge-primary"
                                >View Detail</a>
                            </td>
                            
                        </tr>
            `)
        }
    }


});