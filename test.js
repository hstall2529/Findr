var key = "";

var json = '{"requests":[{"image":{"content":'+ getBase64Image(img) +'},"features":[{"type":"LABEL_DETECTION","maxResults":5}]}]}'

$.ajax({
    url: "https://vision.googleapis.com/v1/images:annotate?key=" + key,    
    type: "GET",    
    dataType: 'json',
    contentType: 'application/json',
    data: {data: json},
    success: function (data) {
        console.log(data);
        $.cookie('imageTags', JSON.stringify(data));
        result = JSON.stringify(data);
    },
      error: function(data){
        console.log("AJAX error: " + data);
    }
  }); 


function getBase64Image(imgElem) {
    var canvas = document.createElement("canvas");
    canvas.width = imgElem.clientWidth;
    canvas.height = imgElem.clientHeight;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(imgElem, 0, 0);
    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}
