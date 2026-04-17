const ACCESS_KEY = "7oS9USE0pSaJthm3fdCWXWHTE55PsOkjDYIQjq6yPHg";

const searchInput = document.getElementById("searchInput");
const gallery = document.getElementById("gallery");



function displayImages(images) {
  gallery.innerHTML = "";

  images.forEach(img => {
    const image = document.createElement("img");
    image.src = img.urls.small;
    gallery.appendChild(image);
  });
}



document.getElementById("xhrBtn").addEventListener("click", () => {
  const query = searchInput.value;

  const xhr = new XMLHttpRequest();
  xhr.open("GET", `https://api.unsplash.com/search/photos?query=${query}`);
  xhr.setRequestHeader("Authorization", "Client-ID " + ACCESS_KEY);

  xhr.onload = function () {
    const data = JSON.parse(xhr.responseText);
    displayImages(data.results);
  };

  xhr.send();
});


document.getElementById("fetchBtn").addEventListener("click", () => {
  const query = searchInput.value;

  fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
    headers: {
      Authorization: "Client-ID " + ACCESS_KEY
    }
  })
    .then(res => res.json())
    .then(data => displayImages(data.results));
});



document.getElementById("asyncBtn").addEventListener("click", async () => {
  const query = searchInput.value;

  const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}`, {
    headers: {
      Authorization: "Client-ID " + ACCESS_KEY
    }
  });

  const data = await res.json();
  displayImages(data.results);
});