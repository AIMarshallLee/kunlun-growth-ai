const filters = [...document.querySelectorAll('[data-case-filter]')];
const cards = [...document.querySelectorAll('[data-scenario-card]')];

for (const button of filters) {
  button.addEventListener('click', () => {
    const selected = button.dataset.caseFilter;
    for (const candidate of filters) candidate.setAttribute('aria-pressed', String(candidate === button));
    for (const card of cards) card.hidden = selected !== '全部' && card.dataset.industry !== selected;
  });
}
