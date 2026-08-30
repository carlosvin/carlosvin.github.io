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

    var toggle = document.querySelector("input[data-toggle-theme]");
    if (toggle) {
      toggle.checked = theme === "dark";
    }

    var iframe = document.querySelector("iframe.utterances-frame");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "set-theme", theme: theme === "dark" ? "github-dark" : "github-light" },
        "https://utteranc.es"
      );
    }
  }

  function fallbackCopy(text, button) {
    try {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      button.textContent = "Copied!";
      button.classList.add("is-copied");
      button.setAttribute("aria-label", "Code copied");
      setTimeout(function () {
        button.textContent = "Copy";
        button.classList.remove("is-copied");
        button.setAttribute("aria-label", "Copy code");
      }, 2000);
    } catch (err) {
      button.textContent = "Copy";
    }
  }

  function initCodeCopy() {
    var codeBlocks = document.querySelectorAll("pre");
    codeBlocks.forEach(function (pre) {
      if (pre.querySelector(".copy-code-btn")) {
        return;
      }
      var button = document.createElement("button");
      button.className = "copy-code-btn";
      button.type = "button";
      button.setAttribute("aria-label", "Copy code");
      button.textContent = "Copy";

      button.addEventListener("click", function () {
        var code = pre.querySelector("code");
        var text = (code ? code.innerText : pre.innerText).trimEnd();
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            button.textContent = "Copied!";
            button.classList.add("is-copied");
            button.setAttribute("aria-label", "Code copied");
            setTimeout(function () {
              button.textContent = "Copy";
              button.classList.remove("is-copied");
              button.setAttribute("aria-label", "Copy code");
            }, 2000);
          }).catch(function () {
            fallbackCopy(text, button);
          });
        } else {
          fallbackCopy(text, button);
        }
      });

      pre.appendChild(button);
    });
  }

  applyThemeExtras(currentTheme());

  new MutationObserver(function () {
    applyThemeExtras(currentTheme());
  }).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"]
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      applyThemeExtras(currentTheme());
      initCodeCopy();
    });
  } else {
    applyThemeExtras(currentTheme());
    initCodeCopy();
  }
})();
