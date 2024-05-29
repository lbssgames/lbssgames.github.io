// Load data from external JSON file
function loadJSON(callback) {
  var xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open('GET', 'games.json', true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      callback(xhr.responseText);
    }
  };
  xhr.send(null);
}

function createGameCards() {
    loadJSON(function (response) {
        var games = JSON.parse(response);

        var gameGrid = document.getElementById("game-grid");
        games.forEach(function (game) {
            var gameCard = document.createElement("div");
            gameCard.classList.add("game-card");

            var icon = document.createElement("img");
            icon.classList.add("game-icon");
            icon.src = game.icon;
            icon.addEventListener("click", function () {
                window.location.href = game.link;
            });

            var title = document.createElement("h2");
            title.classList.add("game-title");
            title.textContent = game.name;

            var playButton = document.createElement("button");
            playButton.classList.add("game-button");
            playButton.textContent = "Play now";
            playButton.addEventListener("click", function () {
                window.location.href = game.link;
            });

            gameCard.appendChild(icon);
            gameCard.appendChild(title);
            gameCard.appendChild(playButton);
            gameGrid.appendChild(gameCard);
        });
    });
}

createGameCards();
