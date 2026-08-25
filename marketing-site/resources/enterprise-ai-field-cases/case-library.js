(function () {
  const root = document.querySelector("[data-case-library]");
  if (!root) return;

  const tabs = Array.from(root.querySelectorAll("[data-demo-tab]"));
  const panels = Array.from(root.querySelectorAll("[data-demo-panel]"));

  function activateDemo(id, focusTab) {
    tabs.forEach((tab) => {
      const active = tab.dataset.demoTab === id;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus();
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.demoPanel !== id;
    });
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activateDemo(tab.dataset.demoTab, false));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      event.preventDefault();
      const delta = event.key === "ArrowRight" ? 1 : -1;
      const nextIndex = (index + delta + tabs.length) % tabs.length;
      activateDemo(tabs[nextIndex].dataset.demoTab, true);
    });
  });

  panels.forEach((panel) => {
    const runButton = panel.querySelector("[data-run-demo]");
    const steps = Array.from(panel.querySelectorAll("[data-demo-step]"));
    const placeholder = panel.querySelector("[data-demo-placeholder]");
    const output = panel.querySelector("[data-demo-output]");
    const status = panel.querySelector("[data-demo-status]");
    if (!runButton || !output) return;

    runButton.textContent = "运行 Demo";
    if (placeholder) placeholder.textContent = placeholder.textContent.replace(/运行合成演示/g, "运行 Demo");

    runButton.addEventListener("click", () => {
      runButton.disabled = true;
      runButton.textContent = "Demo 运行中…";
      output.hidden = true;
      if (placeholder) placeholder.hidden = false;
      steps.forEach((step) => step.classList.remove("is-active"));
      if (status) status.textContent = "Demo 开始，正在按步骤处理。";

      steps.forEach((step, index) => {
        window.setTimeout(() => {
          step.classList.add("is-active");
          if (status) status.textContent = `第 ${index + 1} 步已完成。`;
        }, 260 * (index + 1));
      });

      window.setTimeout(() => {
        if (placeholder) placeholder.hidden = true;
        output.hidden = false;
        runButton.disabled = false;
        runButton.textContent = "重新运行 Demo";
        if (status) status.textContent = "Demo 完成，请查看输出。";
      }, 260 * (steps.length + 1));
    });
  });

  root.querySelectorAll(".demo-panel-heading h3").forEach((heading) => {
    heading.textContent = heading.textContent.replace(/^演示\s*/, "Demo ");
  });
  root.querySelectorAll(".demo-column > span").forEach((label) => {
    if (label.textContent.trim() === "虚构输入") label.textContent = "演示输入";
  });
  root.querySelectorAll(".case-id").forEach((label) => {
    label.textContent = label.textContent.replace(/^(?:X|SC)-\d+\s*·\s*/, "");
  });
  root.querySelectorAll(".case-company").forEach((line) => {
    line.textContent = line.textContent.split("｜")[0].trim();
  });
  root.querySelectorAll(".case-outcome > span").forEach((label) => {
    label.textContent = "成果";
  });
  root.querySelectorAll(".case-outcome > strong").forEach((result) => {
    result.textContent = result.textContent
      .replace("65% 称", "65% 将")
      .replace("42% 称", "42% 表示")
      .replace("流程与交付被作者描述为跑通，但没有统一可审计的企业营收结果", "素材、初稿、审核与复盘流程已经跑通")
      .replace("；作者称降本超千万元", "；降本超千万元");
  });
  root.querySelectorAll(".case-summary").forEach((summary) => {
    summary.textContent = summary.textContent
      .replace(/^这条资料/, "这个案例")
      .replace(/^作者用/, "团队用")
      .replace(/^作者先/, "团队先")
      .replace(/^作者把/, "团队把")
      .replace(/^作者发现/, "团队发现");
  });
  root.querySelectorAll(".case-card details > summary").forEach((summary) => {
    summary.textContent = "查看案例分析";
  });
  root.querySelectorAll(".case-card-footer").forEach((footer) => {
    footer.remove();
  });

  const cards = Array.from(root.querySelectorAll("[data-case-card]"));
  const searchInput = root.querySelector("[data-case-search]");
  const filterButtons = Array.from(root.querySelectorAll("[data-case-filter]"));
  const clearButton = root.querySelector("[data-case-clear]");
  const resultCount = root.querySelector("[data-case-count]");
  const emptyState = root.querySelector("[data-case-empty]");
  const state = { scene: "all", q: "" };

  function normalize(value) {
    return String(value || "").toLocaleLowerCase("zh-CN").replace(/\s+/g, " ").trim();
  }

  function updateUrl() {
    const url = new URL(window.location.href);
    if (state.scene === "all") url.searchParams.delete("scene");
    else url.searchParams.set("scene", state.scene);
    if (state.q) url.searchParams.set("q", state.q);
    else url.searchParams.delete("q");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }

  function applyFilters(updateHistory) {
    const query = normalize(state.q);
    let visible = 0;

    cards.forEach((card) => {
      const scenes = normalize(card.dataset.scene).split(",");
      const sceneMatches = state.scene === "all" || scenes.includes(state.scene);
      const searchMatches = !query || normalize(card.textContent).includes(query);
      card.hidden = !(sceneMatches && searchMatches);
      if (!card.hidden) visible += 1;
    });

    if (resultCount) resultCount.textContent = String(visible);
    if (emptyState) emptyState.hidden = visible !== 0;
    if (updateHistory) updateUrl();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.scene = button.dataset.caseFilter || "all";
      filterButtons.forEach((item) => {
        item.setAttribute("aria-pressed", String(item === button));
      });
      applyFilters(true);
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.q = searchInput.value;
      applyFilters(true);
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      state.scene = "all";
      state.q = "";
      if (searchInput) searchInput.value = "";
      filterButtons.forEach((button) => {
        button.setAttribute("aria-pressed", String(button.dataset.caseFilter === "all"));
      });
      applyFilters(true);
    });
  }

  root.querySelectorAll("[data-copy-question]").forEach((button) => {
    button.addEventListener("click", async () => {
      const card = button.closest("[data-case-card]");
      const question = card?.querySelector("[data-talk-question]")?.textContent?.trim();
      if (!question) return;
      const original = button.textContent;
      try {
        await navigator.clipboard.writeText(question);
        button.textContent = "已复制";
      } catch {
        const textarea = document.createElement("textarea");
        textarea.value = question;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        textarea.remove();
        button.textContent = "已复制";
      }
      window.setTimeout(() => {
        button.textContent = original;
      }, 1400);
    });
  });

  const params = new URLSearchParams(window.location.search);
  const initialScene = params.get("scene");
  const initialQuery = params.get("q");
  if (initialScene && filterButtons.some((button) => button.dataset.caseFilter === initialScene)) {
    state.scene = initialScene;
    filterButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.caseFilter === initialScene));
    });
  }
  if (initialQuery && searchInput) {
    state.q = initialQuery;
    searchInput.value = initialQuery;
  }
  applyFilters(false);
})();
