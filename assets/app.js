(function () {
  var root = document.documentElement;
  var storageKey = "waylight-template-theme";
  var themes = ["atlantic", "heather", "sand"];
  var labels = {
    atlantic: "Atlantic",
    heather: "Heather",
    sand: "Sand"
  };

  function applyTheme(theme) {
    var value = themes.indexOf(theme) >= 0 ? theme : "atlantic";
    if (value === "atlantic") {
      root.removeAttribute("data-theme");
    } else {
      root.setAttribute("data-theme", value);
    }

    try {
      window.localStorage.setItem(storageKey, value);
    } catch (error) {
      // Ignore storage failures and keep the current in-memory theme.
    }

    var text = labels[value];
    document.querySelectorAll("[data-theme-label]").forEach(function (node) {
      node.textContent = text;
    });
  }

  function nextTheme(currentTheme) {
    var index = themes.indexOf(currentTheme);
    return themes[(index + 1) % themes.length];
  }

  var initialTheme = "atlantic";
  try {
    initialTheme = window.localStorage.getItem(storageKey) || initialTheme;
  } catch (error) {
    initialTheme = "atlantic";
  }

  applyTheme(initialTheme);

  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      var activeTheme = root.getAttribute("data-theme") || "atlantic";
      applyTheme(nextTheme(activeTheme));
    });
  });
})();
