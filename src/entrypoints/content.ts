import { collapseByDefault } from "@/utils/settings";
import toggleButtonCSS from "@/assets/toggleButton.css?inline";

const OVERVIEW_SELECTORS = ['#B2Jtyd', '#Odp5De'];
const HIDEAIOVERVIEW_ATTR = 'data-hideaioverview-hidden';

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

function createToggleButton(): {host: HTMLElement, button: HTMLButtonElement} {
  const host = document.createElement('div');
  host.style.cssText = 'display: block; margin: 0 0 12px;';

  /* Build button inside of a shadow root to prevent Google's CSS from overiding the style */
  const shadow = host.attachShadow({mode: 'open'});

  const style = document.createElement('style');
  style.textContent = toggleButtonCSS;

  const label = document.createElement('span');
  label.textContent = "AI Overview";

  const arrow = document.createElement('span');
  arrow.className = "arrow";

  const button = document.createElement('button');
  button.type = 'button';

  button.append(label, arrow);
  shadow.append(style, button);

  return {host, button};
}

function setHidden(overview: HTMLElement, button: HTMLButtonElement, isHidden: boolean): void {
  button.setAttribute('aria-expanded', String(!isHidden));
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

  const {host, button} = createToggleButton();
    
  overview.setAttribute(HIDEAIOVERVIEW_ATTR, '');

  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    setHidden(overview, button, isExpanded);
  });
  
  setHidden(overview, button, true); // hidden at start
  overview.before(host);
}

export default defineContentScript({
  matches: [
    '*://google.com/search*',
    '*://www.google.com/search*',
  ],
  runAt: 'document_start',
  async main() {
    if (!(await collapseByDefault.getValue()))
      return;

    const run = () => {
      const overview = findOverview();
      if (overview) {
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
