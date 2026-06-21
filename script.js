// Full Dynamic Logic with Paytm Style Order Confirmation
document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements Target Karte Hain
    const cup = document.querySelector('.cup');
    const cupLiquid = document.querySelector('.cup-liquid');
    const visualText = document.querySelector('.visual-text');
    const steamContainer = document.querySelector('.steam');
    const menuPanel = document.getElementById('chaiChanger');
    const menuTitle = document.querySelector('#chaiChanger h2');

    let currentOrderPrice = 0; // Current price track karne ke liye global variable

    // --- DYNAMIC ELEMENT INJECTION ---

    // Left Panel me Title ke niche live price tag inject karna
    const panelPriceTag = document.createElement('div');
    panelPriceTag.id = 'panel-price';
    panelPriceTag.style.cssText = `
        text-align: center;
        font-size: 1.8rem;
        color: rgb(218, 132, 3);
        font-weight: 800;
        margin: -15px 0 25px 0;
        text-shadow: 0 0 10px rgba(218, 132, 3, 0.3);
        transition: all 0.3s ease;
    `;
    menuTitle.insertAdjacentElement('afterend', panelPriceTag);

    // Cup ke andar dynamic Milk Foam (Malai/Jhaag) ki layer inject karna
    const foamLayer = document.createElement('div');
    foamLayer.className = 'cup-foam';
    foamLayer.style.cssText = `
        position: absolute;
        left: 0;
        right: 0;
        height: 16px;
        border-radius: 50%;
        z-index: 6;
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: inset 0 2px 4px rgba(255,255,255,0.4);
    `;
    cup.appendChild(foamLayer);

    // --- 🚨 NEW: PAYTM STYLE ORDER BUTTON INJECTION 🚨 ---
    const orderBtn = document.createElement('button');
    orderBtn.id = 'placeOrderBtn';
    orderBtn.innerText = 'Proceed to Pay';
    orderBtn.style.cssText = `
        width: 100%;
        padding: 14px;
        background: linear-gradient(135deg, #00baf2 0%, #002e6e 100%); /* Paytm Classic Blue Gradient */
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 1.1rem;
        font-weight: 700;
        cursor: pointer;
        margin-top: 15px;
        box-shadow: 0 6px 20px rgba(0, 186, 242, 0.3);
        transition: all 0.2s ease;
        letter-spacing: 0.5px;
    `;

    // Hover and Press Effects for Button
    orderBtn.addEventListener('mouseenter', () => orderBtn.style.transform = 'translateY(-2px)');
    orderBtn.addEventListener('mouseleave', () => orderBtn.style.transform = 'translateY(0)');
    orderBtn.addEventListener('mousedown', () => orderBtn.style.transform = 'scale(0.97)');
    orderBtn.addEventListener('mouseup', () => orderBtn.style.transform = 'scale(1)');

    // Left panel ke andar sabse niche button append karna
    menuPanel.appendChild(orderBtn);


    // 2. PRICING CONFIGURATION (Rate Chart)
    const pricing = {
        types: { 'black-tea': 30, 'no-sugar': 40, 'cold-tea': 50 },
        sizes: { 'small': 0, 'medium': 10, 'large': 20 },
        milks: { 'no-milk': 0, 'regular-milk': 10, 'almond-milk': 25 },
        extras: { 'ginger': 5, 'cardamom': 8, 'extra-sugar': 4 }
    };


    // 3. MASTER UPDATE FUNCTION
    function updateChaiShop() {
        const selectedType = document.querySelector('input[name="tea-type"]:checked')?.value || 'cold-tea';
        const selectedSize = document.querySelector('input[name="tea-size"]:checked')?.value || 'medium';
        const selectedMilk = document.querySelector('input[name="tea-milk"]:checked')?.value || 'regular-milk';

        const checkedExtras = [];
        document.querySelectorAll('input[name="tea-extras"]:checked').forEach(cb => {
            checkedExtras.push(cb.value);
        });

        // --- CALCULATE LIVE TOTAL PRICE ---
        let totalPrice = 0;
        totalPrice += pricing.types[selectedType] || 0;
        totalPrice += pricing.sizes[selectedSize] || 0;
        totalPrice += pricing.milks[selectedMilk] || 0;
        checkedExtras.forEach(extra => {
            totalPrice += pricing.extras[extra] || 0;
        });

        currentOrderPrice = totalPrice; // Global variable update kiya

        panelPriceTag.innerHTML = `₹${totalPrice}`;


        // --- DYNAMIC CUP VISUALS & LIQUID COLORS ---
        let liquidColor = '';
        let fillHeight = '75%';

        if (selectedSize === 'small') {
            cup.style.transform = 'scale(0.85)';
            fillHeight = '65%';
        } else if (selectedSize === 'large') {
            cup.style.transform = 'scale(1.15)';
            fillHeight = '88%';
        } else {
            cup.style.transform = 'scale(1)';
            fillHeight = '76%';
        }
        cupLiquid.style.height = fillHeight;

        if (selectedType === 'black-tea' || selectedMilk === 'no-milk') {
            liquidColor = 'linear-gradient(180deg, #662203 0%, #441601 70%, #220b00 100%)';
            foamLayer.style.opacity = '0';
        } else if (selectedMilk === 'almond-milk') {
            liquidColor = 'linear-gradient(180deg, #f5d4ad 0%, #d19e69 60%, #9c6833 100%)';
            foamLayer.style.opacity = '0.85';
            foamLayer.style.backgroundColor = '#faedd7';
        } else if (selectedType === 'cold-tea') {
            liquidColor = 'linear-gradient(180deg, #e69647 0%, #b8671b 60%, #804005 100%)';
            foamLayer.style.opacity = '0.7';
            foamLayer.style.backgroundColor = '#fff0dd';
        } else {
            liquidColor = 'linear-gradient(180deg, #df914b 0%, #b56b28 60%, #85450f 100%)';
            foamLayer.style.opacity = '0.9';
            foamLayer.style.backgroundColor = '#fceddc';
        }
        cupLiquid.style.background = liquidColor;
        foamLayer.style.bottom = `calc(${fillHeight} - 8px)`;

        // STEAM CONTROLLER
        if (selectedType === 'cold-tea') {
            steamContainer.style.opacity = '0.05';
        } else {
            steamContainer.style.opacity = '1';
        }

        // DYNAMIC INGREDIENT PARTICLES
        document.querySelectorAll('.chai-particle').forEach(p => p.remove());
        checkedExtras.forEach((extra, index) => {
            const particle = document.createElement('div');
            particle.className = 'chai-particle';
            particle.style.cssText = `
                position: absolute;
                bottom: ${30 + (index * 25)}px;
                left: ${40 + (index * 30)}px;
                width: 7px;
                height: 7px;
                border-radius: 50%;
                z-index: 5;
                pointer-events: none;
                opacity: 0.6;
                transition: all 0.5s ease;
            `;

            if (extra === 'ginger') {
                particle.style.backgroundColor = '#eacc9e';
            } else if (extra === 'cardamom') {
                particle.style.backgroundColor = '#8fa87b';
            } else {
                particle.style.backgroundColor = '#ffffff';
            }

            particle.style.animation = 'steam-rise 4s ease-in-out infinite alternate';
            cup.appendChild(particle);
        });

        // LIVE ORDER SUMMARY UPDATE
        const typeText = document.querySelector('input[name="tea-type"]:checked').nextSibling.textContent.trim();
        const sizeText = document.querySelector('input[name="tea-size"]:checked').nextSibling.textContent.trim();
        const milkText = document.querySelector('input[name="tea-milk"]:checked').nextSibling.textContent.trim();

        let extrasList = [];
        document.querySelectorAll('input[name="tea-extras"]:checked').forEach(cb => {
            extrasList.push(cb.nextSibling.textContent.trim());
        });

        let summary = `Your Order: ${sizeText} ${typeText} (${milkText})`;
        if (extrasList.length > 0) {
            summary += ` enriched with ${extrasList.join(' & ')}`;
        }
        visualText.textContent = summary;
    }


    // --- 🚨 NEW: PAYTM TRANSACTION POPUP LOGIC 🚨 ---
    function triggerPaytmSuccess() {
        // Full screen screen-blur overlay model banana
        const overlay = document.createElement('div');
        overlay.id = 'paytmOverlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(10, 10, 10, 0.85);
            backdrop-filter: blur(10px);
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Content Card Box (Paytm Clean Theme)
        const successCard = document.createElement('div');
        successCard.style.cssText = `
            background: #ffffff;
            color: #002e6e;
            width: 360px;
            padding: 35px 25px;
            border-radius: 24px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.5);
            transform: scale(0.8);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        `;

        // Big Animated Checkmark Circle
        successCard.innerHTML = `
            <div style="width: 80px; height: 80px; background: #00baf2; border-radius: 50%; display: flex; justify-content: center; align-items: center; margin: 0 auto 20px; box-shadow: 0 0 20px rgba(0, 186, 242, 0.4);">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </div>
            <h2 style="font-size: 1.6rem; font-weight: 800; margin-bottom: 5px; color: #002e6e;">Payment Successful</h2>
            <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;">Order Processed via Paytm</p>
            
            <div style="background: #f4f9fc; border-radius: 16px; padding: 15px; margin-bottom: 25px; border: 1px dashed #cbdbe5;">
                <span style="font-size: 0.9rem; color: #555; display: block; margin-bottom: 5px;">Paid to Chai Builder</span>
                <strong style="font-size: 2.2rem; color: #002e6e; font-weight: 800;">₹${currentOrderPrice}</strong>
            </div>

            <button id="closePaytmBtn" style="width: 100%; padding: 12px; background: #002e6e; color: white; border: none; border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; transition: background 0.2s;">
                Done
            </button>
        `;

        overlay.appendChild(successCard);
        document.body.appendChild(overlay);

        // Animation triggers
        setTimeout(() => {
            overlay.style.opacity = '1';
            successCard.style.transform = 'scale(1)';
        }, 10);

        // --- 🔊 VOICE NOTIFICATION ENGINE (Paytm Signature Sound Effect) ---
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Pehle ki aawaz clear karein
            const soundAlert = new SpeechSynthesisUtterance(`Chai Builder par ${currentOrderPrice} rupaye prapt hue.`);
            soundAlert.lang = 'hi-IN'; // Sound language Hindi Tone me configure kari
            soundAlert.rate = 0.95;    // Thodi natural speed setup kari
            soundAlert.pitch = 1.0;    // Clear notification standard sound depth
            window.speechSynthesis.speak(soundAlert);
        }

        // Close Button event listener
        document.getElementById('closePaytmBtn').addEventListener('click', () => {
            overlay.style.opacity = '0';
            successCard.style.transform = 'scale(0.8)';
            setTimeout(() => overlay.remove(), 300);
        });
    }

    // Connect Click Event to Custom Order button
    orderBtn.addEventListener('click', triggerPaytmSuccess);


    // 4. BIND LISTENERS ON ALL INPUTS
    document.querySelectorAll('.input').forEach(input => {
        input.addEventListener('change', updateChaiShop);
    });

    // Pehli baar startup initialization logic run karna
    updateChaiShop();
});