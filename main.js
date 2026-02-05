
class TotoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'toto-generator');

    const title = document.createElement('h1');
    title.textContent = 'Toto Number Generator';

    const numbersContainer = document.createElement('div');
    numbersContainer.setAttribute('class', 'numbers-container');

    const additionalNumberContainer = document.createElement('div');
    additionalNumberContainer.setAttribute('class', 'additional-number-container');

    const button = document.createElement('button');
    button.textContent = 'Generate Numbers';
    button.addEventListener('click', () => this.generateNumbers());

    const style = document.createElement('style');
    style.textContent = `
      .toto-generator {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: sans-serif;
      }
      .numbers-container, .additional-number-container {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }
      .number, .additional-number {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        font-weight: bold;
        color: white;
      }
      .number {
        background-color: #4CAF50;
      }
      .additional-number {
        background-color: #f44336;
      }
      button {
        padding: 10px 20px;
        font-size: 16px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
        background-color: #2196F3;
        color: white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        transition: background-color 0.3s, box-shadow 0.3s;
      }
      button:hover {
        background-color: #1976D2;
        box-shadow: 0 6px 12px rgba(0,0,0,0.3);
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(title);
    wrapper.appendChild(numbersContainer);
    wrapper.appendChild(additionalNumberContainer);
    wrapper.appendChild(button);

    this.generateNumbers();
  }

  generateNumbers() {
    const numbersContainer = this.shadowRoot.querySelector('.numbers-container');
    const additionalNumberContainer = this.shadowRoot.querySelector('.additional-number-container');
    numbersContainer.innerHTML = '';
    additionalNumberContainer.innerHTML = '';

    const mainNumbers = new Set();
    while (mainNumbers.size < 6) {
      mainNumbers.add(Math.floor(Math.random() * 49) + 1);
    }

    const additionalNumber = Math.floor(Math.random() * 49) + 1;

    mainNumbers.forEach(number => {
      const numberElement = document.createElement('div');
      numberElement.setAttribute('class', 'number');
      numberElement.textContent = number;
      numbersContainer.appendChild(numberElement);
    });

    const additionalNumberElement = document.createElement('div');
    additionalNumberElement.setAttribute('class', 'additional-number');
    additionalNumberElement.textContent = additionalNumber;
    additionalNumberContainer.appendChild(additionalNumberElement);
  }
}

customElements.define('toto-generator', TotoGenerator);

// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = 'Switch to Day Mode';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = 'Switch to Night Mode';
        }
    };

    // Load saved theme from localStorage or default to 'day'
    const savedTheme = localStorage.getItem('theme') || 'day';
    applyTheme(savedTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'day';
        const newTheme = currentTheme === 'dark' ? 'day' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
});

