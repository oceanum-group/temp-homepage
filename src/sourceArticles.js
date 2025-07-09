import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { app } from './firebase-init.js';

const db = getFirestore(app);

const filtersContainer  = document.getElementById("filters-container");
const articlesContainer = document.getElementById("articles-container");

let allArticles    = [];
let selectedTopics = new Set();

async function loadArticles() {
  // 1) fetch sorted data
  const q = query(collection(db, "articles"), orderBy("createdTime", "desc"));
  const snap = await getDocs(q);

  allArticles = snap.docs.map(doc => {
    const d = doc.data();
    return {
      id: doc.id,
      title: d.title || 'Untitled',
      url: d.articleUrl || null,
      thumbnail: d.thumbnailUrl || '',
      createdTime: d.createdTime,
      topics: Array.isArray(d.topics) ? d.topics : [],
      isCustomArticle: d.isCustomArticle === true,
      customContent: typeof d.customContent === 'string' ? d.customContent : ''
    };
  });

  populateFilters();
  renderArticles(allArticles);
}

function populateFilters() {
  // collect unique topics
  const uniq = new Set();
  allArticles.forEach(a => a.topics.forEach(t => uniq.add(t)));

  filtersContainer.innerHTML = ""; // clear
  uniq.forEach(topic => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btn-outline-secondary me-2 mb-2";
    btn.textContent = topic;
    btn.dataset.topic   = topic;
    btn.addEventListener("click", () => {
      // toggle selection
      if (selectedTopics.has(topic)) {
        selectedTopics.delete(topic);
        btn.classList.remove("active");
      } else {
        selectedTopics.add(topic);
        btn.classList.add("active");
      }
      // re-render
      const filtered = selectedTopics.size === 0
        ? allArticles
        : allArticles.filter(a => a.topics.some(t => selectedTopics.has(t)));
      renderArticles(filtered);
    });
    filtersContainer.appendChild(btn);
  });
}

function renderArticles(list) {
  articlesContainer.innerHTML = ""; // clear
  list.forEach(data => {
    const col  = document.createElement("div");
    col.className = "col-md-4 mb-4";

    const card = document.createElement("div");
    card.className = "card h-100";

    const img  = document.createElement("img");
    img.className = "card-img-top";
    img.src   = data.thumbnail;
    img.alt   = data.title;

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column";

    // title
    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = data.title;

    // date
    const date = document.createElement("p");
    date.className = "card-subtitle mb-2 text-muted";
    if (data.createdTime?.toDate) {
      date.textContent = "Published: " +
        data.createdTime.toDate().toLocaleDateString("en-US", {
          year: "numeric", month: "short", day: "numeric"
        });
    }

    // assemble title and date
    body.append(title, date);

    // topics line (only if topics exist)
    if (Array.isArray(data.topics) && data.topics.length > 0) {
      const topicsP = document.createElement("p");
      topicsP.className = "card-text text-muted mb-2";
      const strong = document.createElement("strong");
      strong.textContent = "Topics: ";
      topicsP.append(strong, document.createTextNode(data.topics.join(", ")));
      body.appendChild(topicsP);
    }

    // link or internal navigation
    const link = document.createElement("a");
    link.className = "btn btn-cta mt-auto";
    link.textContent = data.isCustomArticle ? "Read Full Article" : "Read Article";

    if (data.isCustomArticle) {
      // internal article page
      link.href   = `article.html?id=${data.id}`;
      link.target = "_self";
    } else if (data.url) {
      // external link safety
      link.href   = data.url;
      link.target = "_blank";
      link.rel    = "noopener noreferrer";
    } else {
      // no valid destination
      link.href = "#";
      link.classList.add("disabled");
      link.setAttribute("aria-disabled", "true");
    }

    body.appendChild(link);
    card.append(img, body);
    col.appendChild(card);
    articlesContainer.appendChild(col);
  });
}

loadArticles();

// fix hover bug on mobile
document.addEventListener("touchstart", () => {}, {passive: true});
