// Dynamic interaction logic for Chai Builder
document.addEventListener('DOMContentLoaded', () => {
    // DOM nodes extract karte hain
    const cup = document.querySelector('.cup');
    const cupLiquid = document.querySelector('.cup-liquid');
    const visualText = document.querySelector('.visual-text');
    
    const allInputs = document.querySelectorAll('.input');
    const extrasCheckboxes = document.querySelectorAll('input[name="tea-extras"]');

    // DYNAMIC INTERACTION FUNCTION
    function updateChaiPreview() {
        // Active selections read karte hain
        const selectedType = document.querySelector('input[name="tea-type"]:checked')?.value;
        const selectedSize = document.querySelector('input[name="tea-size"]:checked')?.value;
        const selectedMilk = document.querySelector('input[name="tea-milk"]:checked')?.value;
        
        // --- 1. DYNAMIC COLOR GRADIENTS (Tea Type & Milk based) ---
        if (selectedType === 'black-tea' || selectedMilk === 'no-milk') {
            // Lal/Kaali Chai look (Deep Dark Translucent Reddish-Brown)
            cupLiquid.style.background = 'linear-gradient(180deg, #5c2c16 0%, #3d1a0b 60%, #1f0b03 100%)';
        } else if (selectedMilk === 'almond-milk') {
            // Creamy Soft Almond Milk Chai Hue
            cupLiquid.style.background = 'linear-gradient(180deg, #f4dbb9 0%, #dcae7b 60%, #a4774b 100%)';
        } else if (selectedType === 'cold-tea') {
            // Frosted Iced Amber Shade
            cupLiquid.style.background = 'linear-gradient(180deg, #d38944 0%, #aa6122 60%, #75390e 100%)';
        } else {
            // Standard Premium Cutting Milk Chai Color
            cupLiquid.style.background = 'linear-gradient(180deg, #e19956 0%, #ba7234 60%, #8b4a18 100%)';
        }

        // --- 2. DYNAMIC MUG SCALING (Size based) ---
        if (selectedSize === 'small') {
            cup.style.transform = 'scale(0.85)'; // 15% compact size
        } else if (selectedSize === 'large') {
            cup.style.transform = 'scale(1.15)'; // 15% upscale size
        } else {
            cup.style.transform = 'scale(1)';    // Standard Medium
        }

        // --- 3. LIVE SUMMARY GENERATOR ---
        // Human-readable labels read karne ke liye sibling elements use karte hain
        const typeLabel = document.querySelector('input[name="tea-type"]:checked').nextSibling.textContent.trim();
        const sizeLabel = document.querySelector('input[name="tea-size"]:checked').nextSibling.textContent.trim();
        const milkLabel = document.querySelector('input[name="tea-milk"]:checked').nextSibling.textContent.trim();

        // Selected extras collect karte hain
        let selectedExtras = [];
        extrasCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedExtras.push(checkbox.nextSibling.textContent.trim());
            }
        });

        // Final text construct karte hain
        let summaryText = `Preparing: ${sizeLabel} ${typeLabel} (${milkLabel})`;
        if (selectedExtras.length > 0) {
            summaryText += ` + Extra ${selectedExtras.join(' & ')}`;
        }

        // Update UI description text
        visualText.textContent = summaryText;
    }

    // Input elements par global change tracker attach karte hain
    allInputs.forEach(input => {
        input.addEventListener('change', updateChaiPreview);
    });

    // Run on initial startup
    updateChaiPreview();
});