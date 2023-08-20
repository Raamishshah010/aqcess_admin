let file = null;
var fileButton = document.getElementById('categoryImage');


fileButton.addEventListener('change', function(e) {

    file = e.target.files[0];

});

function addCategory() {

    let name = document.getElementById('name').value;

    if (name === "" || file === null) return window.alert('Please Enter all Fields')

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
                let categoryRef = db.collection('categories').doc();

                let data = {
                    name,
                    image: downloadURL,
                    docID: categoryRef.id
                }

                categoryRef.set(data).then(() => {
                    window.alert('Category Added Successfully');
                    window.location.reload();
                })
            })
        })
}