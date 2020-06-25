QUnit.test( "cancel function test", function( assert ) {
  const result = cancel();
  assert.equal( result,1,  "Passed!" );
});

QUnit.test( "modify function test", function( assert ) {
    const result = modify();
    assert.equal( result,1,  "Passed!" );
});
QUnit.test( "modify function test", function( assert ) {
    const result = start();
    assert.equal( result,1,  "Passed!" );
});

QUnit.test( "isExpired function test", function( assert ) {
    let strArr = ['2020', '01', '01']
    const result = isExpired(strArr,17);
    assert.equal(result, false,  "Passed!" );
});

var database = firebase.database();
var ref = database.ref('ReservationDetail/');
var userRef = database.ref('User/');
var currentUser;
var mode;
var exist = false;

var currentTime = new Date();
function start(){
    var userEmail="jwb4321@naver.com";
    var userPass="201533266";

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){
    }).catch(function(error){
    });

    return 1;

}

function cancel() {
        if (1) {

            //window.location.reload();
            return true;
        }
}


function modify() {
    // window.location.href = "reservation_modify.html?param=" + param;
    return 1;
}


function isExpired(compareStr, compareTime) {
    var compareDate = new Date();

    compareDate.setFullYear(compareStr[0] * 1);
    compareDate.setMonth(compareStr[1] * 1 - 1);
    compareDate.setDate(compareStr[2] * 1);
    compareDate.setHours(compareTime * 1, 0, 0, 0);

    //현재 시각보다 예약시간이 지난 경우 true 리턴
    return currentTime >= compareDate;

}
