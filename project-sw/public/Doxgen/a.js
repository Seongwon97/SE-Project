/**

    @mainpage Project : 프로젝트 이름

    @section intro 소개

        - 소개 : 간단한 프로젝트 소개

        - 설명 : 프로젝트 설명을 "\n"을 넣어서 행을 바꾸어 가며 \n

                  넣을 수 있습니다.

    @section Program 프로그램명 : app_실행_파일_이름

    @section InOut 입/출력

        - INPUT : GPIO 출력 제어\n

                  모니터링을 위한 값 요구

        - OUTPUT : 온도,습도,풍속, 차압 제어

    @section  CreateInfo 작성 정보

        - 작성자 :   장길석

        - 작성일 :   2013/11/05

    @section  ModifyInfo 수정 정보

        - 2013/11/05

            -# 메인 루틴 작성

            -# GPIP 제어 루틴 추가

    @section Caution 주의할 사항

        -

    @subsection exec >> 실행 방법 및 인수 설명

        - 실행 방법\n

        실행-파일-이름\n

        ./app_실행_파일_이름



    @section common 기타 정보

        - 저작권    에프에이리눅스(주)

        - 외부공개 금지

*/

QUnit.test( "test function test", function( assert ) {
  const result = test();
  assert.equal( result,1,  "Passed!" );
});
QUnit.test( "delete row function test", function( assert ) {
  const result = test();
  assert.equal( result,1,  "Passed!" );
});
QUnit.test( "chgMainMap function test", function( assert ) {
  const result = chgMainMap(1);
  assert.equal( result,"img/map1/map1.png",  "Passed!" );
});

QUnit.test( "insertArea function test", function( assert ) {
  const result = inputArea("강남구");
  assert.equal( result,"강남구",  "Passed!" );
});
QUnit.test( "add_row function test", function( assert ) {
  const result = add_row(1, "서울동물병원", "010-4043-2907", "강남구", "서울특별시", "09:00", "18:00", "true", "true", "true");
  assert.equal( result,1,  "Passed!" );
});
QUnit.test( "delete_row function test", function( assert ) {
  const result = delete_row();
  assert.equal( result,1,  "Passed!" );
});
QUnit.test( "searchHospitalInfo1 function test", function( assert ) {
  const result = searchHospitalInfo1("광진구");
  assert.equal( result,1,  "Passed!" );
});

/**
*    Copyright 2020. TEST Co.,Ltd. All rights reserved.
*
*    @file		파일명
*    @author	저작권자
*    @version	버전
*    @date		날짜
*    @bug		버그
*
*    @par Revision:
*		- 수정 정보
*			수정 내용
*
*    @par Description:
*
*
*/
function test(){
  return 1;
}
/**
*    Copyright 2020. TEST Co.,Ltd. All rights reserved.
*
*    @file		파일명
*    @author	저작권자
*    @version	버전
*    @date		날짜
*    @bug		버그
*
*    @par Revision:
*		- 수정 정보
*			수정 내용
*
*    @par Description:
*
*
*/
function chgMainMap(guNum){
  document.getElementById("mainMap").src = "img/map1/map"+guNum+".png";
  return "img/map1/map"+guNum+".png";
}
function inputArea(val){
  var a  = document.getElementById('choiceArea');
  a.value = val;
  return a.value;
}
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
  return 1;
}
function delete_row(){
  var table = document.getElementById("hosTable");
  for(i = table.rows.length -1; i>=1; i--){

    table.deleteRow(i);
  }
  return 1;

}

function searchHospitalInfo1(area){   //name, ti, pa, be, ho

  inputArea(area);
  alertify.alert("Success! Please wait a moment!")
  name =  document.getElementById('hosName').value;
  ti = document.getElementById('time').value;
  pa = document.getElementById('parking').value;
  be = document.getElementById('beauty').value;
  ho = document.getElementById('hotel').value;
  name = "서울동물병원";
  ti = "11:00";
  pa = "o";
  be = "x";
  ho = "o";
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
    return 1;
  }
