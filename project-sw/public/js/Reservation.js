
  setTimeout(function(){
  firebase.auth().onAuthStateChanged(function(user){
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
  },2000);






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
ref.on("value", function(snapshot){
    for(i = 0; i< Object.keys(snapshot.val()).length; i++){
      var a = firebase.database().ref("Hospital_Info/" + Object.keys(snapshot.val())[i]);

      a.on("value", function(snapshot){
        var t = Object.values(snapshot.val());
        if((t[1] == e.value)){
          if(t[9].length <2){
            t[9] = "Non-Value";
          }
          var opt = document.createElement("option");
          opt.value = t[4];
          opt.innerHTML = t[4];
          target.appendChild(opt);
          }
        });
    }
  });
  document.getElementById('date').value = "";
  document.getElementById('time').value = "Time";
}



//날짜 선택시 해당 병원, 해당 날짜에 비어있는 시간 time option에 추가.
function dateSelected(e){
  var target = document.getElementById("time");
  var hospital =document.getElementById('hospital');
  var hospital_v=hospital.options[hospital.selectedIndex].value;
  var area=document.getElementById('area');
  var area_v=area.options[area.selectedIndex].value;
  var close=0;
  var open=0;

  //병원 영업시간 받아서 변수에 저장하는 부분
  var ref = firebase.database().ref("Hospital_Info/");
  ref.on("value", function(snapshot){
      for(i = 0; i< Object.keys(snapshot.val()).length; i++){
        var a = firebase.database().ref("Hospital_Info/" + Object.keys(snapshot.val())[i]);

        a.on("value", function(snapshot){
          var t = Object.values(snapshot.val());
          if((t[4] == hospital_v)){
            if(t[9].length <2){
              t[9] = "Non-Value";
            }
            open=t[7];
            close=t[3];
            }
          });
      }
    });

    var openT=open.split(":");
    var openH=Number(openT[0]);
    var openM=Number(openT[1]);
    if(openM > 0){
      openH=openH+1;
    }

    var closeT=close.split(":");
    var closeH=Number(closeT[0]);
    var closeM=Number(closeT[1]);
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

    ref.on("value", function(snapshot){
        reservationNum=Object.keys(snapshot.val()).length; });
    ref.on("value", function(snapshot){
        for(i = 0; i< Object.keys(snapshot.val()).length; i++){
          var a = firebase.database().ref("ReservationDetail/" + Object.keys(snapshot.val())[i]);
          a.on("value", function(snapshot){
            var t = Object.values(snapshot.val());
            if((t[6] == hospital_v)){
              if(t[0]==area_v){
                if(t[5]==e.target.value){
                    arr.push(t[15]);
                }
              }
              }
            });
        }
      });
      setTimeout(function(){
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
    },500);
}





//병원 선택시 병원 정보를 띄워주는 코드
function categoryChange2(e) {
var ref = firebase.database().ref("Hospital_Info/");
ref.on("value", function(snapshot){
    for(i = 0; i< Object.keys(snapshot.val()).length; i++){
      var a = firebase.database().ref("Hospital_Info/" + Object.keys(snapshot.val())[i]);

      a.on("value", function(snapshot){
        var t = Object.values(snapshot.val());
        if((t[4] == e.value)){
          if(t[9].length <2){
            t[9] = "Non-Value";
          }
          document.getElementById('hName').innerHTML=e.value;
          document.getElementById('hPhone').innerHTML=t[9];
          document.getElementById('hAddress').innerHTML=t[0];
          document.getElementById('hTime').innerHTML=t[7]+' ~ '+t[3];
          if(t[8]=='True'){document.getElementById('hPark').innerHTML="Available";}
          else if(t[8]=='False'){document.getElementById('hPark').innerHTML="Unavailable";}

          }
        });
    }
  });


  var area=document.getElementById('area');
  var area_v=area.options[area.selectedIndex].value;
  var hospital =document.getElementById('hospital');
  var hospital_v=hospital.options[hospital.selectedIndex].value;
  var ref = firebase.database().ref("User/Admin/");
  ref.on("value", function(snapshot){
      for(i = 0; i< Object.keys(snapshot.val()).length; i++){
        var a = firebase.database().ref("User/Admin/" + Object.keys(snapshot.val())[i]);
        a.on("value", function(snapshot){
          var t = Object.values(snapshot.val());
          if((t[4] == hospital_v)){
            if(t[1]==area_v){
              adminId=t[3];
            }
            }
          });
      }
    });
    document.getElementById('date').value = "";
    document.getElementById('time').value = "Time";

}



//예약 정보 저장하는 함수
function reserve(){
  var userId=firebase.auth().currentUser.email;
  var area=document.getElementById('area');
  var area_v=area.options[area.selectedIndex].value;
  var hospital =document.getElementById('hospital');
  var hospital_v=hospital.options[hospital.selectedIndex].value;
  var purpose =document.getElementById('purpose');
  var purpose_v=purpose.options[purpose.selectedIndex].value;
  var petGender=document.getElementById('petGender');
  var petGender_v=petGender.options[petGender.selectedIndex].value;
  var name = document.getElementById('name').value;
  var phone = document.getElementById('phone').value;
  var date_v=document.getElementById('date').value;
  var time=document.getElementById('time');
  var time_v=time.options[time.selectedIndex].value;
  var petName_v=document.getElementById('petName').value;
  var petAge_v=document.getElementById('petAge').value;
  var petSpecies_v=document.getElementById('petSpecies').value;
  var message_v=document.getElementById('message').value;

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

      document.getElementById('area').value = "Please select a region";
      document.getElementById('hospital').value = "Please select a hospital";
      document.getElementById('purpose').value = "purpose";
      document.getElementById('name').value = "";
      document.getElementById('phone').value = "";
      document.getElementById('date').value = "";
      document.getElementById('time').value = "Time";
      document.getElementById('petName').value = "Pet Name";
      document.getElementById('petAge').value = "";
      document.getElementById('petSpecies').value = "";
      document.getElementById('petGender').value = "Pet Gender";
      document.getElementById('message').value = "";
      window.location.href = 'index.html';
      alertify.alert('Reservation Complete.');
    }
}
