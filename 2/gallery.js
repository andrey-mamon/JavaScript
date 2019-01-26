var button = document.getElementById('send');

button.addEventListener('click', function() {
  var xhr = new XMLHttpRequest();

  // настройка запроса
  xhr.open('GET', 'http://127.0.0.1:8080/gallery.json');
  // отправка запроса
  xhr.send();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      try {
        var images = JSON.parse(xhr.responseText);

        var $div = document.createElement('div');
        images.forEach(function(img) {
          var $link = document.createElement('a');
          $link.href = img.full;
          $link.title = img.name;
          var $image = document.createElement('img');
          $image.src = img.thumbnail;
          
          $link.appendChild($image);
          $div.appendChild($link);
        });

        document.body.appendChild($div);
      } catch {
        console.log('Error');
      }
    }
  }
});