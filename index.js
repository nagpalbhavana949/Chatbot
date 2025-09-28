// Listen to all messages from the embedded Salesforce chatbot
window.addEventListener("message", (event) => {
  if (!event.data || !event.data.method) return;

  // Check for conversation events
  if (
    event.data.method === "EMBEDDED_MESSAGING_DISPATCH_EVENT_TO_HOST" &&
    event.data.data?.eventDetails?.conversationEntry?.entryPayload
  ) {
    let payload = JSON.parse(event.data.data.eventDetails.conversationEntry.entryPayload);
        postIframeDisable();
    // If bot shows choices, disable input
    if (payload.abstractMessage?.choices) {
      postIframeDisable();
    } 
    // If bot allows free text, enable input
    else if (payload.abstractMessage?.choicesResponse) {
      postIframeEnable();
    }
  }
});

// Get the chatbot iframe dynamically
function getChatbotIframe() {
  return document.querySelector("iframe[src*='ESWChatBotMessageforwe']");
}

// Post message to enable input
function postIframeEnable() {
  const iframe = getChatbotIframe();
  if (iframe) {
    iframe.style.pointerEvents = "none"; // disables clicks/typing
    iframe.style.opacity = "0.5"; // optional visual cue
  }
  if (iframe) iframe.contentWindow.postMessage('InputEnable', '*');
}

// Post message to disable input
function postIframeDisable() {
  const iframe = getChatbotIframe();
const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
const textArea = iframeDoc.querySelector('.embeddedMessagingInputFooterTextArea');
  if (iframe) {
    iframe.style.pointerEvents = "none"; // disables clicks/typing
    iframe.style.opacity = "0.5"; // optional visual cue
    textArea.style.background ="black";
  }
  if (iframe) iframe.contentWindow.postMessage('InputDisable', '*');
}
