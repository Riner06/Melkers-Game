let searchText = document.getElementById("searchInput");
searchText.onkeydown = async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    let searchTerm = searchText.value; // Hämtar det som står i sökrutan
    console.log("Kommer söka efter", searchTerm);

    let results = await search(searchTerm);

    renderFriendsList(results);
  }
};

async function search(searchString) {
  var url = `http://127.0.0.1:5000/users?query=${searchString}`;
  console.log("Den URL vi kommer anropa: ", url);

  let response = await fetch(url);

  let json = await response.json();
  return json;
}

function renderFriendsList(results) {
  let detailsDiv = document.getElementById("userDetails");
  detailsDiv.innerHTML = ``;

  let listDiv = document.getElementById("foundFriends");
  listDiv.innerHTML = ``;

  for (let person of results) {
    let htmlContent = `<div class="name-email-container">
    <ul>
    <li>Name: ${person.name}</li>
    <li>Email:<a href="mailto:${person.email}">${person.email}</a></li>
    <li>
      <button id="viewMoreButton" data-name="${person.name}">Visa mer</button>
    </li> 
    </ul>
    </div>`;

    listDiv.insertAdjacentHTML("beforeend", htmlContent);
  }

  document.querySelectorAll("#viewMoreButton").forEach((button) => {
    button.onmousedown = async function (event) {
      event.preventDefault();
      let name = this.getAttribute("data-name"); // Get the name from the data attribute
      let response = await getUserDetails(name);
      renderFriendDetails(response);
    };
  });
}

async function showUserDetails() {
  let response = await getUserDetails();
  renderFriendDetails(response);
}

async function getUserDetails(name) {
  var url = `http://127.0.0.1:5000/users/${name}`;
  console.log("Den URL vi kommer anropa: ", url);

  let response = await fetch(url);

  let json = await response.json();
  return json;
}

function renderFriendDetails(user) {
  let listDiv = document.getElementById("foundFriends");
  listDiv.innerHTML = ``;

  let detailsDiv = document.getElementById("userDetails");
  let htmlContent = `<div class="name-email-container">
    <p>
      Name: ${user.name}<br/>
      Email: <a href="mailto:${user.email}">${user.email}</a><br/>
      Age: ${user.age}</li><br/>
      Favorite Color: ${user.favoriteColor}<br/>
    </p>
    </div>`;
  detailsDiv.innerHTML = ``;
  detailsDiv.insertAdjacentHTML("beforeend", htmlContent);
}

function retractProjectsList(element) {
  let target = document.getElementById("popdown");
  target.classList.add("popdown-hide");

  element.innerHTML = "Visa mer";
  element.setAttribute("onclick", "expandProjectsList(this)");
}
