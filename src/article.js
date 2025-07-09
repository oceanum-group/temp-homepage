// article.js
import { getFirestore, doc, getDoc } from 
  "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";
import { app } from "./firebase-init.js";

const db   = getFirestore(app);
const container = document.getElementById("article-container");

async function renderArticle() {
  const params = new URLSearchParams(window.location.search);
  const id     = params.get("id");
  if (!id) {
    container.innerHTML = "<p>No article ID provided.</p>";
    return;
  }

  // fetch article from firebase using id from url
  try {
    const snap = await getDoc(doc(db, "articles", id));
    if (!snap.exists()) {
      container.innerHTML = "<p>Article not found.</p>";
      return;
    }
    const data = snap.data();

    // --- Title ---
    const h1 = document.createElement("h1");
    h1.textContent = data.title || "Untitled Article";
    container.appendChild(h1);

    // --- Date ---
    if (data.createdTime?.toDate) {
      const p = document.createElement("p");
      p.className = "text-muted";
      p.textContent = data.createdTime
        .toDate()
        .toLocaleDateString("en-US", {
          year: "numeric", month: "short", day: "numeric"
        });
      container.appendChild(p);
    }

    // --- Thumbnail ---
    if (data.thumbnailUrl) {
      const img = document.createElement("img");
      img.src       = data.thumbnailUrl;
      img.alt       = data.title;
      // responsive + centered
      img.className = "img-fluid mb-4 d-block mx-auto";
      // never exceed 800px wide
      img.style.maxWidth = "800px";
      img.style.height   = "auto";
      container.appendChild(img);
    }

    // --- Content ---
    if (data.isCustomArticle) {
      // 1) Grab the raw string (which currently has literal “\n”)
      let md = data.customContent || "";

      // 2) Turn all the two-character “\” + “n” into real newlines
      md = md.replace(/\\n/g, "\n");

      // 3) Parse + sanitize
      const rawHtml  = marked.parse(md);
      const safeHtml = DOMPurify.sanitize(rawHtml);

      // 4) Inject
      const div = document.createElement("div");
      div.className = "markdown-body mb-5"; 
      div.innerHTML = safeHtml;
      container.appendChild(div);
    } else if (data.articleUrl) {
      // External link fallback
      const p = document.createElement("p");
      p.innerHTML = `External article: 
        <a href="${data.articleUrl}" target="_blank" rel="noopener noreferrer">
          Read it here
        </a>`;
      container.appendChild(p);
    } else {
      container.innerHTML += "<p>No content available.</p>";
    }

  } catch (err) {
    console.error(err);
    container.innerHTML = "<p>Error loading article.</p>";
  }
}

renderArticle();
