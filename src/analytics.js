import { app, analytics } from './firebase-init.js';
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

// Log clicks on all links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      console.log("link click"); 
      logEvent(analytics, 'link_click', {
        link_text: link.textContent.trim(),
        href: link.href
      });
    });
  });
});
