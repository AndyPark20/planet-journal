
var $urlInput = document.querySelector('#avatarUrl');
var $image = document.querySelector('img');
var $userForm = document.querySelector('#input-form');

$urlInput.addEventListener('input', function (e) {

  if ($urlInput.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $image.setAttribute('src', e.target.value);
  }
});

$userForm.addEventListener('submit', function (e) {
  e.preventDefault();
  data.profile.username = $userForm.username.value;
  data.profile.fullName = $userForm.fullName.value;
  data.profile.location = $userForm.location.value;
  data.profile.avatarUrl = $userForm.avatarUrl.value;
  data.profile.bio = $userForm.bio.value;
  $userForm.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
});

window.addEventListener('beforeunload', function () {

  var userData = JSON.stringify(data);
  localStorage.setItem('inputData', userData);
});

var getData = localStorage.getItem('inputData');

if (getData !== null) {
  data = JSON.parse(getData);
}
