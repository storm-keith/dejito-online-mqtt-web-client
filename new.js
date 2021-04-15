var client = mqtt.connect($('#broker').val());

function connect(){
  
  var status = $('#status');
  
  status.val("Connect ..... "); 

  client.on('connect', function () {

    status.val("Connected!");

  })

  client.on('message', (topic, message) => {
    
    let date = new Date();

    if (topic == $('#sub-topic').val()) {

      $("#incomingTable").prepend(
        "<tr><td>" + topic + "</td><td>" + message + "</td><td>"+ date.toDateString()+ " " +date.toLocaleTimeString() +"</td></tr>"
      );

    }
  })

}

function publish(){
  
  var date = new Date;
  var pub_topic = $('#pub-topic'); 
  var pub_payload = $('#pub-payload')
  if( pub_topic.val()  != "" && pub_payload.val() != ""){

      client.publish( pub_topic.val(), pub_payload.val());

      $('#publishTable').prepend(
    
        "<tr><td>" + pub_topic.val() + "</td><td>" +pub_payload.val() + "</td><td>"+ date.toDateString()+ " " +date.toLocaleTimeString() +"</td></tr>"

      );

  }else{
    alert("Please input topic and payload");
  }

}


function subscribe(){

  var date = new Date;
  var sub_topic = $('#sub-topic'); 

  if( sub_topic.val()  != ""){

    client.subscribe( sub_topic.val(), (err) => {

      if(err){
        console.log("Error in subscribing topic!");
      }

    });

    $('#subscribeTable').prepend(
  
      "<tr><td>" + sub_topic.val() + "</td><td>"+ date.toDateString()+ " " +date.toLocaleTimeString() +"</td></tr>"

    );

}else{
  alert("Please input topic.");
}

}
