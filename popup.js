var $error = $('#error');
var tags;
var inputTextValue;

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
  $error = $('#error');

  window.onkeyup = keyup;

	function keyup(e) {
  //setting your input text to the global Javascript Variable for every key press
  		inputTextValue = e.target.value;
  		renderStatus(inputTextValue);
      searchAgainstTags(inputTextValue);
	}  
});
