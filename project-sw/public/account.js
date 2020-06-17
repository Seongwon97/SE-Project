firebase.auth().onAuthStateChanged(function(user){
  if(user){
    document.getElementById("on_btn").style.display="none"
    document.getElementById("off_div").style.display="block"
  }
  else{
    document.getElementById("on_btn").style.display="block"
    document.getElementById("off_btn").style.display="none"
  }
});

function login(){
  var userEmail=document.getElementById("email").value;
  var userPass=document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error){
    var errorCode=error.code;
    var errorMessage=error.message;

    window.alert("Error: "+errorMessage);
  });
}

function aut_signUp(){
  var password=document.getElementById("password").value;
  var retype_password=document.getElementById("retype_password").value;
  if(password==retype_password){
    alert("1");
    var rootRef = firebase.database().ref('User/');
    rootRef.push({
      username:document.getElementById("username").value,
      password:document.getElementById("password").value,
      address:document.getElementById("address").value,
      phone_num:document.getElementById("phone_num").value,
      birthday:document.getElementById("birthday").value,
      hospital_name:document.getElementById("hospital_name").value,
      area:document.getElementById("area").value
    });
    window.alert("Welcome!");
  }
  else{
    window.alert("Password inconsistency detected");
  }
}

function mem_signUp(){
  var username=document.getElementById("username").value;
  var password=document.getElementById("password").value;
  var retype_password=document.getElementById("retype_password").value;
  var address=document.getElementById("address").value;
  var phone_num=document.getElementById("phone_num").value;
  var birthday=document.getElementById("birthday").value;
  var number_pet=document.getElementById("number_pet").value;
  var rootRef = firebase.database().ref('User/Member/');
    rootRef.push({
      username:username,
      password:password,
      address:address,
      phone_num:phone_num,
      birthday:birthday,
      number_pet:number_pet
    });
}
