import './style.css';
import haioLogo from '@/assets/logo.svg';
import { collapseByDefault } from '@/utils/settings';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://github.com/caffeine98/hideAIOverview" target="_blank">
      <img src="${haioLogo}" class="logo" alt="HAIO Logo" />
    </a>
    <h1>HAIO - Hide AI Overview</h1>
    <div class="card">
      <label class="toggleSwitch">
        <input type="checkbox" id="hideDefault" name="hideDefault" checked/>
        <span class="slider"></span>
      </label>
      <label for="hideDefault">Hide AI Overview by default</label>
    </div>
  </div>
`;

const checkbox = document.querySelector<HTMLInputElement>('#hideDefault')!;

collapseByDefault.getValue().then((value) => {
  checkbox.checked = value;
});

checkbox.addEventListener('change', () =>{
  collapseByDefault.setValue(checkbox.checked)
})