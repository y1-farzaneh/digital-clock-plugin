class DigitalClock{constructor(n,t={}){this.container=document.getElementById(n),this.options={bgColor:"#e0e5ec",color:"#444",format:"12",fontFamily:"Roboto",fontSize:"2rem",...t},this.attachShadowRoot(),this.init()}attachShadowRoot(){this.shadowRoot=this.container.attachShadow({mode:"open"});const n=document.createElement("style");n.textContent=`\n            .clock {\n                display: flex;\n                align-items: center;\n                flex-direction: row;\n                background-color: ${this.options.bgColor};\n                color: ${this.options.color};\n                font-family: ${this.options.fontFamily};\n                font-size: ${this.options.fontSize};\n            }\n            .clock div {\n                margin: 1rem;\n            }\n            .clock span {\n                width: 5rem;\n                height: 5rem;\n                background: ${this.options.bgColor};\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);\n                border-radius: 1rem;\n                box-shadow: 5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff;\n                transition: all 0.5s;\n            }\n            .clock span:hover {\n                background: #d1d9e6;\n                transform: scale(1.05);\n            }\n            .clock .text {\n                margin-top: 0.5rem;\n                font-size: 0.9rem;\n                text-transform: uppercase;\n                letter-spacing: 1px;\n            }\n            .clock #ampm {\n                width: 3rem;\n                height: 2rem;\n                font-size: 1rem;\n                background: ${this.options.bgColor};\n                color: ${this.options.color};\n                border-radius: 0.5rem;\n                box-shadow: 3px 3px 6px #a3b1c6, -3px -3px 6px #ffffff;\n                transition: background 0.5s;\n                display: none; /* Hidden by default */\n            }\n            .clock #ampm:hover {\n                background: #d1d9e6;\n            }\n            @media (max-width: 600px) {\n                .clock span {\n                    width: 4rem;\n                    height: 4rem;\n                    font-size: 1.5rem;\n                }\n                .clock .text {\n                    font-size: 0.7rem;\n                }\n                .clock #ampm {\n                    width: 2.5rem;\n                    height: 1.5rem;\n                    font-size: 0.8rem;\n                }\n            }\n        `,this.shadowRoot.appendChild(n)}init(){this.shadowRoot.innerHTML+='\n            <div class="clock">\n                <div>\n                    <span id="hour">00</span>\n                    <span class="text">Hours</span>\n                </div>\n                <div>\n                    <span id="minutes">00</span>\n                    <span class="text">Minutes</span>\n                </div>\n                <div>\n                    <span id="seconds">00</span>\n                    <span class="text">Seconds</span>\n                </div>\n                <div class="ampm-container">\n                    <span id="ampm">AM</span>\n                </div>\n            </div>\n        ',this.hourEl=this.shadowRoot.querySelector("#hour"),this.minuteEl=this.shadowRoot.querySelector("#minutes"),this.secondEl=this.shadowRoot.querySelector("#seconds"),this.ampmEl=this.shadowRoot.querySelector("#ampm"),this.updateAmpmVisibility(),this.updateClock(),setInterval((()=>this.updateClock()),1e3)}updateClock(){const n=new Date;let t=n.getHours();const o=n.getMinutes(),i=n.getSeconds(),e=t>=12?"PM":"AM";"12"===this.options.format&&(t=t%12||12),this.hourEl.innerText=String(t).padStart(2,"0"),this.minuteEl.innerText=String(o).padStart(2,"0"),this.secondEl.innerText=String(i).padStart(2,"0"),this.ampmEl.innerText="12"===this.options.format?e:""}updateAmpmVisibility(){this.ampmEl.style.display="12"===this.options.format?"flex":"none"}}window.DigitalClock=DigitalClock;