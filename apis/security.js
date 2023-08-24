// ALL MANAGERS

var settings = {
    "url": "http://192.168.0.127:3000/admin/all-security-guards",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function(response) {
    console.log(response);


    for (let i = 0; i < response.data.length; i++) {
        const element = response.data[i];
        if (element === undefined) {
            console.log('No Data');
        } else {
            $('#securityTable').append(`
            <tr>
                            
                            <td class="font-weight-bold">${element.fullName}</td>
                            <td class="font-weight-bold">${element.email}</td>
                            <td class="font-weight-bold">${element.address}</td>
                            <td class="font-weight-bold">${element.pin}</td>
                            <td class="font-weight-bold">${element.date.slice(0,10)}</td>
                            <td class="font-weight-bold" id="statusCheck${i}"></td>
                            <td class="font-weight-bold">
                                <a href="./security-details.html?id=${element._id}" class="badge badge-primary"
                                >View Detail</a>
                            </td>
                            
                        </tr>
            `)

            if (element.isBlocked) {
                $(`#statusCheck${i}`).append(`
                <span class="badge badge-danger">Blocked</span> 
                `)
            } else {
                $(`#statusCheck${i}`).append(`
                <span class="badge badge-success">Active</span> 
                `)
            }
        }
    }

});