QUnit.test( "mem_modify", function( assert ) {
    const result = mem_modify("", "jwb2906@naver.com", "201", "201", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_modify", function( assert ) {
    const result = mem_modify("", "jwb2906@naver.co", "2015", "201", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_modify", function( assert ) {
    const result = mem_modify("", "jwb2906@naver.com", "201", "201", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});

function mem_modify(username, email, password, retype_password, address, phone_num, birthday){

    ref = firebase.database().ref('User/Member/');
    ref.on("value", function (snapshot) {
        snapshot.forEach(function (data) {
            if(data.val().email == firebase.auth().currentUser.email){
                var buf = email;
                var key = data.key;
                var rootRef = firebase.database().ref('User/Member/' + key + '/');

                var user = firebase.auth().currentUser;
                if(password != data.val().password || email != data.val().email){
                    user.updatePassword(password).then(function() {
                        user.updateEmail(email).then(function() {
                        }).catch(function(error){
                            user.updatePassword(data.val().password).then(function(){

                            }).catch(function(error){
                            });
                        });
                    }).catch(function(error) {

                    });
                }

                rootRef.update({
                    username:username,
                    email:email,
                    password:password,
                    address:address,
                    phone_num:phone_num,
                    birthday:birthday
                });


            }
        });
    });


    return 1;
}

