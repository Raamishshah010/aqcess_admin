function addUser() {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    if (name === "" || email === "" || password === "") return window.alert("Please enter all fields");
    $('#subBtn').html('Please Wait...')
    $('#subBtn').addClass('disabled')
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;


            let userRef = db.collection('userCollection').doc(user.uid);

            let data = {
                docID: userRef.id,
                email,
                image: "",
                isPremium: false,
                name,
                planID: ""
            }

            userRef.set(data).then(() => {
                window.alert('User Added Successfully');
                window.location.reload();
            }).catch((err) => {
                window.alert(err.message);
            });
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            // ..
            window.alert(errorMessage)
        });


}