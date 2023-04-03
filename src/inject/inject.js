// Send an empty message to the extension's background page and handle the response with a callback function
chrome.extension.sendMessage({}, function(response) {
    // Log a message to the console
    console.log("Chatex working...");

    // Set up an interval that will check if the document is ready every 1 second
    var readyStateCheckInterval = setInterval(function() {
        // Check if the document is fully loaded and ready to be manipulated
        if (document.readyState === "complete") {
            // Stop the interval since the document is ready
            clearInterval(readyStateCheckInterval);

            // Set up a timeout of 1 second (1000 milliseconds) before executing the code inside the arrow function
            setTimeout(() => {
                // Create a new URL object based on the current window's URL
                const url = new URL(window.location.href);

                // Get the value of the "q" parameter in the URL's search parameters
                const query = url.searchParams.get("q");

                // Create a new keyboard event to simulate the enter key press
                const enterKeyEvent = new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    keyCode: 13,
                    which: 13,
                    bubbles: true,
                    cancelable: true,
                });

                // Log the value of "query" to the console
                console.log(query)

                // Set the value of the first <textarea> element on the page to the value of "query"
                let textArea = document.getElementsByTagName('textarea')[0]
                textArea.value = query;

                // Trigger the "enter" key press event on the <textarea> element to initiate the search
                setTimeout(() => {
                    textArea.dispatchEvent(enterKeyEvent);
                }, 500);
            }, 1000);
        }
    }, 1000);
});