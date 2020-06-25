QUnit.test( "mem_signUp", function( assert ) {
    const result = mem_signUp("여준구", "yjk5591@naver.com", "201635824", "201635824", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_signUp", function( assert ) {
    const result = mem_signUp("여준구", "yjk5591@naver.c", "201", "201635824", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_signUp", function( assert ) {
    const result = mem_signUp("여준구", "yjk5591@naver.c", "2", "2", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_signUp", function( assert ) {
    const result = mem_signUp("여준구", "yjk5591@naver.net", "201635824","201635824", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_signUp", function( assert ) {
    const result = mem_signUp("", "yjk5591@naver.net", "201635824","201635824", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_signUp", function( assert ) {
    const result = mem_signUp("여준구", "", "201635824","201635824", "경기도 수원시",
        "01062205593", "19960804")
    assert.equal( result, 1, "Passed!" );
});


function mem_signUp(username, email, password, retype_password, address, phone_num, birthday){

    if(username.length>=1 && address.length>=1 && phone_num.length>=1 && birthday.length>=1 &&
        email.length>=1 && password==retype_password){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            var rootRef = firebase.database().ref('User/Member/');
            rootRef.push({
                username:username,
                email:email,
                password:password,
                address:address,
                phone_num:phone_num,
                birthday:birthday
            });
        }).catch(function(error){
            if(password.toString().length <=5){

            }
        });
    }
    else{
        if(password!=retype_password){

        }
    }
    return 1;

}

