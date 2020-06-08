function writeData(){
  var rootRef = firebase.database().ref('User/'+'a');
  rootRef.push({
    name : document.getElementById("namefield").value,
    age: document.getElementById("agefield").value,
    numa1 : document.getElementById("numfield").value
  });
}

function deleteData(key){
  var ref = firebase.database().ref(key);    //<!-- User/a -->
  ref.remove();
}

function updateData(key){
  var ref = firebase.database().ref(key);
  ref.update({
    name : 'a'
  });
}

function printData(key){
  var ref = firebase.database().ref(key);
  var output = document.getElementById('data1');
  ref.on("value", function(snapshot){
    output.innerHTML = JSON.stringify(snapshot.val(), null, 2);
  });
}
