
 QUnit.test( "dateSelected function test", function( assert ) {
     const result = dateSelected();
     assert.equal( result,1,  "Passed!" );
 });



 QUnit.test( "submitBtn function test", function( assert ) {
     const result = submitBtn();
     assert.equal(result, 1,  "Passed!" );
 });



//날짜 선택시 해당 병원, 해당 날짜에 비어있는 시간 time option에 추가.
function dateSelected(e) {
    var target = "13시";
    var hospital_v = "정철민동물병원";
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
                }
            }
        });
    });

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
        if ("20200625" === date) {
        }

        var arr = [];
        var ref = firebase.database().ref("ReservationDetail/");

        //예약된 날짜와 같은 날짜의 예약 시간 받아 오는 코드
        ref.on("value", function (snapshot) {
            snapshot.forEach(function (data) {
                if (data.val().hospital === hospital_v) {
                    if (data.val().area === area_v) {
                        if (data.val().date === e.target.value) {
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
        }
    return 1;
}

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
    return 1;
}

//Modify 클릭시
function submitBtn() {
    var purpose = "정기진료";
    var purpose_v = "정기진료";
    var time = "13시";
    var time_v = "13시";

    detailRef.child(key).update({
        date: "20200625",
        time: "13시",
        reservationType: "정기진료",
        petName: "꼬물이",
        petSpecies: "시츄",
        message: ""
    });

    //alertify.alert('예약이 수정되었습니다.', function(){
     //   window.location.href = 'reservation_info.html';
    //});
    return 1;
}
