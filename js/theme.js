(function () {
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function applyThemeExtras(theme) {
    document.documentElement.style.colorScheme = theme;

    var darkSheet = document.getElementById("syntax-dark");
    var lightSheet = document.getElementById("syntax-light");
    if (darkSheet && lightSheet) {
      darkSheet.disabled = theme !== "dark";
      lightSheet.disabled = theme === "dark";
    }

    var iframe = document.querySelector("iframe.utterances-frame");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "set-theme", theme: theme === "dark" ? "github-dark" : "github-light" },
        "https://utteranc.es"
      );
    }
  }

  applyThemeExtras(currentTheme());

  new MutationObserver(function () {
    applyThemeExtras(currentTheme());
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });
})();
