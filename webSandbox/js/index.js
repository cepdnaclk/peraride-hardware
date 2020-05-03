$(document).ready(function () {

   $("#scrollToTop").click(function(){
      $('body,html').animate({scrollTop: 0}, 700);
   });
});


function listDocks(){
   $.ajax({
      type: "GET",
      dataType: "json",
      url: "http://peraride-api.herokuapp.com/api/auth/dock/locate?station_id=1111",
      beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + $("#tokenTxt").val());
      },
      success: function (data) {
         var response = data;
         console.log(data);
         $("#dockResp").html(JSON.stringify(response))   ;

      },
      error: function (request, status, err) {
         alert("Error " + status + " " + err);
      },
      timeout: 1500
   });
}

function listBikes(){
   $.ajax({
      type: "GET",
      dataType: "json",
      url: "http://peraride-api.herokuapp.com/api/auth/bike/locate?station_id=1111",
      beforeSend: function (xhr) {
         xhr.setRequestHeader('Authorization', 'Bearer ' + $("#tokenTxt").val());
      },
      success: function (data) {
         var response = data;
         console.log(data);
         $("#bikeResp").html(JSON.stringify(response))   ;

      },
      error: function (request, status, err) {
         alert("Error " + status + " " + err);
      },
      timeout: 1500
   });
}

function dockLock(){

   var rfid = {
      10001: "asd2324",
      10100: "1338595165"
   }
   var bikeId =  $("#bikeId option:selected").text();

   var reqData = {
      "dock_id": $("#dockId").val(),
      "rfid_code": rfid[bikeId]
   };

   console.log(reqData);

   $.ajax({
      type: "POST",
      dataType: "json",
      data: JSON.stringify(reqData),
      url: "http://peraride-api.herokuapp.com/api/auth/dock/lock",
      headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer " + $("#tokenTxt").val()
      },
      success: function (resp) {
         console.log(resp);
         var msg =resp.responseJSON.message;
         var respCode = resp.status;
         $("#dockResp").html(respCode + "\n" + msg)   ;
      },
      error: function (resp, status, err) {
         console.log(resp);
         var msg =resp.responseJSON.message;
         var respCode = resp.status;
         $("#dockResp").html(respCode + "\n" + msg)   ;
      },
      timeout: 1500
   });
}

function dockUnlock(){
   $.ajax({
      type: "GET",
      dataType: "json",
      url: "http://peraride-api.herokuapp.com/api/auth/dock/unlock?dock_id=" + $("#dockId").val(),
      headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer " + $("#tokenTxt").val()
      },
      success: function (resp) {
         console.log(resp);
         var msg =resp.responseJSON.message;
         var respCode = resp.status;
         $("#dockResp").html(respCode + "\n" + msg);
      },
      error: function (resp, status, err) {
         console.log("err: ");
         console.log(resp);

         var msg = resp.statusText;
         var respCode = resp.status;
         $("#dockResp").html(resp.responseText);
      },
      timeout: 1500
   });
}






function bikeUnlock(){

   var bikeId =  $("#bikeId option:selected").text();

   $.ajax({
      type: "GET",
      dataType: "json",
      url: "http://peraride-api.herokuapp.com/api/auth/bike/unlock?bike_id=" + bikeId,
      headers: {
         "Content-Type": "application/json",
         "Authorization": "Bearer " + $("#tokenTxt").val()
      },
      success: function (resp) {
         console.log(resp);
         var msg =JSON.stringify(resp);;
         var respCode = resp.state;
         $("#bikeResp").html(respCode + "\n" + msg)   ;
      },
      error: function (resp, status, err) {
         console.log(resp);
         var msg = resp.statusText;
         var respCode = resp.responseText;
         $("#bikeResp").html(respCode + "\n" + msg)   ;
      },
      timeout: 1500
   });
}
