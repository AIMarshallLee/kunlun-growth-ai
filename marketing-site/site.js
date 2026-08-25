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

(function () {
  var flowLabels = {
    content: "内容 / 营销",
    sales: "销售 / 跟进",
    knowledge: "知识 / 办公",
    service: "客服 / 交付",
    unsure: "暂不确定",
  };
  var flowPlans = {
    content: "授权素材 → 选题 / 结构 → 候选初稿 → 人工审核 → 发布前包",
    sales: "客户信息整理 → 跟进候选 → 人工确认 → 记录复盘",
    knowledge: "资料盘点 → 权限分类 → 检索问答 → 来源核验",
    service: "问题分流 → 候选回复 → 人工接管 → 记录复盘",
    unsure: "先画出一条高频流程 → 确认负责人 → 准备授权样本 → 定义人工审核",
  };
  var frictionLabels = {
    manual: "重复手工",
    inconsistent: "结果不一致",
    scattered: "知识分散",
    review: "协作审核",
    unclear: "当前卡点还说不清",
  };
  var requiredKeys = ["flow", "frequency", "friction", "owner", "samples", "review"];
  var requiredLabels = {
    flow: "流程类型",
    frequency: "发生频率",
    friction: "主要卡点",
    owner: "流程负责人",
    samples: "样本边界",
    review: "人工复核",
  };
  var scoreTables = {
    frequency: { daily: 2, weekly: 1, occasional: 0, once: -1 },
    owner: { clear: 2, pending: 1, none: -2, unsure: -1 },
    samples: { ready: 2, can: 1, unclear: -1, sensitive: -2 },
    review: { clear: 2, can: 1, auto: -2, none: -1 },
  };

  function valueOf(answers, key) {
    return answers && typeof answers[key] === "string" ? answers[key] : "";
  }

  function diagnosticId(answers) {
    var seed = requiredKeys.map(function (key) {
      return valueOf(answers, key);
    }).join("|");
    var hash = 0;
    for (var index = 0; index < seed.length; index += 1) hash = (hash * 31 + seed.charCodeAt(index)) % 100000;
    return "MAR-" + String(hash).padStart(5, "0");
  }

  function evaluate(answers) {
    var normalized = answers || {};
    var unanswered = requiredKeys.filter(function (key) { return !valueOf(normalized, key); });
    var gaps = unanswered.map(function (key) { return "补答" + requiredLabels[key]; });
    var score = 0;
    Object.keys(scoreTables).forEach(function (key) {
      score += scoreTables[key][valueOf(normalized, key)] || 0;
    });
    var blocked = ["sensitive"].includes(valueOf(normalized, "samples")) || ["auto"].includes(valueOf(normalized, "review")) || ["none"].includes(valueOf(normalized, "owner"));
    var status = unanswered.length ? "先完成诊断" : blocked ? "暂缓启动" : score >= 6 ? "适合进入 15–30 分钟适配沟通" : score >= 3 ? "先补齐 1–2 项条件" : score >= 0 ? "建议先梳理流程" : "暂缓启动";
    if (valueOf(normalized, "flow") === "unsure") gaps.push("明确第一顺位流程");
    if (["pending", "unsure", "none"].includes(valueOf(normalized, "owner"))) gaps.push("明确负责人");
    if (["unclear", "sensitive"].includes(valueOf(normalized, "samples"))) gaps.push("准备授权 / 脱敏样本");
    if (["auto", "none"].includes(valueOf(normalized, "review"))) gaps.push("设置人工复核节点");
    gaps = gaps.filter(function (item, index) { return gaps.indexOf(item) === index; });
    var frictionLabel = frictionLabels[valueOf(normalized, "friction")] || "待回答主要卡点";
    var reason = unanswered.length
      ? "仍有问题未回答，暂不形成启动判断。"
      : blocked
        ? "当前存在负责人、资料授权或人工审核方面的硬门槛，先补齐边界再讨论试点。"
        : "当前主要卡点是“" + frictionLabel + "”；流程频率、负责人、授权样本和人工复核条件共同决定是否适合进入小范围适配，当前评分为 " + score + "。";
    return {
      ready: unanswered.length === 0,
      blocked: blocked,
      score: score,
      status: status,
      flow: valueOf(normalized, "flow") || "unsure",
      flowLabel: flowLabels[valueOf(normalized, "flow")] || flowLabels.unsure,
      plan: flowPlans[valueOf(normalized, "flow")] || flowPlans.unsure,
      frictionLabel: frictionLabel,
      reason: reason,
      missing: gaps.length ? gaps : ["暂无明显启动缺口"],
      boundary: "仅使用获得授权且已脱敏的样本；候选输出必须由人工复核，不自动外发。答案只在当前页面计算，不上传、不保存。",
      diagnosticId: diagnosticId(normalized),
    };
  }

  function buildSummary(result) {
    result = result || {};
    return [
      "Marshall｜企业 AI 场景诊断摘要",
      "诊断编号：" + (result.diagnosticId || "待完成"),
      "准备度状态：" + (result.status || "先完成诊断"),
      "第一顺位流程：" + (result.flowLabel || "待回答流程类型"),
      "建议路径：" + (result.plan || flowPlans.unsure),
      "主要卡点：" + (result.frictionLabel || "待回答主要卡点"),
      "判断理由：" + (result.reason || "仍有问题未回答，暂不形成启动判断。"),
      "启动前缺口：" + ((result.missing && result.missing.length) ? result.missing.join("、") : "待完成全部问题"),
      "边界提醒：" + (result.boundary || "答案只在当前页面计算，不上传、不保存；不要填写客户名称或敏感信息。"),
    ].join("\n");
  }

  window.MarshallDiagnostic = { evaluate: evaluate, buildSummary: buildSummary };

  var root = typeof document.querySelector === "function" ? document.querySelector("[data-marshall-diagnostic]") : null;
  if (!root) return;
  var questions = Array.prototype.slice.call(root.querySelectorAll("[data-question]"));
  var current = 0;
  var progressLabel = root.querySelector("#marshall-progress-label");
  var progressPercent = root.querySelector("#marshall-progress-percent");
  var progressBar = root.querySelector("#marshall-progress-bar");
  var progress = root.querySelector("[role=progressbar]");
  var error = root.querySelector("#marshall-error");
  var resultBox = root.querySelector("[data-marshall-result]");
  var summary = root.querySelector("#marshall-summary");
  var status = root.querySelector("[data-marshall-status]");
  var previousButton = root.querySelector("[data-marshall-prev]");

  function showQuestion(index, moveFocus) {
    current = Math.max(0, Math.min(index, questions.length - 1));
    questions.forEach(function (question, questionIndex) { question.hidden = questionIndex !== current; });
    var number = current + 1;
    progressLabel.textContent = "QUESTION " + String(number).padStart(2, "0") + " / " + String(questions.length).padStart(2, "0");
    progressPercent.textContent = Math.round(number / questions.length * 100) + "%";
    progressBar.style.width = number / questions.length * 100 + "%";
    progress.setAttribute("aria-valuenow", String(number));
    previousButton.disabled = current === 0;
    error.hidden = true;
    if (moveFocus) {
      var focusTarget = questions[current].querySelector("input:checked") || questions[current].querySelector("input");
      if (focusTarget) focusTarget.focus();
    }
  }

  function collectAnswers() {
    var answers = {};
    questions.forEach(function (question) {
      var selected = question.querySelector("input:checked");
      if (selected) answers[question.dataset.question] = selected.value;
    });
    return answers;
  }

  function renderResult() {
    var evaluation = evaluate(collectAnswers());
    status.textContent = evaluation.status + " · " + evaluation.diagnosticId;
    summary.value = buildSummary(evaluation);
    resultBox.hidden = false;
    resultBox.focus({ preventScroll: true });
    var reduceMotion = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultBox.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  }

  root.querySelector("[data-marshall-next]").addEventListener("click", function () {
    if (!questions[current].querySelector("input:checked")) { error.hidden = false; return; }
    if (current === questions.length - 1) renderResult(); else showQuestion(current + 1, true);
  });
  previousButton.addEventListener("click", function () { if (current > 0) showQuestion(current - 1, true); });
  root.querySelector("[data-marshall-reset]").addEventListener("click", function () {
    root.querySelectorAll("input:checked").forEach(function (input) { input.checked = false; });
    resultBox.hidden = true;
    showQuestion(0, true);
  });
  showQuestion(0);
}());
