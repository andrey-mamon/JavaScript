var button = document.getElementById('send');

button.addEventListener('click', function() {
  var xhr = new XMLHttpRequest();

  // настройка запроса
  xhr.open('GET', 'http://127.0.0.1:8080/response.json');
  // отправка запроса
  xhr.send();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === XMLHttpRequest.DONE) {
      try {
        var response = JSON.parse(xhr.responseText);

        var $div = document.createElement('div');
        if (response.result === 'success') {
          $div.classList.add('success')
        } else if (response.result === 'error') {
          $div.classList.add('error')
        }

        $response = document.getElementById('response');
        while ($response.firstChild) {
          $response.firstChild.remove();
        }
        $response.appendChild($div);
        
      } catch {
        console.log('Error');
      }
    }
  }
});