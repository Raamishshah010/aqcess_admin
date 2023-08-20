

db.collection('plansCollection').get().then((result) => {
    
    result.forEach((item) => {

        console.log(item.data());

        $('#plansTable').append(`
        <tr>
        
        <td class="font-weight-bold">${item.data().planName}</td>
        <td class="font-weight-bold">${item.data().description.slice(0,26)}...</td>
        <td class="font-weight-bold">${item.data().levelOne}</td>
        <td class="font-weight-bold">${item.data().duration}</td>
        <td class="font-weight-bold">
            <a href="./plan-details.html" class="badge badge-primary"
            >View Detail</a
        >
        </td>
        
    </tr>
        `)
    })

}).catch((err) => {
    
});