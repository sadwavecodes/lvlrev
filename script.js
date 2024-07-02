
// Function to open the modal
function openModal(content) {
  document.getElementById('modal-body').innerHTML = content;
  document.getElementById('myModal').style.display = "block";
}

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  history.pushState(null, null, '/'); // Reset URL
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    history.pushState(null, null, '/'); // Reset URL
  }
}

// Function to handle link clicks
document.querySelectorAll('.level-link a').forEach(function(link) {
  link.addEventListener('click', function(event) {
    event.preventDefault();
    var levelItem = this.closest('.level-item');
    var levelName = levelItem.getAttribute('data-name');
    var levelId = levelItem.getAttribute('data-id');
    var levelMessage = levelItem.getAttribute('data-message');
    var content = `<h2>${levelName}</h2><p>ID: ${levelId}</p><p>${levelMessage}</p>`;
    openModal(content);
    history.pushState(null, null, `/${levelName}`);
  });
});

// Check if URL matches a level link and open the modal if it does
window.onload = function() {
  var path = window.location.pathname.substring(1); // Remove leading "/"
  if (path) {
    document.querySelectorAll('.level-item').forEach(function(item) {
      if (item.getAttribute('data-name').toLowerCase() === path.toLowerCase()) {
        var levelName = item.getAttribute('data-name');
        var levelId = item.getAttribute('data-id');
        var levelMessage = item.getAttribute('data-message');
        var content = `<h2>${levelName}</h2><p>ID: ${levelId}</p><p>${levelMessage}</p>`;
        openModal(content);
      }
    });
  }
}

// Search functionality
document.getElementById('search-input').addEventListener('input', function() {
  var input = this.value.toLowerCase();
  var levelLists = document.querySelectorAll('.level-list');
  
  levelLists.forEach(function(list) {
    var levelItems = list.querySelectorAll('.level-item');
    var hasVisibleItems = false;

    levelItems.forEach(function(item) {
      var name = item.getAttribute('data-name').toLowerCase();
      var id = item.getAttribute('data-id').toLowerCase();
      
      if (name.includes(input) || id.includes(input)) {
        item.style.display = 'flex';
        hasVisibleItems = true;
      } else {
        item.style.display = 'none';
      }
    });

    if (hasVisibleItems) {
      list.style.display = 'block';
    } else {
      list.style.display = 'none';
    }
  });
});
