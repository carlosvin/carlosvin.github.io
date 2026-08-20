function debounce(func, wait) {
  var timeout;

  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);

    timeout = setTimeout(function () {
      timeout = null;
      func.apply(context, args);
    }, wait);
  };
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Taken from mdbook: score a sliding window of words so the teaser
// centers on search-term matches (stemmer-aware).
function makeTeaser(body, terms) {
  var TERM_WEIGHT = 40;
  var NORMAL_WORD_WEIGHT = 2;
  var FIRST_WORD_WEIGHT = 8;
  var TEASER_MAX_WORDS = 30;

  var stemmedTerms = terms.map(function (w) {
    return elasticlunr.stemmer(w.toLowerCase());
  });
  var termFound = false;
  var index = 0;
  var weighted = [];

  var sentences = body.toLowerCase().split(". ");

  for (var i = 0; i < sentences.length; i++) {
    var words = sentences[i].split(" ");
    var value = FIRST_WORD_WEIGHT;

    for (var j = 0; j < words.length; j++) {
      var word = words[j];

      if (word.length > 0) {
        var stemmedWord = elasticlunr.stemmer(word);
        for (var k = 0; k < stemmedTerms.length; k++) {
          if (stemmedWord.startsWith(stemmedTerms[k])) {
            value = TERM_WEIGHT;
            termFound = true;
            break;
          }
        }
        weighted.push([word, value, index]);
        value = NORMAL_WORD_WEIGHT;
      }

      index += word.length;
      index += 1;
    }

    index += 1;
  }

  if (weighted.length === 0) {
    return escapeHtml(body);
  }

  var windowWeights = [];
  var windowSize = Math.min(weighted.length, TEASER_MAX_WORDS);
  var curSum = 0;
  for (var i = 0; i < windowSize; i++) {
    curSum += weighted[i][1];
  }
  windowWeights.push(curSum);

  for (var i = 0; i < weighted.length - windowSize; i++) {
    curSum -= weighted[i][1];
    curSum += weighted[i + windowSize][1];
    windowWeights.push(curSum);
  }

  var maxSumIndex = 0;
  if (termFound) {
    var maxFound = 0;
    for (var i = windowWeights.length - 1; i >= 0; i--) {
      if (windowWeights[i] > maxFound) {
        maxFound = windowWeights[i];
        maxSumIndex = i;
      }
    }
  }

  var teaser = [];
  var startIndex = weighted[maxSumIndex][2];
  for (var i = maxSumIndex; i < maxSumIndex + windowSize; i++) {
    var word = weighted[i];
    if (startIndex < word[2]) {
      teaser.push(escapeHtml(body.substring(startIndex, word[2])));
      startIndex = word[2];
    }

    if (word[1] === TERM_WEIGHT) {
      teaser.push("<b>");
    }
    startIndex = word[2] + word[0].length;
    teaser.push(escapeHtml(body.substring(word[2], startIndex)));

    if (word[1] === TERM_WEIGHT) {
      teaser.push("</b>");
    }
  }
  teaser.push("…");
  return teaser.join("");
}

function formatSearchResultItem(item, terms, id) {
  return '<a id="' + id + '" href="' + escapeHtml(item.ref) + '"><strong>' +
    escapeHtml(item.doc.title) + "</strong><p>" + makeTeaser(item.doc.body, terms) + "</p></a>";
}

function initSearch() {
  var searchScript = document.querySelector("script[data-search-index]");
  var $searchInput = document.getElementById("search");
  var $searchResults = document.querySelector(".search-results");
  var $searchResultsItems = document.querySelector(".search-results__items");
  var $searchStatus = document.querySelector(".search-results__status");
  if (!$searchInput || !$searchResults || !$searchResultsItems) {
    return;
  }

  var indexUrl = (searchScript && searchScript.dataset.searchIndex) || "/search_index.en.json";
  var MAX_ITEMS = 10;
  var options = {
    bool: "AND",
    fields: {
      title: { boost: 2 },
      body: { boost: 1 },
    }
  };
  var currentTerm = "";
  var indexPromise;
  var activeIndex = -1;
  var resultCount = 0;

  var initIndex = function () {
    if (!indexPromise) {
      indexPromise = fetch(indexUrl).then(function (response) {
        if (!response.ok) {
          throw new Error("Search index request failed");
        }
        return response.json().then(function (json) {
          return elasticlunr.Index.load(json);
        });
      });
    }
    return indexPromise;
  };

  function setExpanded(open) {
    $searchInput.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) {
      $searchResults.hidden = false;
    } else {
      $searchResults.hidden = true;
      $searchInput.removeAttribute("aria-activedescendant");
      activeIndex = -1;
    }
  }

  function setActive(index) {
    var items = $searchResultsItems.querySelectorAll("li");
    activeIndex = index;
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("is-active", i === index);
    }
    if (index >= 0 && items[index]) {
      var link = items[index].querySelector("a");
      if (link && link.id) {
        $searchInput.setAttribute("aria-activedescendant", link.id);
      }
      items[index].scrollIntoView({ block: "nearest" });
    } else {
      $searchInput.removeAttribute("aria-activedescendant");
    }
  }

  function renderStatus(text) {
    if ($searchStatus) {
      $searchStatus.textContent = text;
    }
  }

  function runSearch() {
    var term = $searchInput.value.trim();
    if (term === currentTerm && term !== "") {
      setExpanded(true);
      return;
    }
    currentTerm = term;
    $searchResultsItems.innerHTML = "";
    resultCount = 0;
    activeIndex = -1;

    if (term === "") {
      renderStatus("");
      setExpanded(false);
      return;
    }

    renderStatus("Searching…");
    setExpanded(true);

    initIndex().then(function (idx) {
      if (term !== currentTerm) {
        return;
      }
      var results = idx.search(term, options);
      $searchResultsItems.innerHTML = "";
      resultCount = results.length;

      if (results.length === 0) {
        renderStatus("No matching posts");
        return;
      }

      var shown = Math.min(results.length, MAX_ITEMS);
      renderStatus(results.length === 1 ? "1 post" : shown + " of " + results.length + " posts");

      var fragment = document.createDocumentFragment();
      var terms = term.split(" ");
      for (var i = 0; i < shown; i++) {
        var item = document.createElement("li");
        item.setAttribute("role", "option");
        item.innerHTML = formatSearchResultItem(results[i], terms, "search-result-" + i);
        fragment.appendChild(item);
      }
      $searchResultsItems.appendChild(fragment);
    }).catch(function () {
      if (term !== currentTerm) {
        return;
      }
      renderStatus("Search is unavailable");
    });
  }

  $searchInput.addEventListener("focus", initIndex, { once: true });
  $searchInput.addEventListener("input", debounce(runSearch, 150));

  $searchInput.addEventListener("focus", function () {
    if ($searchInput.value.trim() !== "") {
      runSearch();
    }
  });

  $searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (!$searchResults.hidden) {
        e.preventDefault();
        setExpanded(false);
      }
      return;
    }

    if ($searchResults.hidden || resultCount === 0) {
      return;
    }

    var items = $searchResultsItems.querySelectorAll("li");
    if (!items.length) {
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive(activeIndex < items.length - 1 ? activeIndex + 1 : 0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive(activeIndex > 0 ? activeIndex - 1 : items.length - 1);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      var link = items[activeIndex].querySelector("a");
      if (link) {
        e.preventDefault();
        window.location.href = link.href;
      }
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) {
      return;
    }
    var tag = (e.target && e.target.tagName) || "";
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (e.target && e.target.isContentEditable)) {
      return;
    }
    e.preventDefault();
    $searchInput.focus();
  });

  document.addEventListener("click", function (e) {
    if ($searchResults.hidden) {
      return;
    }
    if ($searchResults.contains(e.target) || $searchInput.contains(e.target)) {
      return;
    }
    setExpanded(false);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSearch);
} else {
  initSearch();
}
