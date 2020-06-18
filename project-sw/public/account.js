firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var log = document.getElementById("log-memu");

    log.innerHTML = "My Page";
    log.setAttribute("href","MyPage.html");

    //document.getElementById("off_btn").style.display="block"
    //document.getElementById("on_btn").style.display="none"
  }
  else{
  //document.getElementById("off_btn").style.display="none"
    //document.getElementById("on_btn").style.display="block"
  }
});

/*
function login(){
  var userEmail=document.getElementById("userEmail").value;
  var userPass=document.getElementById("userPass").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error){
    var errorCode=error.code;
    var errorMessage=error.message;

    window.alert("Error: "+errorMessage);
  });
  window.alert("Sign in complete!");
}*/
function login(){
  var userEmail=document.getElementById("userEmail").value;
  var userPass=document.getElementById("userPass").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).then(function(){
      window.alert("Log in complete! Thank you.");
      window.location.href = 'index.html';
  }).catch(function(error){
      window.alert("Log-in fail! ");
  });
}

function logout(){
  firebase.auth().signOut().then(function(){
     alert("log out success!");
     window.location.href = 'index.html';
  }, function(error){
     alert("log out fail!");
  });
}



$('#btn_signup').click(function(){
  var signup_mail = $('#email').val();
  var signup_password = $('#password').val();

  firebase.auth().createUserWithEmailAndPassword(signup_mail, signup_password).then(function(){
    alert("Sign up success! Please Log-in.");
    firebase.auth().signOut();
    window.location.href = 'log_in.html';
  }).catch(function(error){
    alert("Sign up fail!");
  });

});
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

  if(password==retype_password){
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
  }
  else{
    window.alert("Password inconsistency detected");
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
  if(password==retype_password){
    var rootRef = firebase.database().ref('User/Member/');
      rootRef.push({
        username:username,
        email:email,
        password:password,
        address:address,
        phone_num:phone_num,
        birthday:birthday
      });
      window.alert("Welcome! Please login again");
  }
  else{
    window.alert("Password inconsistency detected");
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
           alert("Please Log-in to use the service.");
         }
    });
  }
  else if(html.innerHTML == "Reservation"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","reservation.html");
         } else {
           html.setAttribute("href","log_in.html");
           alert("Please Log-in to use the service.");
         }
    });
  }
  else if(html.innerHTML == "Reservation Information"){
    firebase.auth().onAuthStateChanged(function(user) {
         if (user) {
           html.setAttribute("href","reservation_info.html");
         } else {
           html.setAttribute("href","log_in.html");
           alert("Please Log-in to use the service.");
         }
    });
  }
}

function home(){
  window.location.href = 'index.html';
}
