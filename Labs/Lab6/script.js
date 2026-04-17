
let likes = 0;
let dislikes = 0;
let comments = [];

const likeBtn = document.getElementById("likeBtn");
const dislikeBtn = document.getElementById("dislikeBtn");
const likeCount = document.getElementById("likeCount");
const dislikeCount = document.getElementById("dislikeCount");

const commentInput = document.getElementById("commentInput");
const submitComment = document.getElementById("submitComment");
const commentsList = document.getElementById("commentsList");
const clearBtn = document.getElementById("clearBtn");



function setCookie(name, value) {
  document.cookie = name + "=" + value + "; path=/";
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let c of cookies) {
    let [key, val] = c.split("=");
    if (key === name) return val;
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}



function updateUI() {
  likeCount.textContent = likes;
  dislikeCount.textContent = dislikes;

  commentsList.innerHTML = "";
  comments.forEach(c => {
    const li = document.createElement("li");
    li.textContent = c;
    commentsList.appendChild(li);
  });
}



likeBtn.addEventListener("click", () => {
  if (getCookie("voted")) {
    alert("You already voted!");
    return;
  }

  likes++;
  setCookie("voted", "like");
  setCookie("likes", likes);

  updateUI();
});



dislikeBtn.addEventListener("click", () => {
  if (getCookie("voted")) {
    alert("You already voted!");
    return;
  }

  dislikes++;
  setCookie("voted", "dislike");
  setCookie("dislikes", dislikes);

  updateUI();
});


submitComment.addEventListener("click", () => {
  if (getCookie("commented")) {
    alert("You already commented!");
    return;
  }

  const text = commentInput.value;

  if (text === "") return;

  comments.push(text);

  setCookie("comments", JSON.stringify(comments));
  setCookie("commented", "yes");

  commentInput.value = "";
  updateUI();
});



clearBtn.addEventListener("click", () => {
  deleteCookie("voted");
  deleteCookie("commented");
  deleteCookie("comments");

  likes = 0;
  dislikes = 0;
  comments = [];

  updateUI();
});



window.onload = () => {
  const savedLikes = getCookie("likes");
  const savedDislikes = getCookie("dislikes");
  const savedComments = getCookie("comments");

  if (savedLikes) likes = parseInt(savedLikes);
  if (savedDislikes) dislikes = parseInt(savedDislikes);
  if (savedComments) comments = JSON.parse(savedComments);

  updateUI();
};