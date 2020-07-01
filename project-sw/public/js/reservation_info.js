var database = firebase.database();
var ref = database.ref('ReservationDetail/');
var userRef = database.ref('User/');
var currentUser;
var mode;
var exist = false;

var currentTime = new Date();

$(document).ready(function () {

    //Email from current user
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            currentUser = user.email;
        }
    });

    //If currentUser is a Member
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

                //Check if the reservation is past time (date, time)
                if (isExpired(strArray, data.val().time.replace("시", ""))) {
                    ref.child(key).update({
                        completion: 'true'
                    });
                }

                //Bookings that are neither canceled nor completed
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

                //Cancellation or completion
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
        //If currentUser is a Admin
        ref.once("value", function (snapshot) {
            snapshot.forEach(function (data) {
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

                    //Check if the reservation is past time (date, time)
                    if (isExpired(strArray, data.val().time.replace("시", ""))) {
                        ref.child(key).update({
                            completion: 'true'
                        });
                    }

                    //Bookings that are neither canceled nor completed
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

                    //Cancellation or completion
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

/**
 * @brief Cancel Reservation method
 * @details Ask if you really want to cancel and proceed with the cancellation.
 * @param param: ReservationDetail key in Firebase database
 */
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

/**
 * @brief Modify Reservation method
 * @details Touch the Modify button to go to the page where you want to modify the details.
 * @param param: ReservationDetail key in Firebase database
 */
function modify(param) {
    window.location.href = "reservation_modify.html?param=" + param;
}

/**
 * @brief Method to confirm if this is a past reservation
 * @details Returns 'true' over time compared to current time
 * @param param: Date, time to compare
 */
function isExpired(compareStr, compareTime) {
    var compareDate = new Date();

    compareDate.setFullYear(compareStr[0] * 1);
    compareDate.setMonth(compareStr[1] * 1 - 1);
    compareDate.setDate(compareStr[2] * 1);
    compareDate.setHours(compareTime * 1, 0, 0, 0);

    //return true if the booking time is past the current time
    return currentTime >= compareDate;

}
