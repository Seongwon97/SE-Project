/**
    @mainpage Project : Animal Hospital Reservation System.
    @section intro
        - intro : You can make the reservation more easily
        - description : you can select the hospital of seoul.\n
        and make the reservation from available time & date \n
        Animal Hospital reservation system that you can do it easily.
    @section Program : animal-hospital-project.web.app
    @section Input Output
        - INPUT : reservation\n
                  data for manage % change informations\n
                  data for searching his/her information.
        - OUTPUT : data from firebase database.
    @section  CreateInfo
        - author :   \nJo Wonbeen\n
                     Jang Haeyoung\n
                     Oh Sungwon\n
                     Yeo Junku
        - data :   2020-06-22
    @section  ModifyInfo
        - 2020/06/22
            -# write document
            -# wtite each function
    @subsection execution
        - animal-hospital-project.web.app
    @section copyright
        - Software department of Gachon univ.
        - prohibition of external disclosure
*/

/**
 *@brief change the photo of seoul mapp
 *@details if you click the map of seoul, the photo of seoul change to represent your area.
 *@param number of photo. each number is matched each photo of seoul map.
*/
function chgMainMap(guNum){
  document.getElementById("mainMap").src = "img/map1/map"+guNum+".png";

}
/**
 *@details when you click the map of seoul, the area info box change synchronously.
 *@param area name selected from map.
*/
function inputArea(val){
  var a  = document.getElementById('choiceArea');
  a.value = val;

}
/**
 *@brief make the table to show the hospital information.
 *@details the hospital information is shown at the info table. \n
           The hospital information is selected and displayed by the options you choose.
 *@param each option value for select the hospital information.
*/
function add_row(a,b,c,d,e,f,g,h,i,j){
  var listview = document.getElementById("hosTable");
  addTbody = document.createElement("TBODY");
  addTr = document.createElement("TR");
  var arr = [a,b,c,d,e,f,g,h,i,j];
  addTr.setAttribute("align","center");

  for(i=0; i<10; i++){
    addTd = document.createElement("TD");
    addTd.innerHTML = arr[i];
    addTr.appendChild(addTd);
    addTbody.appendChild(addTr
    );
    listview.appendChild(addTbody);
  }

}
/**
 *@brief delete all rows of table.
 *@details To show new hospital informations, \n
           Delete the existing information in the table and display the required information in the table.
 *@param no parameter.
*/
function delete_row(){
  var table = document.getElementById("hosTable");
  for(i = table.rows.length -1; i>=1; i--){

    table.deleteRow(i);
  }


}
/**
 *@brief search the hospital information you want.
 *@details you can choose various options to select the hospital information. \n
 Hospital information is selected and displayed by the options you choose. \n
 You can simply check the hospital information you want through this information.
 *@param The area name of the hospital you want to get.
*/
function searchHospitalInfo1(area){   //name, ti, pa, be, ho

  inputArea(area);
  alertify.alert("Success! Please wait a moment!")
  name =  document.getElementById('hosName').value;
  ti = document.getElementById('time').value;
  pa = document.getElementById('parking').value;
  be = document.getElementById('beauty').value;
  ho = document.getElementById('hotel').value;
  document.getElementById("count").innerHTML = "◆ Count :&nbsp;&nbsp;";

  var count = 0;
  var ref = firebase.database().ref("Hospital_Info/");
    delete_row();
    var arr = [area, name, ti, pa, be, ho];
    for(i=0; i<3; i++){
      if(arr[i+3] == "O" || arr[i+3] == "o"){
        arr[i+3] = "True";
      }
      else if(arr[i+3] == "X" || arr[i+3] == "x") {
        arr[i+3] = "False";
      }
      else {
        arr[i+3]= "";
      }
    }
    var time = parseInt(arr[2].substring(0,2));
    if(time < 9){
      time = time + 12;
    }
    ref.on("value", function(snapshot){

        for(i = 0; i< Object.keys(snapshot.val()).length; i++){
          var a = firebase.database().ref("Hospital_Info/" + Object.keys(snapshot.val())[i]);
          a.on("value", function(snapshot){
            var t = Object.values(snapshot.val());
            if((t[1] == arr[0] || arr[0].length==0)&&
               (t[4] == arr[1] || arr[1].length ==0)&&
               (parseInt(t[7].substring(0,2)) <= time || arr[2].length ==0)&&
               (parseInt(t[3].substring(0,2)) > time || arr[2].length ==0)&&
               (t[8] == arr[3] || arr[3].length ==0)&&
               (t[2] == arr[4] || arr[4].length ==0)&&
               (t[6] == arr[5] || arr[5].length ==0)){
              if(t[9].length <2){
                t[9] = "Non-Value";
              }
              add_row(t[5], t[4], t[9], t[1], t[0], t[7], t[3], t[8], t[6], t[2]);
              count++;

            }
        });
      }
      var table = document.getElementById("hosTable");
      if (table.rows.length -1==0){
        add_row("No", "No Data", "No Data", "No Data", "No Data", "No", "No","No Data", "No Data", "No Data");
      }

      document.getElementById('count').innerHTML += count.toString();

    });

    document.getElementById('hosName').value = "";
    document.getElementById('time').value = "";
    document.getElementById('parking').value = "";
    document.getElementById('beauty').value = "";
    document.getElementById('hotel').value = "";
  }
