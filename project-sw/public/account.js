firebase.auth().onAuthStateChanged(function(user){
  if(user){
    document.getElementById("off_btn").style.display="block"
    document.getElementById("on_btn").style.display="none"
  }
  else{
    document.getElementById("off_btn").style.display="none"
    document.getElementById("on_btn").style.display="block"
  }
});

function login(){
  var userEmail=document.getElementById("userEmail").value;
  var userPass=document.getElementById("userPass").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error){
    var errorCode=error.code;
    var errorMessage=error.message;

    window.alert("Error: "+errorMessage);
  });
  window.alert("Sign in complete!");
}

function logout(){
  firebase.auth().signOut();
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
    window.alert("Welcome! Please login again");
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
  var number_pet=document.getElementById("number_pet").value;
  if(password==retype_password){
    var rootRef = firebase.database().ref('User/Member/');
      rootRef.push({
        username:username,
        email:email,
        password:password,
        address:address,
        phone_num:phone_num,
        birthday:birthday,
        number_pet:number_pet
      });
      window.alert("Welcome! Please login again");
  }
  else{
    window.alert("Password inconsistency detected");
  }
}
