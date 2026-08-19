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
        for (var k = 0; k < stemmedTerms.length; k++) {
          if (elasticlunr.stemmer(word).startsWith(stemmedTerms[k])) {
            value = TERM_WEIGHT;
            termFound = true;
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
    return body;
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
      teaser.push(body.substring(startIndex, word[2]));
      startIndex = word[2];
    }

    if (word[1] === TERM_WEIGHT) {
      teaser.push("<b>");
    }
    startIndex = word[2] + word[0].length;
    teaser.push(body.substring(word[2], startIndex));

    if (word[1] === TERM_WEIGHT) {
      teaser.push("</b>");
    }
  }
  teaser.push("…");
  return teaser.join("");
}

function formatSearchResultItem(item, terms) {
  return '<article><header><a href="' + item.ref + '">' + item.doc.title +
    "</a></header><p>" + makeTeaser(item.doc.body, terms) + "</p></article>";
}

function initSearch() {
  var searchScript = document.querySelector("script[data-search-index]");
  var $searchInput = document.getElementById("search");
  var $searchResults = document.querySelector(".search-results");
  var $searchResultsItems = document.querySelector(".search-results__items");
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

  var initIndex = function () {
    if (!indexPromise) {
      indexPromise = fetch(indexUrl).then(function (response) {
        return response.json().then(function (json) {
          return elasticlunr.Index.load(json);
        });
      });
    }
    return indexPromise;
  };

  $searchInput.addEventListener("keyup", debounce(function () {
    var term = $searchInput.value.trim();
    if (term === currentTerm) {
      return;
    }
    $searchResults.style.display = term === "" ? "none" : "block";
    $searchResultsItems.innerHTML = "";
    currentTerm = term;
    if (term === "") {
      return;
    }

    initIndex().then(function (idx) {
      if (term !== currentTerm) {
        return;
      }
      var results = idx.search(term, options);
      if (results.length === 0) {
        $searchResults.style.display = "none";
        return;
      }

      var fragment = document.createDocumentFragment();
      var terms = term.split(" ");
      for (var i = 0; i < Math.min(results.length, MAX_ITEMS); i++) {
        var item = document.createElement("li");
        item.innerHTML = formatSearchResultItem(results[i], terms);
        fragment.appendChild(item);
      }
      $searchResultsItems.appendChild(fragment);
    });
  }, 150));

  window.addEventListener("click", function (e) {
    if ($searchResults.style.display == "block" && !$searchResults.contains(e.target)) {
      $searchResults.style.display = "none";
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSearch);
} else {
  initSearch();
}
