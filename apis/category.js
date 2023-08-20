db.collection('categories').get().then((result) => {

    result.forEach((item) => {

        console.log(item.data());

        $('#categoryTable').append(`
        <tr>
        <td>
        <img src="${item.data().image}" alt="" />
        </td>
        <td class="font-weight-bold">${item.data().name}</td>
        <td class="font-weight-bold">
            <a href="./category-details.html?id=${item.data().docID}" class="badge badge-primary"
            >View Detail</a
        >
        </td>
        
    </tr>
        `)
    })

}).catch((err) => {

});