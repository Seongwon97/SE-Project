QUnit.test( "login", function( assert ) {
  const result = login()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "logout", function( assert ) {
  const result = logout()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_signUp", function( assert ) {
  const result = aut_signUp()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_signUp", function( assert ) {
  const result = mem_signUp()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "aut_modify", function( assert ) {
  const result = aut_modify()
  assert.equal( result, 1, "Passed!" );
});
QUnit.test( "mem_modify", function( assert ) {
  const result = mem_modify()
  assert.equal( result, 1, "Passed!" );
});

firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var log = document.getElementById("log-memu");
    log.innerHTML = "My Page/Sign-out";
    log.setAttribute("href","index.html");
    var ref = firebase.database().ref("User/Admin/");
    ref.on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          if(data.val().email == firebase.auth().currentUser.email){
              log.setAttribute("href","MyPageAdmin.html");
          }
      });
    });
    ref = firebase.database().ref('User/Member/');
    ref.on("value", function (snapshot) {
        snapshot.forEach(function (data) {
          if(data.val().email == firebase.auth().currentUser.email){
              log.setAttribute("href","MyPageMember.html");
          }
      });
    });
  }
});


function login(){
  var userEmail="yjk5591@naver.com";
  var userPass="201635824";

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){

  }).catch(function(error){

  });
  return 1;
}

function logout(){
  firebase.auth().signOut().then(function(){

  }, function(error){

  });
  return 1;
}



function aut_signUp(){
  var username="여준구";
  var email="yjk5591@naver.com";
  var password="201635824";
  var retype_password="201635824";
  var address="경기도 수원시";
  var phone_num="01062205593";
  var birthday="19960804";
  var hospital_name="축덕동물병원";
  var area="수원시";
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
      else {

      }
    });
  }
  else{
    if(password!=retype_password){

    }
    else{

    }
  }
  return 1;

}

function mem_signUp(){
  var username="여준구";
  var email="yjk5591@naver.com";
  var password="201635824";
  var retype_password="201635824";
  var address="경기도 수원시";
  var phone_num="01062205593";
  var birthday="19960804";
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
      else {

      }
    });
  }
  else{
    if(password!=retype_password){

    }
    else{

    }
  }
  return 1;

}



function log(id){

  html = document.getElementById(id);
  if(html.innerHTML == "Hospital Information"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","hospital_info.html");
         } else {
           alertify.alert("Please Log-in to use the service.");
           setTimeout(function(){window.location.href = 'log_in.html';},1500);

         }
    });
  }
  else if(html.innerHTML == "Reservation"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","reservation.html");
         } else {
           alertify.alert("Please Log-in to use the service.");
           setTimeout(function(){window.location.href = 'log_in.html';},1500);
         }
    });
  }
  else if(html.innerHTML == "Reservation Information"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","reservation_info.html");
         } else {
           alertify.alert("Please Log-in to use the service.");
           setTimeout(function(){window.location.href = 'log_in.html';},1500);
         }
    });
  }
}

function home(){
  window.location.href = 'index.html';
}

function aut_modify(){
  var username="여준구";
  var email="yjk5591@naver.com";
  var password="201635824";
  var address="경기도 수원시";
  var phone_num="01062205593";
  var birthday="19960804";
  var hospital_name="축덕동물병원";
  var area="수원시";
  var ref = firebase.database().ref("User/Admin/");
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var buf = "yjk5591@naver.com";
          var key = "MA341957+34";
          var rootRef = firebase.database().ref('User/Admin/' + key + '/');

            var user = "MA341957+34";
            if(password != data.val().password || email != data.val().email){
              user.updatePassword(password).then(function() {
                user.updateEmail(email).then(function() {
                }).catch(function(error){
                  user.updatePassword(data.val().password).then(function(){

                  }).catch(function(error){
                  });
                });
              }).catch(function(error) {

                });
            }


            rootRef.update({
              username:username,
              email:email,
              password:password,
              address:address,
              phone_num:phone_num,
              birthday:birthday,
              hospital_name :hospital_name,
              area:area
            });


          }
      });
    });
    return 1;

  }


function mem_modify(){
  var username="여준구";
  var email="yjk5591@naver.com";
  var password="201635824";
  var address="경기도 수원시";
  var phone_num="01062205593";
  var birthday="19960804";

  ref = firebase.database().ref('User/Member/');
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var buf = "yjk5591@naver.com";
          var key = "MA1234+45";
          var rootRef = firebase.database().ref('User/Member/' + key + '/');

            var user = "MA1234+45";
            if(password != data.val().password || email != data.val().email){
              user.updatePassword(password).then(function() {
                user.updateEmail(email).then(function() {
                }).catch(function(error){
                  user.updatePassword(data.val().password).then(function(){

                  }).catch(function(error){
                  });
                });
              }).catch(function(error) {

                });
            }

            rootRef.update({
              username:username,
              email:email,
              password:password,
              address:address,
              phone_num:phone_num,
              birthday:birthday
            });


        }
    });
  });
  return 1;
}


function mem_withdraw(){
  alertify.confirm("Are you sure you want to delete your account?", function(e){
  if(e){
    alertify.alert("Delete Success!");
  var ref = firebase.database().ref('User/Member/');
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var key = data.key;
          var rootRef = firebase.database().ref('User/Member/' + key + '/');

          var user = firebase.auth().currentUser;
          user.delete().then(function() {
            rootRef.remove();
            window.location.href = 'index.html';
          }).catch(function(error) {
            alertify.alert("Delete fail!");
          });

        }
    });
  });
  }
  else{
      return ;
  }
  })
}

function auth_withdraw(){
  alertify.confirm("Are you sure you want to delete your account?", function(e){
  if(e){
    alertify.alert("Delete Success!");
  var ref = firebase.database().ref('User/Admin/');
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var key = data.key;
          var rootRef = firebase.database().ref('User/Admin/' + key + '/');

          var user = firebase.auth().currentUser;
          user.delete().then(function() {
            rootRef.remove();


            window.location.href = 'index.html';
          }).catch(function(error) {
            alertify.alert("Delete fail!");
          });

        }
    });
  });
  }
  else{
      alertify.alert("Cancel!");
  }
  })
}
