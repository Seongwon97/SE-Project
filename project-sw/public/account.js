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
  var userEmail=document.getElementById("userEmail").value;
  var userPass=document.getElementById("userPass").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){
      alertify.alert("Log in complete! Thank you.");
      window.location.href = 'index.html';
  }).catch(function(error){
      alertify.alert("Log-in fail! ");
  });
}

function logout(){
  firebase.auth().signOut().then(function(){
     alertify.alert("log out success!");
     window.location.href = 'index.html';
  }, function(error){
     alertify.alert("log out fail!");
  });
}



function aut_signUp(){
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var retype_password=document.getElementById("retype_password").value;
  var address=document.getElementById("address").value;
  var phone_num=document.getElementById("phone_num").value;
  var birthday=document.getElementById("birthday").value;
  var hospital_name=document.getElementById("hospital_name").value;
  var area=document.getElementById("area").value;
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
      alertify.alert("Sign up success! Please Log-in.");
      setTimeout(function(){
      firebase.auth().signOut();
      window.location.href = 'log_in.html';},2000);

    }).catch(function(error){
      if(password.toString().length <=5){
        alertify.alert("Sign up fail! Please enter more long password! more than 6 digits.");
      }
      else {
        alertify.alert("Sign ip fail! Please enter different E-mail.");
      }
    });
  }
  else{
    if(password!=retype_password){
      alertify.alert("Password inconsistency detected");
    }
    else{
      alertify.alert("Sign up fail! Please enter all details");
    }
  }

}

function mem_signUp(){
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var retype_password=document.getElementById("retype_password").value;
  var address=document.getElementById("address").value;
  var phone_num=document.getElementById("phone_num").value;
  var birthday=document.getElementById("birthday").value;
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
      alertify.alert("Sign up success! Please Log-in.");
      setTimeout(function(){
      firebase.auth().signOut();
      window.location.href = 'log_in.html';},2000);
    }).catch(function(error){
      if(password.toString().length <=5){
        alertify.alert("Sign up fail! Please enter more long password! more than 6 digits.");
      }
      else {
        alertify.alert("Sign ip fail! Please enter different E-mail.");
      }
    });
  }
  else{
    if(password!=retype_password){
      alertify.alert("Password inconsistency detected");
    }
    else{
      alertify.alert("Sign up fail! Please enter all details");
    }
  }

}



function log(id){
  html = document.getElementById(id);
  if(html.innerHTML == "Hospital Information"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","hospital_info.html");
         } else {
           html.setAttribute("href","log_in.html");
           alertify.alert("Please Log-in to use the service.");
         }
    });
  }
  else if(html.innerHTML == "Reservation"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","reservation.html");
         } else {
           html.setAttribute("href","log_in.html");
           alertify.alert("Please Log-in to use the service.");
         }
    });
  }
  else if(html.innerHTML == "Reservation Information"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","reservation_info.html");
         } else {
           html.setAttribute("href","log_in.html");
           alertify.alert("Please Log-in to use the service.");
         }
    });
  }
}

function home(){
  window.location.href = 'index.html';
}

function aut_modify(){
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var address=document.getElementById("address").value;
  var phone_num=document.getElementById("phone_num").value;
  var birthday=document.getElementById("birthday").value;
  var hospital_name=document.getElementById("hospital_name").value;
  var area=document.getElementById("area").value;

  var ref = firebase.database().ref("User/Admin/");
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var key = data.key;
          var rootRef = firebase.database().ref('User/Admin/'+ key +'/');
          var user = firebase.auth().currentUser;

          user.updatePassword(password).then(function() {
            user.updateEmail(email).then(function() {
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
              alertify.alert("Modify complete!");
              window.location.href = 'index.html';
            }).catch(function(error) {
              user.updatePassword(data.val().password).then(function(){
                alertify.alert("Please enter different E-mail.");
              }).catch(function(error){
              });
            });
          }).catch(function(error) {
              alertify.alert("Please enter the more long password!")
          });

        }
    });
  });

}

function mem_modify(){
  var username=document.getElementById("username").value;
  var email=document.getElementById("email").value;
  var password=document.getElementById("password").value;
  var address=document.getElementById("address").value;
  var phone_num=document.getElementById("phone_num").value;
  var birthday=document.getElementById("birthday").value;

  ref = firebase.database().ref('User/Member/');
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var key = data.key;
          var rootRef = firebase.database().ref('User/Member/' + key + '/');

            var user = firebase.auth().currentUser;
            user.updatePassword(password).then(function() {
              user.updateEmail(email).then(function() {
                rootRef.update({
                  username:username,
                  email:email,
                  password:password,
                  address:address,
                  phone_num:phone_num,
                  birthday:birthday
                });
                alertify.alert("Modify complete!");
                window.location.href = 'index.html';
              }).catch(function(error) {
                user.updatePassword(data.val().password).then(function(){
                  alertify.alert("Please enter different E-mail.");
                }).catch(function(error){
                });
              });
            }).catch(function(error) {
              alertify.alert("Please enter the more long password!")
            });

        }
    });
  });

}


function mem_withdraw(){
  if(confirm("Are you sure you want to delete your account?") == true){

  var ref = firebase.database().ref('User/Member/');
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var key = data.key;
          var rootRef = firebase.database().ref('User/Member/' + key + '/');

          var user = firebase.auth().currentUser;
          user.delete().then(function() {
            rootRef.remove();
            alertify.alert("Delete complete!");
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
}

function auth_withdraw(){
  if(confirm("Are you sure you want to delete your account?") == true){

  var ref = firebase.database().ref('User/Admin/');
  ref.on("value", function (snapshot) {
      snapshot.forEach(function (data) {
        if(data.val().email == firebase.auth().currentUser.email){
          var key = data.key;
          var rootRef = firebase.database().ref('User/Admin/' + key + '/');

          var user = firebase.auth().currentUser;
          user.delete().then(function() {
            rootRef.remove();
            alertify.alert("Delete complete!");
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
}
