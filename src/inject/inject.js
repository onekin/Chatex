chrome.extension.sendMessage({}, function(response) {
    
    console.log("Chatex v5...")

	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

        setTimeout(() => { 
                const url = new URL(window.location.href);
                const query = url.searchParams.get("q");
                document.getElementsByTagName('textarea')[0].value = query
                document.querySelector('button > svg').parentElement.click()
        }, 500);


	}
	}, 10);
});
