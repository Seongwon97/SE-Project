QUnit.test( "aut_signUp", function( assert ) {
    const result = aut_signUp("여준구", "yjk5591@naver.com", "201635824", "201635824", "경기도 수원시",
        "01062205593", "19960804", "축덕동물병원","수원시" )
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_signUp", function( assert ) {
    const result = aut_signUp("여준구", "yjk5591@naver.c", "201", "201635824", "경기도 수원시",
        "01062205593", "19960804", "축덕동물병원","수원시")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_signUp", function( assert ) {
    const result = aut_signUp("여준구", "yjk5591@naver.c", "2", "2", "경기도 수원시",
        "01062205593", "19960804", "축덕동물병원","수원시")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_signUp", function( assert ) {
    const result = aut_signUp("여준구", "yjk5591@naver.net", "201635824","201635824", "경기도 수원시",
        "01062205593", "19960804", "축덕동물병원","수원시")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_signUp", function( assert ) {
    const result = aut_signUp("", "yjk5591@naver.net", "201635824","201635824", "경기도 수원시",
        "01062205593", "19960804", "축덕동물병원","수원시")
    assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_signUp", function( assert ) {
    const result = aut_signUp("여준구", "", "201635824","201635824", "경기도 수원시",
        "01062205593", "19960804", "축덕동물병원","수원시")
    assert.equal( result, 1, "Passed!" );
});

function aut_signUp(username, email, password, retype_password, address, phone_num, birthday, hospital_name, area){

    if(username.length>=1 && address.length>=1 && phone_num.length>=1 && birthday.length>=1 &&
        hospital_name.length>=1 && area.length>=1 && password==retype_password){
        firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
            var rootRef = firebase.database().ref('User/Admin/');
            rootRef.push({
                username:username,
                email:email,
                password:password,
                address:address,
                phone_num:phone_num,
                birthday:birthday,
                hospital_name:hospital_name,
                area:area
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
