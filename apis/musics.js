db.collection('musicCollection').get().then((result) => {

    result.forEach((item) => {
        $('#musicTable').append(`
        <tr>
        <td>
        <img src="${item.data().thumbnail}" alt="" />
        <span class="ml-3"> ${item.data().title}</span>
        </td>
        <td class="font-weight-bold">
        <audio controls>
        
        <source src="${item.data().musicFile}" type="audio/mpeg">
        Your browser does not support the audio tag.
        </audio>
        </td>
        <td class="font-weight-bold">${item.data().categoryName}</td>
        <td class="font-weight-bold">
            <a href="./music-details.html?id=${item.data().docID}" class="badge badge-primary"
            >View Detail</a
        >
        </td>
        
    </tr>
        `)
    })

}).catch((err) => {

});