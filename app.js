// replace these values with those generated in your TokBox Account
var apiKey = "47465591";
var sessionId = "2_MX40NzQ2NTU5MX5-MTY0NzI5NjYxNzc1NH5KbDREemJITGJ4ZGZ0M2ZZbkZzdUhEeTR-fg";
var token = "T1==cGFydG5lcl9pZD00NzQ2NTU5MSZzaWc9N2JjMmRlNzVkMDFiN2EyMzQzZjc3MWQ2NDRiOGEwMzk1YjU3ZmNmZjpzZXNzaW9uX2lkPTJfTVg0ME56UTJOVFU1TVg1LU1UWTBOekk1TmpZeE56YzFOSDVLYkRSRWVtSklUR0o0WkdaME0yWlpia1p6ZFVoRWVUUi1mZyZjcmVhdGVfdGltZT0xNjQ3Mjk2NzkzJm5vbmNlPTAuNTQ2MTQ4Njk0MjE0MjY2NiZyb2xlPXB1Ymxpc2hlciZleHBpcmVfdGltZT0xNjQ5ODg4NzkzJmluaXRpYWxfbGF5b3V0X2NsYXNzX2xpc3Q9";

// (optional) add server code here
initializeSession();

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
    var publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  
    console.log(publisher);
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