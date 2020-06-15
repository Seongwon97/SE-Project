function signIn(){
  var userEmail=document.getElementById("email").value;
  var userPass=document.getElementById("password").value;
  window.alert("Working");
}

function signUp(){
  var rootRef=firebase.database().ref('')

  var username=document.getElementById("username").value;
  var password=document.getElementById("password").value;
  var retype_password=document.getElementById("retype_password").value;
  var address=document.getElementById("address").value;
  var phone_num=document.getElementById("phone_num").value;
}
