import './style.css';
import haioLogo from '@/assets/logo.svg';
import { setupCounter } from '@/components/counter';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://github.com/caffeine98/hideAIOverview" target="_blank">
      <img src="${haioLogo}" class="logo" alt="HAIO Logo" />
    </a>
    <h1>HAIO - Hide AI Overlay</h1>
    <div class="card">
      <label class="toggleSwitch">
        <input type="checkbox", id="hideDefault", name="hideDefault", value="True" />
        <span class="slider"></span>
        <label, for="hideDefault">Hide AI Overlay by default</label><br>
      </label>
    </div>
    <p class="read-the-docs">
      Click on the WXT and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);
