var $urlInput = document.querySelector('#avatarUrl');
var $image = document.querySelector('img');
var $userForm = document.querySelector('#input-form');
var $profile = document.querySelector('.profilePage');
var $editProfileSection = document.querySelector('.editProfile');
var $entries = document.querySelector('.entriesPage');
var $createEntries = document.querySelector('.createEntries');
var $photoUrl = document.querySelector('#photoUrl');
var $entryImg = document.querySelector('img.entryImage');
var $entryForm = document.querySelector('#entry-form');
var $entryList = document.querySelector('#entry-list');
var $modalWindow = document.querySelector('.modal');
var $modalAnimation = document.querySelector('.row-fixed-modal');
var $deleteEntryData = document.querySelector('.deleteEntry');
var $editEntryData = document.querySelector('.editEntry');
var $deleteEntry = document.querySelectorAll('li');
var $createEntryImage = document.querySelector('.entryImage');
var $search = document.querySelector('.searchInput');
var $magnifying = document.querySelector('.search');
var inverseNumber = 0;

function urlInputSet(e) {
  if ($urlInput.value === '') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $image.setAttribute('src', e.target.value);
  }

  if ($photoUrl.value === '') {
    $entryImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  } else {
    $entryImg.setAttribute('src', e.target.value);
  }

}

$urlInput.addEventListener('input', urlInputSet);
$photoUrl.addEventListener('input', urlInputSet);

$userForm.addEventListener('submit', function (e) {
  e.preventDefault();
  data.profile.username = $userForm.username.value;
  data.profile.fullName = $userForm.fullName.value;
  data.profile.location = $userForm.location.value;
  data.profile.avatarUrl = $userForm.avatarUrl.value;
  data.profile.bio = $userForm.bio.value;
  $userForm.reset();
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  swapWindow('profile');
});

$entryForm.addEventListener('submit', function (e) {
  var entry = {
    photoUrl: '',
    title: '',
    note: ''
  };

  e.preventDefault();
  entry.photoUrl = $entryForm.photoUrl.value;
  entry.title = $entryForm.title.value;
  entry.note = $entryForm.notes.value;
  data.entries.push(entry);
  $entryImg.setAttribute('src', 'images/placeholder-image-square.jpg');
  $entryList.prepend(userEntryList(entry));

  $entryForm.reset();
  location.reload();
  swapWindow('entries');

});

var getData = localStorage.getItem('inputData');
if (getData !== null) {
  data = JSON.parse(getData);
}

window.addEventListener('beforeunload', function () {
  var userData = JSON.stringify(data);
  localStorage.setItem('inputData', userData);
});

function renderElements() {
  var $masterDiv = document.createElement('div');
  var $profileHeader = document.createElement('h1');
  var $profileRow = document.createElement('div');
  var $imageColumn = document.createElement('div');
  var $image = document.createElement('img');
  var $userNameColumn = document.createElement('div');
  var $userNameWrapper = document.createElement('div');
  var $paddingIcon = document.createElement('div');
  var $userNameIcon = document.createElement('i');
  var $userName = document.createElement('p');
  var $userLocationWrapper = document.createElement('div');
  var $paddingLocationIcon = document.createElement('i');
  var $userLocationIcon = document.createElement('div');
  var $userLocation = document.createElement('p');
  var $userBioWrapper = document.createElement('div');
  var $userBioText = document.createElement('p');
  var $profileEditLink = document.createElement('a');

  $masterDiv.setAttribute('class', 'column-full');
  $profile.appendChild($masterDiv);

  $profileHeader.textContent = data.profile.fullName;
  $masterDiv.appendChild($profileHeader);

  $profileRow.setAttribute('class', 'row');
  $masterDiv.appendChild($profileRow);

  $imageColumn.setAttribute('class', 'column-half');
  $profileRow.appendChild($imageColumn);

  $image.setAttribute('src', data.profile.avatarUrl);
  $image.setAttribute('alt', 'preview');
  $imageColumn.appendChild($image);

  $userNameColumn.setAttribute('class', 'column-half wrapper-profile-info');
  $profileRow.appendChild($userNameColumn);

  $userNameWrapper.setAttribute('class', 'profile-info user-name');
  $userNameColumn.appendChild($userNameWrapper);

  $paddingIcon.setAttribute('class', 'padding');
  $userNameWrapper.appendChild($paddingIcon);

  $userNameIcon.setAttribute('class', 'fas fa-user');
  $paddingIcon.appendChild($userNameIcon);

  $userName.textContent = data.profile.username;
  $userNameWrapper.appendChild($userName);

  $userLocationWrapper.setAttribute('class', 'profile-info user-location');
  $userNameColumn.appendChild($userLocationWrapper);

  $paddingLocationIcon.setAttribute('class', 'padding');
  $userLocationWrapper.appendChild($paddingLocationIcon);

  $userLocationIcon.setAttribute('class', 'fas fa-map-marker-alt');
  $paddingLocationIcon.appendChild($userLocationIcon);

  $userLocation.textContent = data.profile.location;
  $userLocationWrapper.appendChild($userLocation);

  $userBioWrapper.setAttribute('class', 'profile-info user-bio');
  $userNameColumn.appendChild($userBioWrapper);

  $userBioText.textContent = data.profile.bio;
  $userBioWrapper.appendChild($userBioText);

  $profileEditLink.setAttribute('href', '#');
  $profileEditLink.setAttribute('class', 'linkStyle');
  $profileEditLink.setAttribute('data-view', 'edit-profile');
  $profileEditLink.textContent = 'EDIT';

  $userNameColumn.appendChild($profileEditLink);

  return $masterDiv;
}

function swapWindow(e) {
  if (e === 'edit-profile') {
    $editProfileSection.classList.remove('hidden');
    $profile.classList.add('hidden');
    $entries.classList.add('hidden');
    $createEntries.classList.add('hidden');
    $modalWindow.classList.add('hidden');
    $userForm.username.value = data.profile.username;
    $userForm.fullName.value = data.profile.fullName;
    $userForm.location.value = data.profile.location;
    $userForm.avatarUrl.value = data.profile.avatarUrl;
    $userForm.bio.value = data.profile.bio;
    if (data.profile.avatarUrl.length !== 0) {
      $image.setAttribute('src', data.profile.avatarUrl);
    } else if (data.profile.avatarUrl.length === 0) {
      $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    }
    data.view = 'edit-profile';

  } else if (e === 'profile') {
    $profile.textContent = '';
    $editProfileSection.classList.add('hidden');
    $profile.classList.remove('hidden');
    $entries.classList.add('hidden');
    $createEntries.classList.add('hidden');
    $modalWindow.classList.add('hidden');
    $search.classList.add('hidden');
    data.view = 'profile';
    renderElements();
  } else if (e === 'entries') {
    $editProfileSection.classList.add('hidden');
    $profile.classList.add('hidden');
    $entries.classList.remove('hidden');
    $createEntries.classList.add('hidden');
    $modalWindow.classList.add('hidden');
    $search.classList.remove('hidden');
    data.view = 'entries';
  } else if (e === 'create-entry') {
    $editProfileSection.classList.add('hidden');
    $profile.classList.add('hidden');
    $entries.classList.add('hidden');
    $createEntries.classList.add('hidden');
    $createEntries.classList.remove('hidden');
    $modalWindow.classList.add('hidden');
    $search.classList.add('hidden');
    data.view = 'create-entry';
  }

}

function userEntryList(info, index) {
  var $entryListing = document.createElement('li');
  var $entryColumnWrapper = document.createElement('div');
  var $entryImage = document.createElement('img');
  var $informationColumnWrapper = document.createElement('div');
  var $entryInfoHeader = document.createElement('h3');
  var $entryNotes = document.createElement('p');
  var $editBtn = document.createElement('input');

  $entryListing.setAttribute('data-view', index);
  $entryColumnWrapper.setAttribute('class', 'column-half');
  $entryListing.appendChild($entryColumnWrapper);

  $entryImage.setAttribute('src', info.photoUrl);
  $entryImage.setAttribute('data-view', 'user-option');
  $entryImage.setAttribute('alt', 'entry-pictures');
  $entryColumnWrapper.appendChild($entryImage);

  $informationColumnWrapper.setAttribute('class', 'column-half');
  $entryListing.appendChild($informationColumnWrapper);

  $entryInfoHeader.textContent = info.title;
  $informationColumnWrapper.appendChild($entryInfoHeader);

  $entryNotes.textContent = info.note;
  $informationColumnWrapper.appendChild($entryNotes);

  $editBtn.setAttribute('class', 'entry');
  $editBtn.setAttribute('type', 'button');
  $editBtn.setAttribute('value', 'Options');
  $editBtn.setAttribute('class', 'optionBtn');
  $editBtn.setAttribute('data-view', index);

  $informationColumnWrapper.appendChild($editBtn);

  return $entryListing;

}

document.addEventListener('DOMContentLoaded', function (e) {
  if (data.profile.username === '') {
    swapWindow('edit-profile');
  } else if (data.profile.username.length !== 0 && data.view !== 'entries') {
    swapWindow('profile');
  } else if (data.view === 'entries') {
    swapWindow('entries');
  }

  for (var i = 0; i < data.entries.length; i++) {
    result = data.entries[i];
    $entryList.prepend(userEntryList(result, i));
  }

});

document.addEventListener('click', function (e) {
  var dataView = e.target.getAttribute('data-view');

  if (dataView === 'edit-profile') {
    swapWindow(dataView);
  } else if (dataView === 'profile' && data.profile.username.length !== 0) {
    swapWindow(dataView);
  } else if (dataView === 'entries' && formInputFilled() === true) {
    swapWindow(dataView);
  } else if (dataView === 'create-entry' && formInputFilled() === true) {
    swapWindow(dataView);
  }

});

$magnifying.addEventListener('keyup', function (e) {
  $entryList.textContent = '';
  if (e.target.value !== '') {
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].title.toUpperCase() === e.target.value.toUpperCase()) {
        $entryList.textContent = '';
        $entryList.prepend(userEntryList(data.entries[i], i));
      }
    }
  } else if (!e.target.value) {
    for (var j = 0; j < data.entries.length; j++) {
      $entryList.prepend(userEntryList(data.entries[j], j));
    }
  }
});

function formInputFilled() {
  if (data.profile.avatarUrl.length !== 0 && data.profile.bio.length !== 0 && data.profile.fullName.length !== 0 && data.profile.location.length !== 0 && data.profile.username.length !== 0) {
    return true;
  } else {
    return false;
  }
}

document.addEventListener('click', function (e) {
  var convertedNumber = parseFloat(e.target.getAttribute('data-view'));
  $deleteEntryData.setAttribute('data-view', e.target.getAttribute('data-view'));
  $editEntryData.setAttribute('data-view', e.target.getAttribute('data-view'));

  if (Number.isNaN(convertedNumber) === false) {
    $modalAnimation.classList.add('animation-modal');
    $modalWindow.classList.remove('hidden');
    $entryForm.photoUrl.value = data.entries[convertedNumber].photoUrl;
    $entryForm.title.value = data.entries[convertedNumber].title;
    $entryForm.notes.value = data.entries[convertedNumber].note;
    $createEntryImage.setAttribute('src', data.entries[convertedNumber].photoUrl);

  }

  if (e.target.className === 'editEntry') {
    var convert = parseFloat(e.target.getAttribute('data-view'));
    data.entries.splice(convert, 1);
    swapWindow('create-entry');

  }

  if (e.target.className === 'deleteEntry') {
    var convert = parseFloat(e.target.getAttribute('data-view'));
    data.entries.splice(convert, 1);
    $entryList.textContent = '';
    for (var i = data.entries.length - 1; i >= 0; i--) {
      var result = data.entries[i];
      $entryList.append(userEntryList(result, i));
    }
    location.reload();
    $modalWindow.classList.add('hidden');
  }
});
