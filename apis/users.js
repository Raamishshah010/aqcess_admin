db.collection('userCollection').get().then((result) => {
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
            <td class="font-weight-medium"><div class="badge badge-danger" id="confirmBtn${i}" style="cursor: pointer" >Delete</div></td>
            
        </tr>
        `)

        if (item.data().isPremium) {
            $(`#role${i}`).html(`
            <div class="badge badge-success">Premium</div>
            `)

        } else {
            $(`#role${i}`).html(`
            <div class="badge badge-info">Not Premium</div>
            `)
        }

        $(`#confirmBtn${i}`).on('click', function() {
            const process_something = window.confirm("Are You Sure You Want To Delete This User!");
            if (process_something) {
                let uid = item.data().docID;

                var settings = {
                    "url": "https://deleteuser-production.up.railway.app/delete-user",
                    "method": "POST",
                    "timeout": 0,
                    "headers": {
                        "Content-Type": "application/json"
                    },
                    "data": JSON.stringify({
                        "uid": uid
                    }),
                };

                $.ajax(settings).done(function(response) {
                    console.log(response);
                    db.collection('userCollection').doc(uid).delete().then(() => {
                        window.alert('User Deleted Successfully');
                        window.location.reload();
                    }).catch((err) => {
                        window.alert(err.message)
                    });
                });


            } else {
                window.alert("You pressed cancel!")

            }




        })

        i++;
    })

}).catch((err) => {
    window.alert(err.message);
});