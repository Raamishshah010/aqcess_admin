

// CATEGORY COUNT
db.collection('categories').get().then((result) => {

    $('#categoryCount').html(result.docs.length);

}).catch((err) => {
    window.alert(err.message);
});

// USERS COUNT
db.collection('userCollection').get().then((result) => {

    $('#usersCount').html(result.docs.length);

}).catch((err) => {
    window.alert(err.message);
});

// MUSIC COUNT
db.collection('musicCollection').get().then((result) => {

    $('#musicCount').html(result.docs.length);

}).catch((err) => {
    window.alert(err.message);
});

// PLANS COUNT
db.collection('plansCollection').get().then((result) => {

    $('#plansCount').html(result.docs.length);

}).catch((err) => {
    window.alert(err.message);
});




db.collection('userCollection').limit(10).get().then((result) => {
    let i = 0;
    result.forEach((item) => {

        $('#usersTable').append(`
        <tr>
            <td>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99s4nsujoyEeppLwTbRk9VwaO2HUq5O4aW4eMHpLY&s" alt="" />
            <span class="ml-3"> ${item.data().name}</span>
            </td>
            <td class="font-weight-bold">${item.data().email}</td>
            <td class="font-weight-medium" id="role${i}"></td>
            
        </tr>
        `)

        if (item.data().isPremium) {
            $(`#role${i}`).html(`
            <div class="badge badge-success">Premium</div>
            `)
            
        }else{
            $(`#role${i}`).html(`
            <div class="badge badge-info">Not Premium</div>
            `)
        }

        i++;


    })

}).catch((err) => {
    window.alert(err.message);
});




db.collection('musicCollection').limit(10).get().then((result) => {
    
    result.forEach((item) => {

        console.log(item.data());

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