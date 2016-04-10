var $status = $('#status');
var $search = $('#search');
var tags;
var inputTextValue;
var found = [];
var foundHash = [];
var foundIndex = 0;
var hashes = [];

function searchAgainstTags(searchText){
  console.log(tags);
  if(tags === undefined){   
    $status.text(" ... ");
    $status.css("background-color", "#ff3333");

    chrome.tabs.executeScript(null, {file:"js/jquery-1.11.3.min.js"});
    chrome.tabs.executeScript(null, {file:"js/jquery.cookie.js"});
    chrome.tabs.executeScript(null, {file:"url-scraper.js"}, function(data){
      console.log(data);
      tags = JSON.parse(data);
      hashes = Object.keys(tags);
      searchAgainstTags(searchText);
    });          
  }else{	
    //var check = tags[searchText];        
    var check = false;
    found = [];  
    foundHash = [];  
    for(var i=0; i<hashes.length; i++){
      if(hashes[i].indexOf(searchText) >= 0){              
        check = true;

        if(found.indexOf(tags[hashes[i]][0]) == -1){
          found.push(tags[hashes[i]][0]);        
          foundHash.push(hashes[i]);
        }
      }
    }
    console.log(found);
    foundIndex = 0;    

    if(!check){
      found = [];
      $status.text(" 0 ");   
      $status.css("background-color", "#ff3333");
    }else if(searchText == ""){         
      $status.text("");          
    }else if(tags[searchText] != undefined){
      scrollAndHighlight(found, foundIndex, foundHash);
    }else{
      $status.text(" " + (foundIndex+1)+": "+found.length + " ");
      $status.css("background-color", "#47d147");
    }
  }  	
}

function scrollAndHighlight(locations, index, hashList){
  $status.text(" " + (index+1)+": "+locations.length + " ");
  $status.css("background-color", "#47d147");

  $search.val(hashList[index]);

  var parts = locations[index].split("/");  
  chrome.tabs.executeScript({
    code: '$("html, body").animate({scrollTop : $("img").filter(function() {return this.src.match(/'+parts[parts.length-1]+"$/);}).offset().top - 50 },1000);"
  });
  chrome.tabs.executeScript({
    code:'$("img").css("border","none");'
  });
  chrome.tabs.executeScript({
    code:'$("img").filter(function(){return this.src.match(/'+parts[parts.length-1]+"$/);}).css('border','solid 10px #E0E0E0');"
  });          
}


$("#incr").click(function(e){
  e.preventDefault();  

  if(found.length > 1){    
    foundIndex++;  
    if(foundIndex >= found.length)
      foundIndex = 0;
    scrollAndHighlight(found, foundIndex, foundHash);
  }
})

$("#decr").click(function(e){
  e.preventDefault();

  if(found.length > 1){
    foundIndex--;  
    if(foundIndex < 0)
      foundIndex = found.length -1;
    scrollAndHighlight(found, foundIndex, foundHash);
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
