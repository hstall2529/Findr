var $status = $('#status');
var tags;
var inputTextValue;
var found = [];
var foundIndex = 0;

function searchAgainstTags(searchText){
  console.log(tags);
  if(tags === undefined){   
    $status.text(" ... ");

    chrome.tabs.executeScript(null, {file:"js/jquery-1.11.3.min.js"});
    chrome.tabs.executeScript(null, {file:"js/jquery.cookie.js"});
    chrome.tabs.executeScript(null, {file:"url-scraper.js"}, function(data){
      console.log(data);
      tags = JSON.parse(data);
      searchAgainstTags(searchText);
    });          
  }else{	
    var check = tags[searchText];        
    foundIndex = 0;    

    if(check === undefined){
      found = [];
      $status.text(" 0 ");       
    }else{      
      found = check;          
      scrollAndHighlight(check, foundIndex);            
    }
  }  	
}

function scrollAndHighlight(locations, index){
  $status.text(" " + (index+1)+": "+locations.length + " ");
  var parts = locations[index].split("/");
  console.log("Found images: ");
  console.log(locations);
  chrome.tabs.executeScript({
    code: '$("html, body").animate({scrollTop : $("img").filter(function() {return this.src.match(/'+parts[parts.length-1]+"$/);}).offset().top },1000);"
  });
  chrome.tabs.executeScript({
    code:'$("img").css("border","none");'
  });
  chrome.tabs.executeScript({
    code:'$("img").filter(function(){return this.src.match(/'+parts[parts.length-1]+"$/);}).css('border','solid 10px white');"
  });          
}


$("#incr").click(function(e){
  e.preventDefault();  

  if(found.length > 1){    
    foundIndex++;  
    if(foundIndex >= found.length)
      foundIndex = 0;
    scrollAndHighlight(found, foundIndex);
  }
})

$("#decr").click(function(e){
  e.preventDefault();

  if(found.length > 1){
    foundIndex--;  
    if(foundIndex < 0)
      foundIndex = found.length -1;
    scrollAndHighlight(found, foundIndex);
  }
})



document.addEventListener('DOMContentLoaded', function() {      
  $status = $('#status');

  window.onkeyup = keyup;

	function keyup(e) {
  //setting your input text to the global Javascript Variable for every key press
  		inputTextValue = e.target.value.toLowerCase();
      console.log(inputTextValue);
  		//renderStatus(inputTextValue);
      	searchAgainstTags(inputTextValue);
	}  
});
