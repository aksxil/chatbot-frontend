(function () {
  // Prevent double initialization
  if (window.__VetChatbotLoaded__) return;
  window.__VetChatbotLoaded__ = true;

  // Read optional config
  const config = window.VetChatbotConfig || {};

  // Create floating button
  const button = document.createElement("div");
  button.innerHTML = "🐾 Vet Chat";
  Object.assign(button.style, {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    background: "#2563eb",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "24px",
    cursor: "pointer",
    fontFamily: "Arial, sans-serif",
    zIndex: "9999",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
  });

  document.body.appendChild(button);

  // Create iframe
  const iframe = document.createElement("iframe");
  iframe.src = "http://localhost:5173"; // ✅ Correct URL
  Object.assign(iframe.style, {
    position: "fixed",
    bottom: "80px",
    right: "20px",
    width: "360px",
    height: "500px",
    border: "none",
    borderRadius: "12px",
    display: "none",
    zIndex: "9999",
    boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
    background: "#fff"
  });

  document.body.appendChild(iframe);

  // Toggle chatbot
  button.addEventListener("click", () => {
    iframe.style.display =
      iframe.style.display === "none" ? "block" : "none";
  });

  // Send context to iframe once loaded
  iframe.addEventListener("load", () => {
    iframe.contentWindow.postMessage(
      {
        type: "INIT_CONTEXT",
        payload: config
      },
      "*"
    );
  });

})();
