var $error = $('#error');
var tags;
var inputTextValue;

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });
}


function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function searchAgainstTags(searchText){
  if(tags === undefined){   
    chrome.tabs.executeScript(null, {file:"js/jquery-1.11.3.min.js"});
    chrome.tabs.executeScript(null, {file:"js/jquery.cookie.js"});
    chrome.tabs.executeScript(null, {file:"url-scraper.js"}, function(data){
      console.log(data);
      tags = JSON.parse(data);
    });
        
    $error.text("Scanning Images....");
  }else{
  	$error.text(tags);
    
}
}


document.addEventListener('DOMContentLoaded', function() {

  getCurrentTabUrl(function(url) {
  	chrome.tabs.executeScript(null,{file:"js/jquery-1.11.3.min.js"});
  	chrome.tabs.executeScript(null, {file: "url-scraper.js"});
   

    $error = $('#error');

    window.onkeyup = keyup;

	function keyup(e) {
  //setting your input text to the global Javascript Variable for every key press
  		inputTextValue = e.target.value;
  		renderStatus(inputTextValue);
        searchAgainstTags(inputTextValue);
	}
  });
});
