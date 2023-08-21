var settings = {
    "url": "http://192.168.0.127:3000/admin/all-resident",
    "method": "GET",
    "timeout": 0,
};

$.ajax(settings).done(function(response) {

    for (let i = 0; i < response.data.length; i++) {
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