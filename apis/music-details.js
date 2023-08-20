    let urlParam = new URLSearchParams(window.location.search);
    let plan = '';
    let musicURL = '';
    let myParam = urlParam.get('id');


    db.collection('musicCollection').doc(myParam).get().then((result) => {

        $('#musicDetail').html(`


        <h4 class="card-title">${result.data().title} <span class="musicBadge" id="checkPremium"></span></h4>
                        <div class="musicImage">
                        <span class="editBtn" data-toggle="modal" data-target="#exampleModal"><img src="./images/edit.png" width="20px" alt=""></span>
                            <img src="${result.data().thumbnail}" style="height: 300px; width:100%" class=" img-fluid mb-3" alt="">
                        </div>


                        <audio controls style="width: 100%;">
                            
                            <source src="${result.data().musicFile}" type="audio/mpeg">
                            Your browser does not support the audio tag.
                        </audio>
                        <h6 class="mt-3">Category: <span> ${result.data().categoryName}</span></h6>
                        <p class="mt-3">
                        ${result.data().description}
                        </p>
        
        `)

        $('#name').val(result.data().title)
        $('#musicDescription').val(result.data().description);



        plan = result.data().isPremium;
        musicURL = result.data().musicFile;

        if (result.data().isPremium) {
            $('#checkPremium').html('Premium')
        } else {
            $('#checkPremium').html('Not Premium')

        }


    }).catch((err) => {
        window.alert(err.message)
    });





    $('#isPremium').on('click', function() {
        plan = true;
        $('#premiumDD').html('This Music Is Paid')
    })

    $('#isFreemium').on('click', function() {
        plan = false;
        $('#premiumDD').html('This Music Is Free')

    })


    let file = null;
    var fileButton = document.getElementById('thumbnail');


    fileButton.addEventListener('change', function(e) {

        file = e.target.files[0];

    });



    // EDIT THUMBNAIL
    function editThumbnailImage() {





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

                    db.collection('musicCollection').doc(myParam).update({
                        thumbnail: downloadURL
                    }).then(() => {
                        window.alert('Updated successfully');
                        window.location.reload();
                    }).catch((err) => {
                        window.alert(err.message);
                    });


                })
            })
    }







    // EDIT MUSIC

    let musicFile = null;
    var fileButton = document.getElementById('musicFile');


    fileButton.addEventListener('change', function(e) {

        musicFile = e.target.files[0];

    });

    function editMusic() {
        let updatedTitle = $('#name').val();
        let updatedDescription = $('#musicDescription').val();


        if (updatedTitle === "" || updatedDescription === "") return window.alert("Please enter a title and description");
        console.log(updatedTitle);
        if (musicFile == null) {

            $('#subBtn2').html('Please Wait...')
            $('#subBtn2').addClass('disabled')
            db.collection('musicCollection').doc(myParam).update({

                title: updatedTitle,
                description: updatedDescription,
                isPremium: plan
            }).then(() => {
                window.alert('Updated successfully');
                window.location.reload();
            }).catch((err) => {
                window.alert(err.message);
            });
        } else {


            $('#subBtn2').html('Please Wait...')
            $('#subBtn2').addClass('disabled')

            var storageRef = firebase.storage().ref('images/categoryImage' + Date.now());

            var uploadTask = storageRef.put(musicFile);

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
                        db.collection('musicCollection').doc(myParam).update({

                            title: updatedTitle,
                            description: updatedDescription,
                            isPremium: plan,
                            musicFile: downloadURL
                        }).then(() => {
                            window.alert('Updated successfully');
                            window.location.reload();
                        }).catch((err) => {
                            window.alert(err.message);
                        });


                    })
                })

        }


    }




    function deleteMusic() {

        $('#subBtn3').html('Please Wait...')
        $('#subBtn3').addClass('disabled')
        db.collection('musicCollection').doc(myParam).delete().then(() => {
            window.alert('Deleted Successfully');
            window.location.href = '../music.html'
        }).catch((err) => {
            window.alert(err.message);
        });
    }