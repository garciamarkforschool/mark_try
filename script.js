const worlds = [
    { name: "Mercury", days: 88, icon: "🪨" },
    { name: "Venus", days: 225, icon: "🟠" },
    { name: "Earth", days: 365, icon: "🌍" },
    { name: "Mars", days: 687, icon: "🔴" },
    { name: "Jupiter", days: 4380, icon: "🟤" },
    { name: "Saturn", days: 10767.5, icon: "🪐" },
    { name: "Uranus", days: 30660, icon: "🔵" },
    { name: "Neptune", days: 60152, icon: "🔷" },
    { name: "Pluto", days: 90520, icon: "❄️" }
];

function calculateAge() {
    const birthdayInput = document.getElementById("birthday").value;
    const selectedPlanet = document.getElementById("planet").value;
    const results = document.getElementById("results");
    const message = document.getElementById("message");

    results.innerHTML = "";
    message.textContent = "";

    if (!birthdayInput) {
        message.textContent = "Please enter your birthday first!";
        return;
    }

    const parts = birthdayInput.split("-").map(Number);
    const birthday = Date.UTC(parts[0], parts[1] - 1, parts[2]);

    const today = new Date();
    const todayUTC = Date.UTC(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    if (birthday > todayUTC) {
        message.textContent = "Your birthday cannot be in the future!";
        return;
    }

    const earthDaysLived = Math.floor(
        (todayUTC - birthday) / 86400000
    );

    let selectedWorlds;

    if (selectedPlanet === "all") {
        selectedWorlds = worlds;
    } else {
        selectedWorlds = worlds.filter(
            world => world.name === selectedPlanet
        );
    }

    message.textContent =
        "You have lived " + earthDaysLived.toLocaleString() +
        " days on Earth!";

    selectedWorlds.forEach(world => {
        const age = earthDaysLived / world.days;

        const card = document.createElement("div");
        card.className = "result-card";

        const heading = document.createElement("h3");
        heading.textContent = world.icon + " " + world.name;

        const ageText = document.createElement("p");
        ageText.className = "age";
        ageText.textContent = age.toFixed(2) + " years";

        const yearText = document.createElement("p");
        yearText.textContent =
            "1 year = " + world.days.toLocaleString() +
            " Earth days";

        card.appendChild(heading);
        card.appendChild(ageText);
        card.appendChild(yearText);

        results.appendChild(card);
    });
}