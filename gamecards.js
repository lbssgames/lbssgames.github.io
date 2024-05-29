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

// Create and append CSS styles dynamically
var styleElement = document.createElement("style");
document.head.appendChild(styleElement);

var styleSheet = styleElement.sheet;
styleSheet.insertRule(`
    /* CSS styles for rounded button */
    .game-button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #3498db;
        color: #fff;
        border: none;
        border-radius: 25px;
        font-size: 16px;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .game-button:hover {
        background-color: #2980b9;
    }

    /* Other CSS styles */
    .game-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 10px;
    }

    .game-icon {
        width: 100px;
        height: 100px;
    }

    .game-title {
        margin-top: 10px;
    }

    #game-grid {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
`, 0);

createGameCards();
