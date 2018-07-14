var enabled = true;
  
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		chrome.runtime.sendMessage({
			msg: "something_completed", 
			data: {
				subject: "Loading",
				content: "Just completed!"
			}
		  });
		//alert("blocking:"+ JSON.stringify(details.url));
		//return {cancel: true };
		return {redirectUrl: 'http://localhost:8081'};
	},
	{urls: blocked_domains},
	["blocking"]
);

