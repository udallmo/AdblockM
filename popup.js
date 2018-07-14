window.onload = function () {
	function updateLabel() {
		var enabled = chrome.extension.getBackgroundPage().enabled;
    document.getElementById('toggle_button').value = enabled ? "Disable" : "Enable";
	}
	document.getElementById('toggle_button').onclick = function () {
		var background = chrome.extension.getBackgroundPage();
		background.enabled = !background.enabled;
		updateLabel();
	};
	updateLabel();
}

var port = chrome.extension.connect({
  name: "Sample Communication"
});
port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
  console.log("message recieved" + msg);
});
	