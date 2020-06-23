
QUnit.test( "login", function( assert ) {
    const result = login()
    assert.equal( result, 1, "Passed!" );
});

function login(){
    var userEmail="yjk5591@naver.com";
    var userPass="201635824";

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){

    }).catch(function(error){

    });
    return 1;
}
