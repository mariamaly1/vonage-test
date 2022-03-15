// replace these values with those generated in your TokBox Account
var apiKey = "47465591";
var sessionId = "2_MX40NzQ2NTU5MX5-MTY0NzM2ODQyNjk5Mn53RThsc2R2VnBCd2xQWXhGdEF2TUhJc1B-fg";
var token = "T1==cGFydG5lcl9pZD00NzQ2NTU5MSZzaWc9NmUyYjk0MjlhOGM4MDQzNGZmMGZmNzBlZTJhZWM0M2E4YmY2NzZmYjpzZXNzaW9uX2lkPTJfTVg0ME56UTJOVFU1TVg1LU1UWTBOek0yT0RReU5qazVNbjUzUlRoc2MyUjJWbkJDZDJ4UVdYaEdkRUYyVFVoSmMxQi1mZyZjcmVhdGVfdGltZT0xNjQ3MzY4NDU4Jm5vbmNlPTAuODU0NTM4NTgyMzMwOTcxNSZyb2xlPW1vZGVyYXRvciZleHBpcmVfdGltZT0xNjQ5OTYwNDU4JmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";
var flag = true;
// (optional) add server code here
var publisher = null;

initializeSession();

function disableEnableVideoAndAudio () {
  var button = document.getElementById("button");
  if (button.value.includes("Disable")) {
    flag = false;
    button.value = "Enable Video and Audio"
  } else {
    flag = true;
    button.value = "Disable Video and Audio"
  }
  publisher.publishVideo(flag);
  publisher.publishAudio(flag);
}

// Handling all of our errors here by alerting them
function handleError(error) {
    if (error) {
      alert(error.message);
    }
  }
  
  function initializeSession() {
    var session = OT.initSession(apiKey, sessionId);
    // Subscribe to a newly created stream
    session.on('streamCreated', function(event) {
        session.subscribe(event.stream, 'subscriber', {
          insertMode: 'append',
          width: '100%',
          height: '100%'
        }, handleError);
      });
  
    // Create a publisher
    publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    // Connect to the session
    session.connect(token, function(error) {
      // If the connection is successful, publish to the session
      if (error) {
        handleError(error);
      } else {
        session.publish(publisher, handleError);
      }
    });
  }