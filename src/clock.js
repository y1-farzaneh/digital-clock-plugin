class DigitalClock {
    constructor(containerId, options = {}) {
        // Get the container element by its ID
        this.container = document.getElementById(containerId);

        // Set default options and merge with provided options
        this.options = {
            bgColor: '#e0e5ec',
            color: '#444',
            format: '12', // Default to 12-hour format
            fontFamily: 'Roboto',
            fontSize: '2rem',
            ...options
        };

        // Attach Shadow DOM to the container for encapsulating styles
        this.attachShadowRoot();

        // Initialize the clock
        this.init();
    }

    /**
     * Attach a Shadow Root to the container to encapsulate styles.
     */
    attachShadowRoot() {
        // Create a shadow root and attach it to the container
        this.shadowRoot = this.container.attachShadow({ mode: 'open' });

        // Create and append a style element with clock's styles
        const style = document.createElement('style');
        style.textContent = `
            .clock {
                display: flex;
                align-items: center;
                flex-direction: row;
                background-color: ${this.options.bgColor};
                color: ${this.options.color};
                font-family: ${this.options.fontFamily};
                font-size: ${this.options.fontSize};
            }
            .clock div {
                margin: 1rem;
            }
            .clock span {
                width: 5rem;
                height: 5rem;
                background: ${this.options.bgColor};
                display: flex;
                justify-content: center;
                align-items: center;
                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
                border-radius: 1rem;
                box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;
                transition: all 0.5s;
            }
            .clock span:hover {
                background: #d1d9e6;
                transform: scale(1.05);
            }
            .clock .text {
                margin-top: 0.5rem;
                font-size: 0.9rem;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .clock #ampm {
                width: 3rem;
                height: 2rem;
                font-size: 1rem;
                background: ${this.options.bgColor};
                color: ${this.options.color};
                border-radius: 0.5rem;
                box-shadow: 3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff;
                transition: background 0.5s;
                display: none; /* Hidden by default */
            }
            .clock #ampm:hover {
                background: #d1d9e6;
            }
            @media (max-width: 600px) {
                .clock span {
                    width: 4rem;
                    height: 4rem;
                    font-size: 1.5rem;
                }
                .clock .text {
                    font-size: 0.7rem;
                }
                .clock #ampm {
                    width: 2.5rem;
                    height: 1.5rem;
                    font-size: 0.8rem;
                }
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    /**
     * Initialize the clock by adding its HTML structure and setting up updates.
     */
    init() {
        // Add HTML structure for the clock to the shadow root
        this.shadowRoot.innerHTML += `
            <div class="clock">
                <div>
                    <span id="hour">00</span>
                    <span class="text">Hours</span>
                </div>
                <div>
                    <span id="minutes">00</span>
                    <span class="text">Minutes</span>
                </div>
                <div>
                    <span id="seconds">00</span>
                    <span class="text">Seconds</span>
                </div>
                <div class="ampm-container">
                    <span id="ampm">AM</span>
                </div>
            </div>
        `;

        // Cache references to the clock's elements
        this.hourEl = this.shadowRoot.querySelector("#hour");
        this.minuteEl = this.shadowRoot.querySelector("#minutes");
        this.secondEl = this.shadowRoot.querySelector("#seconds");
        this.ampmEl = this.shadowRoot.querySelector("#ampm");

        // Set initial visibility of AM/PM based on format
        this.updateAmpmVisibility();

        // Start the clock and set up updates every second
        this.updateClock();
        setInterval(() => this.updateClock(), 1000);
    }

    /**
     * Update the clock display with the current time.
     */
    updateClock() {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        const ampm = h >= 12 ? "PM" : "AM";

        // Convert to 12-hour format if needed
        if (this.options.format === '12') {
            h = h % 12 || 12;
        }

        // Update clock elements with the current time
        this.hourEl.innerText = String(h).padStart(2, "0");
        this.minuteEl.innerText = String(m).padStart(2, "0");
        this.secondEl.innerText = String(s).padStart(2, "0");
        this.ampmEl.innerText = this.options.format === '12' ? ampm : '';
    }

    /**
     * Update the visibility of the AM/PM indicator based on the time format.
     */
    updateAmpmVisibility() {
        this.ampmEl.style.display = this.options.format === '12' ? 'flex' : 'none';
    }
}

// Expose the DigitalClock class globally
window.DigitalClock = DigitalClock;