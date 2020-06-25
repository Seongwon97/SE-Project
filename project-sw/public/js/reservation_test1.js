QUnit.test( "categoryChange1", function( assert ) {
  const result = categoryChange1("강남구");
  assert.equal( result,1,  "categoryChange1 Passed!" );
});


QUnit.test( "dateSelected", function( assert ) {
  const result = dateSelected("2020-06-26");
  assert.equal( result,1,  "DateSelected Passed!" );
});

QUnit.test( "categoryChange2", function( assert ) {
  const result = categoryChange2();
  assert.equal( result,1,  "categoryChange2 Passed!" );
});

QUnit.test( "reserve", function( assert ) {
  const result = reserve();
  assert.equal( result,1,  "reserve Passed!" );
});


  firebase.auth().onAuthStateChanged(function(user){
    user = true;
    if(user){
      var ref = firebase.database().ref("User/Admin/");
      ref.on("value", function (snapshot) {
          snapshot.forEach(function (data) {
            if(data.val().email == firebase.auth().currentUser.email){
                document.getElementById("name").value = data.val().username;
                document.getElementById("phone").value = data.val().phone_num;

            }
        });

      });

      ref = firebase.database().ref('User/Member/');
      ref.on("value", function (snapshot) {
          snapshot.forEach(function (data) {
            if(data.val().email == firebase.auth().currentUser.email){

                document.getElementById("name").value = data.val().username;
                document.getElementById("phone").value = data.val().phone_num;
            }
        });

      });

    }
  });








var reservationNum=0;
var adminId="";
var today = new Date();

date.min = new Date().toISOString().substring(0, 10);
//지역 선택시 두번쨰 selcet의 option을 변경
function categoryChange1(e) {

var ref = firebase.database().ref("Hospital_Info/");
var target = document.getElementById("hospital");
target.options.length = 0;

var opt = document.createElement("option");
opt.value = "Please select a hospital";
opt.innerHTML = "Please select a hospital";
target.appendChild(opt);

  document.getElementById('date').value = "";
  document.getElementById('time').value = "Time";
  return 1;
}



//날짜 선택시 해당 병원, 해당 날짜에 비어있는 시간 time option에 추가.
function dateSelected(e){
  var target = document.getElementById("time");
  var hospital_v="압구정웰동물병원";
  var area_v="강남구";
  var close="19:00";
  var open="10:00";



    //var openT=open.split(":");
    var openH=9;
    var openM=10;
    if(openM > 0){
      openH=openH+1;
    }

    //var closeT=close.split(":");
    var closeH=18;
    var closeM=10;
    if(closeM > 0){
      closeH=closeH+1;
    }
    //예약정보들을 확인하며 예약이 있는 시간 찾고 select option에 넣는 부분
    target.options.length = 0;
    var opt = document.createElement("option");
    opt.value = "Time";
    opt.innerHTML = "Time";
    target.appendChild(opt);
    var arr=[];
    var ref = firebase.database().ref("ReservationDetail/");


      available=[]
      for(i=openH; i<closeH; i++){
        var temp=String(i);
        temp=temp.concat("시");
        if(arr.indexOf(temp)== (-1)){
          var opt = document.createElement("option");
          opt.value = temp;
          opt.innerHTML = temp;
          target.appendChild(opt);
        }
      }

    return 1;
}





//병원 선택시 병원 정보를 띄워주는 코드
function categoryChange2(e) {
var ref = firebase.database().ref("Hospital_Info/");



  var area_v="강남구";
  var hospital_v="압구정웰동물병원";
  var ref = firebase.database().ref("User/Admin/");

    document.getElementById('date').value = "";
    document.getElementById('time').value = "Time";
    return 1;
}



//예약 정보 저장하는 함수
function reserve(){
  var userId="tjddnjs970325@gmail.com";
  var area_v="강남구";
  var hospital_v="압구정웰동물병원";
  var purpose_v="미용";
  var petGender_v="남자";
  var name = "name";
  var phone = "010-1234-5678";
  var date_v="2020-06-23";
  var time_v="2시";
  var petName_v="Pet name";
  var petAge_v="2";
  var petSpecies_v="포메";
  var message_v="";

    if (hospital_v=="Please select a hospital"||hospital_v==""){alertify.alert("Selet the Hospital");}
    else if(date_v==""||date_v=="연도-월-일"){alertify.alert("Select the date");}
    else if(time_v==""||time_v=="Time"){alertify.alert("Select the Time");}
    else if(purpose_v=="purpose"||purpose_v==""){alertify.alert("Select the Purpose");}
    else if(name==""){alertify.alert("Enter the name");}
    else if(phone==""){alertify.alert("Enter the Phone number");}
    else if(petName_v==""){alertify.alert("Enter the Pet Name");}
    else if(petAge_v==""){alertify.alert("Enter the pet age");}
    else if(petSpecies_v==""){alertify.alert("Enter the pet species");}
    else if(petGender_v==""||petGender_v=="Pet Gender"){alertify.alert("Select the pet gender");}
    else{
      rootRef = firebase.database().ref('ReservationDetail/');;
      rootRef.push({
        reservationNumber: reservationNum+1,
        clientId: userId,
        clientName: name,
        phoneNum: phone,
        area: area_v,
        hospital: hospital_v,
        completion: "false",
        purpose: purpose_v,
        date: date_v,
        time: time_v,
        petName: petName_v,
        petAge: petAge_v,
        petSpecies: petSpecies_v,
        petGender:petGender_v,
        message: message_v,
        cancel:'false'
      });

      //window.location.href = 'index.html';
      //alertify.alert('Reservation Complete.');
    }
    return 1;
}
