const OVERVIEW_SELECTORS = ['#B2Jtyd', '#Odp5De'];
const HIDEAIOVERVIEW_ATTR = 'data-hideaioverview-hidden';
const ALWAYS_START_HIDDEN: boolean = true;

function findOverview(): HTMLElement | null {
  for (const selector of OVERVIEW_SELECTORS) {
    const element = document.querySelector<HTMLElement>(selector);
    if (element)
      return element;
  }
  return null;
}

function hideOverview(overview: HTMLElement): void {
  overview.style.setProperty('display', 'none', 'important');
  console.log("AI Overview is hidden");
}

function showOverview(overview: HTMLElement): void {
  overview.style.removeProperty('display');
  console.log("AI Overview is visible")
}

function setHidden(overview: HTMLElement, button: HTMLButtonElement, isHidden: boolean): void {
  button.setAttribute('aria-expanded', String(!isHidden));
  button.innerText = isHidden ? 'AI Overview ▶' : 'AI Overview ▼';
  if (isHidden) {
    hideOverview(overview);
  }
  else {
    showOverview(overview);
  }
}

function collapseOverview(overview: HTMLElement): void {
  if (overview.closest(`[${HIDEAIOVERVIEW_ATTR}]`) || overview.hasAttribute(HIDEAIOVERVIEW_ATTR))
    return;

  overview.setAttribute(HIDEAIOVERVIEW_ATTR, '');

  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'block';
  button.style.alignSelf = 'flex-start';
  
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    setHidden(overview, button, isExpanded);
  });
  
  setHidden(overview, button, ALWAYS_START_HIDDEN);
  overview.before(button);
}

export default defineContentScript({
  matches: ['*://*.google.com/search*'],
  runAt: 'document_start',
  main() {
    console.log('Running hideAIOverview...');

    const run = () => {
      const overview = findOverview();
      if (overview) {
        console.log(`Selector: ${overview}`);
        collapseOverview(overview);
      }
    }

    run();

    new MutationObserver(run).observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  },
});
