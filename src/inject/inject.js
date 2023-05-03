// Send an empty message to the extension's background page and handle the response with a callback function
chrome.extension.sendMessage({}, function(response) {
    // Log a message to the console
    console.log("Chatex working...");
    const url = new URL(window.location.href);
    console.log(url);
    const query = url.searchParams.get("q");
    console.log(query);
    const context = url.searchParams.get("c");
    console.log(context);
    // Set up an interval that will check if the document is ready every 1 second
    var readyStateCheckInterval = setInterval(function() {
        // Check if the document is fully loaded and ready to be manipulated
        if (document.readyState === "complete") {
            // Stop the interval since the document is ready
            console.log('context');
            // Create a new keyboard event to simulate the enter key press
            const enterKeyEvent = new KeyboardEvent('keydown', {
                key: 'Enter',
                code: 'Enter',
                keyCode: 13,
                which: 13,
                bubbles: true,
                cancelable: true,
            });
            setTimeout(() => {
                let textArea = document.getElementsByTagName('textarea')[0]
                let question = query
                if (context) {
                    const regex = /context\(\-(.*?)\-\)/g;
                    const matches = [];
                    let match;
                    while ((match = regex.exec(context))) {
                        matches.push(match[1]);
                    }
                    question = query + " in the context of " + matches.join(" and ")
                    textArea.value = question
                } else {
                    textArea.value = question;
                }
                setTimeout(() => {
                    textArea.dispatchEvent(enterKeyEvent);
                }, 50);
            }, 500);

            clearInterval(readyStateCheckInterval);
        }
    }, 100);
});