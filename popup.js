var $error = $('#error');
var tags;
var inputTextValue;

function renderStatus(statusText) {
  document.getElementById('status').textContent = statusText;
}

function searchAgainstTags(searchText){
  console.log(tags);
  if(tags === undefined){   
    $error.text("Scanning Images....");

    chrome.tabs.executeScript(null, {file:"js/jquery-1.11.3.min.js"});
    chrome.tabs.executeScript(null, {file:"js/jquery.cookie.js"});
    chrome.tabs.executeScript(null, {file:"url-scraper.js"}, function(data){
      console.log(data);
      tags = JSON.parse(data);

      // url = tags.results[0].url;
      // //url = url.replace("//","\\/\\/");
      // tags = tags.results[0].result.tag.classes;
      searchAgainstTags(searchText);
    });          
  }else{	
    var check = tags[searchText];        
    if(check === undefined){
      $error.text("Nothing Found");
    }else{
      $error.text("Found!");
      var parts = check[0].split("/");
      console.log(check);
        chrome.tabs.executeScript({
          code: '$("html, body").animate({scrollTop : $("img[src$='+"'"+parts[parts.length-1]+"'"+'] || img[src$='+"'"+parts[parts.length-2]+"/"+parts[parts.length-1]+"'"+']").offset().top },1000);'
        });              
    }
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
