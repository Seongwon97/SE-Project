var database = firebase.database();
var detailRef = database.ref('ReservationDetail/');
var key = location.href.substr(
    location.href.lastIndexOf('=') + 1
);
var date;
var area;
var origin_time;

$(document).ready(function () {
    detailRef.on("value", function (snapshot) {
        var number = 'No.' + snapshot.child(key).val().reservationNumber;
        var hospital = snapshot.child(key).val().hospital;
        var petName = snapshot.child(key).val().petName;
        var petSpecies = snapshot.child(key).val().petSpecies;
        var type = snapshot.child(key).val().purpose;
        var message = snapshot.child(key).val().message;
        date = snapshot.child(key).val().date;
        origin_time = snapshot.child(key).val().time;
        area = snapshot.child(key).val().area;

        document.getElementById('Number').value = number;
        document.getElementById('Name').value = hospital;
        document.getElementById('Petname').value = petName;
        document.getElementById('Petspecies').value = petSpecies;
        document.getElementById('Message').value = message;
        document.getElementById('date').value = date;
        // var event = new Event('change');
        // document.getElementById('date').dispatchEvent(event);

        $('#date').change();

        if (type === '미용') {
            $("#Purpose option:eq(0)").prop("selected", true);
        } else if (type === '예방접종') {
            $("#Purpose option:eq(1)").prop("selected", true);
        } else if (type === '정기검진') {
            $("#Purpose option:eq(2)").prop("selected", true);
        } else if (type === '치료') {
            $("#Purpose option:eq(3)").prop("selected", true);
        }
    });
});

/**
 * @brief Method for creating time option
 * @details When selecting a date, add the hospital, free time on that date to the time option.
 * @param param: Date Select event
 */
function dateSelected(e) {
    var target = document.getElementById("time");
    var hospital_v = document.getElementById('Name').value;
    var area_v = area;
    var close = 0;
    var open = 0;

    //병원 영업시간 받아서 변수에 저장하는 부분
    var ref = firebase.database().ref("Hospital_Info/");
    ref.on("value", function (snapshot) {
        snapshot.forEach(function (data) {
            //병원 이름과 병원이 있는 지역이 모두 같은 경우
            if (data.val().hospitalName === hospital_v) {
                if (data.val().areaName === area_v) {
                    open = data.val().openTime;
                    close = data.val().closeTime;
                }
            }
        });
    });

    setTimeout(function () {
        var openT = open.toString().split(":");
        var openH = Number(openT[0]);
        var openM = Number(openT[1]);
        if (openM > 0) {
            openH = openH + 1;
        }

        var closeT = close.toString().split(":");
        var closeH = Number(closeT[0]);
        var closeM = Number(closeT[1]);
        if (closeM > 0) {
            closeH = closeH + 1;
        }

        //예약정보들을 확인하며 예약이 있는 시간 찾고 select option에 넣는 부분
        target.options.length = 0;
        var opt = document.createElement("option");
        opt.value = origin_time;
        opt.innerHTML = origin_time;
        if (document.getElementById('date').value === date) {
            target.appendChild(opt);
        }

        var arr = [];
        var ref = firebase.database().ref("ReservationDetail/");

        //예약된 날짜와 같은 날짜의 예약 시간 받아 오는 코드
        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if (data.val().hospital === hospital_v) {
                    if (data.val().area === area_v) {
                        if (data.val().date === e.target.value) {
                            arr.push(data.val().time);
                            console.log(arr);
                        }
                    }
                }
            });
        });

        //예약된 시간을 제외한 시간을 출력
        available = []
        console.log(open);

        for (i = openH; i < closeH; i++) {
            var temp = String(i);
            temp = temp.concat("시");
            if (arr.indexOf(temp) === (-1)) {
                var opt = document.createElement("option");
                opt.value = temp;
                opt.innerHTML = temp;
                target.appendChild(opt);
            }
        }
        sortSelect(target);

        //예약 날짜와 선택한 날짜가 같은 경우 예약 시간 추가
        if (document.getElementById('date').value === date) {
            $("#time").val(origin_time).prop("selected", true);
        }
    }, 1000);
}

/**
 * @brief Method to sort the options in select
 * @details Arrange the available times in ascending order.
 * @param param: Select element in HTML
 */
function sortSelect(selElem) {
    var tmpAry = [];
    for (var i = 0; i < selElem.options.length; i++) {
        tmpAry[i] = [];
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i = 0; i < tmpAry.length; i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }

}

/**
 * @brief Update method to modify ReservationDetail
 * @details After the user modifies the reservation details, press the button to update the content in the Firebase database.
 * @param param: none
 */
function submitBtn() {
    var purpose = document.getElementById('Purpose');
    var purpose_v = purpose.options[purpose.selectedIndex].innerHTML;
    var time = document.getElementById('time');
    var time_v = time.options[time.selectedIndex].value;

    detailRef.child(key).update({
        date: document.getElementById('date').value,
        time: time_v,
        reservationType: purpose_v,
        petName: document.getElementById('Petname').value,
        petSpecies: document.getElementById('Petspecies').value,
        message: document.getElementById('Message').value
    });

    alertify.alert('Reservation Info has been modified!', function(){
        window.location.href = 'reservation_info.html';
    });

}