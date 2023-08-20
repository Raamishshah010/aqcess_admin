let urlParam = new URLSearchParams(window.location.search);
let myParam = urlParam.get('id');


console.log(myParam);

let file = null;
var fileButton = document.getElementById('categoryImage');


fileButton.addEventListener('change', function(e) {

    file = e.target.files[0];

});


// MUSIC COLLECTION
db.collection('musicCollection').where('categoryID', "==", myParam).get().then((result) => {

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
    window.alert(err.message)
});



db.collection('categories').doc(myParam).get().then((result) => {
    $('#name').val(result.data().name);
    $('#imageURL').val(result.data().image);

    $('#image').append(`
    <img src="${result.data().image}" height="100px" width="100px" alt="">
    `)
}).catch((err) => {
    window.alert(err.message)
});





function editCategory() {

    let updatedName = $('#name').val();
    let imageURL = $('#imageURL').val();


    if (file === null) {


        $('#subBtn').html('Please Wait...')
        $('#subBtn').addClass('disabled')


        db.collection('categories').doc(myParam).update({
            name: updatedName,
            image: imageURL
        }).then(() => {
            window.alert('Updated Successfully!');
            window.location.reload();
        }).catch((err) => {
            window.alert(err.message);
        });



    } else {


        $('#subBtn').html('Please Wait...')
        $('#subBtn').addClass('disabled')

        var storageRef = firebase.storage().ref('images/categoryImage' + Date.now());

        var uploadTask = storageRef.put(file);

        uploadTask.on('state_changed',
            (snapshot) => {

                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;


                console.log('Upload is ' + progress + '% done');
                console.log(snapshot.state)
                switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                        console.log('Upload is paused');
                        break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
                console.log(error)
            },
            () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    console.log('File available at', downloadURL);

                    db.collection('categories').doc(myParam).update({
                        name: updatedName,
                        image: downloadURL
                    }).then(() => {
                        window.alert('Updated Successfully!');
                        window.location.reload();
                    }).catch((err) => {
                        window.alert(err.message);
                    });
                })
            })



    }

};




function deleteCategory() {
    db.collection('categories').doc(myParam).delete().then(() => {
        window.alert('Deleted Successfully!');
        window.location.href = '/category.html'
    }).catch((err) => {
        window.alert(err.message);
    });
}