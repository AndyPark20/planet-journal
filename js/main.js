
var $urlInput = document.querySelector('#avatarUrl');
var $image = document.querySelector('img');

$urlInput.addEventListener('input', function (e) {

  if ($urlInput.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $image.setAttribute('src', e.target.value);
  }

});
