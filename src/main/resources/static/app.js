const stompClient = new StompJs.Client({
  brokerURL: 'ws://localhost:8080/gs-guide-websocket'
});

stompClient.onConnect = (frame) => {
  setConnected(true);
  console.log('Connected: ' + frame);
  stompClient.subscribe('/topic/greetings/1', (greeting) => {
    // showGreeting(JSON.parse(greeting.body).content);
    showGreeting(greeting.body);
  });
};

stompClient.onWebSocketError = (error) => {
  console.error('Error with websocket', error);
};

stompClient.onStompError = (frame) => {
  console.error('Broker reported error: ' + frame.headers['message']);
  console.error('Additional details: ' + frame.body);
};

function setConnected(connected) {
  $("#connect").prop("disabled", connected);
  $("#disconnect").prop("disabled", !connected);
  if (connected) {
    $("#conversation").show();
  }
  else {
    $("#conversation").hide();
  }
  $("#greetings").html("");
}

function connect() {
  stompClient.activate();
}

function disconnect() {
  stompClient.deactivate();
  setConnected(false);
  console.log("Disconnected");
}

function sendName() {
  stompClient.publish({
    destination: "/app/hello",
    body: JSON.stringify({'name': $("#name").val()})
  });

  // Trying to send message directly on the topic
  // This confirms that message that
  // comes from the WebSocket controller - is just a new WebSocket message
  // that's mapped by the broker and that prefix is used just to redirect it to
  // WebSocket controller
  stompClient.publish({
    destination: "/topic/greetings/1",
    body: "TEST!!!"
  });


//   !!! IMPORTANT
//   This message will be received only by /topic subscribers
//   stompClient.publish({
//     destination: "/topic",
//     body: "TEST!!!"
//   });

//   This message will be received only by /topic/greetings subscribers
//   stompClient.publish({
//     destination: "/topic/greetings",
//     body: "TEST!!!"
//   });

//   This message will be received only by /topic/greetings/1 subscribers
//   stompClient.publish({
//     destination: "/topic/greetings/1",
//     body: "TEST!!!"
//   });
}

function showGreeting(message) {
  $("#greetings").append("<tr><td>" + message + "</td></tr>");
}

$(function () {
  $("form").on('submit', (e) => e.preventDefault());
  $( "#connect" ).click(() => connect());
  $( "#disconnect" ).click(() => disconnect());
  $( "#send" ).click(() => sendName());
});