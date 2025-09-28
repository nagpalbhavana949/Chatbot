//event listener which listens to every message/event from the Iframe

window.addEventListener("message", (event) => {

if ((event.data.method === "EMBEDDED_MESSAGING_DISPATCH_EVENT_TO_HOST" && event.data.data.eventDetails.conversationEntry && event.data.data.eventDetails.conversationEntry.entryPayload)) {

let payload = JSON.parse(event.data.data.eventDetails.conversationEntry.entryPayload)

    if( payload.abstractMessage && payload.abstractMessage.choices) {

postIframeDisable();

}

    else if(payload.abstractMessage && payload.abstractMessage.choicesResponse){

       postIframeEnable();

    }

}

});


//posting message to enable user input

function postIframeEnable(){

var iframe = document.getElementById("embeddedMessagingFrame");

   iframe.contentWindow.postMessage('InputEnable');

}

 

//posting message to disable user input

function postIframeDisable(){

var iframe = document.getElementById("embeddedMessagingFrame");

   iframe.contentWindow.postMessage('InputDisable');

}