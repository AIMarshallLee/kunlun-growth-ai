var year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

document.querySelectorAll("[data-copy-target]").forEach(function (button) {
  var targetId = button.dataset.copyTarget;
  var textarea = targetId ? document.getElementById(targetId) : null;

  if (!textarea) {
    var sibling = button.previousElementSibling;
    if (sibling && sibling.tagName === "TEXTAREA") {
      textarea = sibling;
      if (targetId) textarea.id = targetId;
    }
  }

  if (!textarea || textarea.tagName !== "TEXTAREA") return;

  var original = button.textContent;
  var resetTimer;

  button.addEventListener("click", function () {
    var showCopied = function () {
      window.clearTimeout(resetTimer);
      button.textContent = "已复制";
      resetTimer = window.setTimeout(function () {
        button.textContent = original;
      }, 1600);
    };
    var fallbackCopy = function () {
      textarea.focus();
      textarea.select();
      if (document.execCommand("copy")) {
        showCopied();
      } else {
        button.textContent = "请手动选择并复制";
      }
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textarea.value).then(showCopied).catch(fallbackCopy);
    } else {
      fallbackCopy();
    }
  });
});
