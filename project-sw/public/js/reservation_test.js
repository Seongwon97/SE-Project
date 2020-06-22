

QUnit.test( "test function test", function( assert ) {
  const result = test();
  assert.equal( result,1,  "Passed!" );
});

function test(){
  return 1;
}

var database = firebase.database();
var ref = database.ref('ReservationDetail/');
var userRef = database.ref('User/');
var currentUser;
var mode;
var exist = false;

var currentTime = new Date();

$(document).ready(function () {

    //현재 유저의 이메일
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = user.email;
        }
    });

    // //Admin인지 Member인지 확인
    // userRef.on("value", function (snapshot) {
    //     snapshot.forEach(function (data) {
    //         data.forEach(function (ids) {
    //             if (currentUser === ids.val().email) {
    //                 mode = data.key
    //                 console.log("mode", mode);
    //             }
    //         });
    //     });
    // });

    //currentUser가 Member인 경우
    ref.once("value", function (snapshot) {
        snapshot.forEach(function (data) {
            if (data.val().clientId === currentUser) {
                var key = data.key
                var number = 'No.' + data.val().reservationNumber;
                var hospital = data.val().hospital;
                var purpose = data.val().purpose;
                var time = data.val().date + ' ' + data.val().time;
                var completion = data.val().completion;
                var strArray = data.val().date.split('-');
                var cancel = data.val().cancel;
                var petName = data.val().petName;

                //시간이 지난 예약인지 확인 (날짜, 시간)
                if (isExpired(strArray, data.val().time.replace("시", ""))) {
                    ref.child(key).update({
                        completion: 'true'
                    });
                }

                //취소도 안되고 완료도 안된 예약
                if (completion === 'false' && cancel !== 'true') {
                    $("#card-area").append("<div class=\"card m-3\">" +
                        "                       <div class=\"card-body\">\n" +
                        "                            <p class=\"card-text mb-0\">" + number + "</p>\n" +
                        "                            <h4 class=\"card-title\">" + hospital + "</h4>\n" +
                        "                            <p class=\"card-text mb-0\">" + petName + "</p>\n" +
                        "                            <p class=\"card-text mb-0\">" + purpose + "</p>\n" +
                        "                            <p class=\"card-text mb-0\">" + time + "</p>\n" +
                        "                            <div class=\"text-right\">\n" +
                        "                                <a href=\"#\" onclick=\"modify('" + key + "');\" class=\"card-link mr-3\">Modify</a>\n" +
                        "                                <a href=\"#\" onclick=\"cancel('" + key + "');\" class=\"card-link mr-3\">Cancel</a>\n" +
                        "                            </div>\n" +
                        "                        </div>" +
                        "</div>");
                }

                //취소나 완료된 경우
                if (completion === 'true' || cancel === 'true') {
                    if (exist === false) {
                        document.getElementById("cancel_text").textContent = "Last reservations & Cancelled reservations"
                        exist = true;
                    }
                    $("#cancel-area").append("<div class=\"card m-3\">" +
                        "                       <div class=\"card-body\">\n" +
                        "                            <p class=\"card-text mb-0\">" + number + "</p>\n" +
                        "                            <h4 class=\"card-title\">" + hospital + "</h4>\n" +
                        "                            <p class=\"card-text mb-0\">" + petName + "</p>\n" +
                        "                            <p class=\"card-text mb-0\">" + purpose + "</p>\n" +
                        "                            <p class=\"card-text mb-0\">" + time + "</p>\n" +
                        "                            <div class=\"text-right\">\n" +
                        "                            </div>\n" +
                        "                        </div>" +
                        "</div>");
                }
            }
        });
    });
    var hos_name;
    var area_name;
    var root = firebase.database().ref("User/Admin/");
    root.on("value", function (snapshot) {
        snapshot.forEach(function (data) {
            if(data.val().email == firebase.auth().currentUser.email){
                hos_name = data.val().hospital_name;
                area_name = data.val().area;
            }
        });
    });
    setTimeout(function(){
        //currentUser가 Admin인 경우
        ref.once("value", function (snapshot) {
            snapshot.forEach(function (data) {
                //if (data.val().hospitalAdminEmail === currentUser) {
                if (data.val().hospital ==hos_name && data.val().area == area_name) {
                    var key = data.key
                    var number = 'No.' + data.val().reservationNumber;
                    var petName = data.val().petName;
                    var petAge = data.val().petAge;
                    var petGender = data.val().petGender;
                    var petSpecies = data.val().petSpecies;
                    var clientName = data.val().clientName;
                    var purpose = data.val().purpose;
                    var time = data.val().date + ' ' + data.val().time;
                    var completion = data.val().completion;
                    var phoneNum = data.val().phoneNum;
                    var message = data.val().message;
                    var strArray = data.val().date.split('-');
                    var cancel = data.val().cancel;

                    //시간이 지난 예약인지 확인 (날짜, 시간)
                    if (isExpired(strArray, data.val().time.replace("시", ""))) {
                        ref.child(key).update({
                            completion: 'true'
                        });
                    }

                    //취소도 안되고 완료도 안된 예약
                    if (completion === 'false' && cancel !== 'true') {
                        $("#card-area").append("<div class=\"card border-dark m-3\">\n" +
                            "                            <div class=\"card-header mb-0\">" +
                            "<div class=\"row\">" +
                            "<div class=\"col-sm-6\">" +
                            "                            <p class=\"card-text mb-0\">" + number + "</p>\n" +
                            "</div>\n" +
                            "<div class=\"col-sm-6\">" +
                            "                            <p class=\"card-text text-right mb-0\">" + time + "</p>\n" +
                            "</div>\n" +
                            "</div>\n" +
                            "</div>\n" +
                            "                            <div class=\"card-body text-success\">\n" +
                            "<div class=\"row\">" +
                            "<div class=\"col-sm-6\">" +
                            "                            <h5 class=\"card-title\">" + petName + "</h5>\n" +
                            "                            <p class=\"card-text mb-0\">" + "종: " + petSpecies + "</p>\n" +
                            "                            <p class=\"card-text mb-0\">" + "나이: " + petAge + "</p>\n" +
                            "                            <p class=\"card-text mb-0\">" + "성별: " + petGender + "</p>\n" +
                            "</div>" +
                            "<div class=\"col-sm-6\">" +
                            "                            <h5 class=\"card-title\">" + clientName + "</h5>\n" +
                            "                            <p class=\"card-text mb-0\">" + "연락처: " + phoneNum + "</p>\n" +
                            "                            <p class=\"card-text mb-0\">" + "방문목적: " + purpose + "</p>\n" +
                            "                            <p class=\"card-text mb-0\">" + "메시지: " + message + "</p>\n" +
                            "                        </div>" +
                            "</div>" +
                            "                        </div>" +
                            "                        </div>" +
                            "</div>"
                        )
                        ;
                    }

                    //취소나 완료된 경우
                    if (completion === 'true' || cancel === 'true') {
                        if (exist === false) {
                            document.getElementById("cancel_text").textContent = "Last reservations & Cancelled reservations"
                            exist = true;
                        }
                        $("#cancel-area").append("<div class=\"card border-dark m-3\">\n" +
                            "                            <div class=\"card-header mb-0\">" +
                            "<div class=\"row\">" +
                            "<div class=\"col-sm-6\">" +
                            "                            <p class=\"card-text mb-0\">" + number + "</p>\n" +
                            "</div>\n" +
                            "<div class=\"col-sm-6\">" +
                            "                            <p class=\"card-text text-right mb-0\">" + time + "</p>\n" +
                            "</div>\n" +
                            "</div>\n" +
                            "</div>\n" +
                            "                            <div class=\"card-body text-success\">\n" +
                            "<div class=\"row\">" +
                            "<div class=\"col-sm-6\">" +
                            "                            <h5 class=\"card-title\">" + petName + "</h5>\n" +
                            "                            <p class=\"card-text mb-0\">" + "Species: " + petSpecies + "</p>\n" +
                            "                            <p class=\"card-text mb-0\">" + "Age: " + petAge + "</p>\n" +
                            "                            <p class=\"card-text mb-0\">" + "Gender: " + petGender + "</p>\n" +
                            "</div>" +
                            "<div class=\"col-sm-6\">" +
                            "                            <h5 class=\"card-title\">" + clientName + "</h5>\n" +
                            "                            <p class=\"card-text mb-0\">" + "Phone: " + phoneNum + "</p>\n" +
                            "                            <p class=\"card-text mb-0\">" + "Purpose: " + purpose + "</p>\n" +
                            "                            <p class=\"card-text mb-0\">" + "Note: " + message + "</p>\n" +
                            "                        </div>" +
                            "</div>" +
                            "                        </div>" +
                            "                        </div>" +
                            "</div>");
                    }
                }
            });
        });
    },1500);
});

function cancel(param) {
    alertify.confirm('예약을 취소하시겠습니까?', function (e) {
        if (e) {
            ref.child(param).update({
                cancel: "true",
                time: ""
            })
            window.location.reload();
            return true;
        } else {
            return false;
        }
    });
}


function modify(param) {
    window.location.href = "reservation_modify.html?param=" + param;
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
