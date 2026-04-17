
const players = [
  { name: "Joel Embiid", team: "PHI", points: 33, rebounds: 10.8, assists: 5.7 },
  { name: "Jalen Brunson", team: "NYK", points: 32.4, rebounds: 3.3, assists: 7.5 },
  { name: "Shai Gilgeous-Alexander", team: "OKC", points: 30.2, rebounds: 7.2, assists: 6.4 },
  { name: "Tyrese Maxey", team: "PHI", points: 29.8, rebounds: 5.2, assists: 6.8 },
  { name: "Donovan Mitchell", team: "CLE", points: 29.6, rebounds: 5.4, assists: 4.7 }
];

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const teamFilter = document.getElementById("teamFilter");
const darkModeBtn = document.getElementById("darkModeBtn");
const pointsHeader = document.getElementById("pointsHeader");

let currentData = [...players];
let sortDesc = true;


function displayPlayers(data) {
  tableBody.innerHTML = "";

  data.forEach(player => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${player.name}</td>
      <td>${player.team}</td>
      <td>${player.points}</td>
      <td>${player.rebounds}</td>
      <td>${player.assists}</td>
    `;

    tableBody.appendChild(row);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();

  const filtered = players.filter(p =>
    p.name.toLowerCase().includes(value)
  );

  currentData = filtered;
  displayPlayers(filtered);
});


teamFilter.addEventListener("change", () => {
  const value = teamFilter.value;

  if (value === "all") {
    currentData = [...players];
  } else {
    currentData = players.filter(p => p.team === value);
  }

  displayPlayers(currentData);
});


darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

pointsHeader.addEventListener("click", () => {
  const sorted = [...currentData].sort((a, b) => {
    return sortDesc ? b.points - a.points : a.points - b.points;
  });

  sortDesc = !sortDesc;
  displayPlayers(sorted);
});


displayPlayers(players);