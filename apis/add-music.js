let categoryName;
let categoryID;
let i = 0;

let plan;

db.collection('categories').get().then((data) => {
    data.forEach((category) => {


        $('#categoryList').append(`
        <a class="dropdown-item" id="category${i}" >${category.data().name}</a>
        `)

        $(`#category${i}`).on('click', () => {


            categoryName = category.data().name;
            categoryID = category.data().docID;

            $('#categoryDropdown').html(categoryName);

            console.log(categoryID);

        })

        i++;
    })
}).catch((err) => {

});


let file1 = null;
var fileButton = document.getElementById('thumbnail');


fileButton.addEventListener('change', function(e) {

    file1 = e.target.files[0];

});


let file2 = null;
var fileButton = document.getElementById('music');


fileButton.addEventListener('change', function(e) {

    file2 = e.target.files[0];

});


let thumbnail;


$('#isPremium').on('click', function() {
    plan = true;
    $('#premiumDD').html('This Music Is Paid')
})

$('#isFreemium').on('click', function() {
    plan = false;
    $('#premiumDD').html('This Music Is Free')

})



function addMusic() {

    let name = document.getElementById('name').value;
    let description = document.getElementById('musicDescription').value;

    if (name === "" || description === "" || categoryID === "") return window.alert('Please Enter All Fields')

    $('#subBtn').html('Please Wait...')
    $('#subBtn').addClass('disabled')

    var storageRef = firebase.storage().ref('images/thumbnail' + Date.now());

    var uploadTask = storageRef.put(file1);

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
                thumbnail = downloadURL
            }).then(() => {

                $('#subBtn').html('Please Wait...')
                $('#subBtn').addClass('disabled')

                var storageRef = firebase.storage().ref('images/musicFile' + Date.now());

                var uploadTask = storageRef.put(file2);

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
                            let musicRef = db.collection('musicCollection').doc();

                            let data = {
                                title: name,
                                musicFile: downloadURL,
                                docID: musicRef.id,
                                categoryName,
                                categoryID,
                                date: new Date(),
                                thumbnail,
                                description,
                                isPremium: plan

                            }

                            musicRef.set(data).then(() => {
                                window.alert('Music Added Successfully');
                                window.location.reload();
                            })
                        })
                    })


            }).catch((err) => {

            });
        })


}