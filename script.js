
// Pure logic for dynamic Chai Builder UI
document.addEventListener('DOMContentLoaded', () => {
    // 1. DOM Elements select karte hain
    const cup = document.querySelector('.cup');
    const cupLiquid = document.querySelector('.cup-liquid');
    const visualText = document.querySelector('.visual-text');
    const steam = document.querySelector('.steam');

    // Saare input groups ko trace karne ke liye
    const allInputs = document.querySelectorAll('.input');
    const teaExtrasInputs = document.querySelectorAll('input[name="tea-extras"]');

    // 2. PREVIEW UPDATE FUNCTION
    function updateChaiPreview() {
        // Selected radio values nikalte hain
        const selectedType = document.querySelector('input[name="tea-type"]:checked')?.value;
        const selectedSize = document.querySelector('input[name="tea-size"]:checked')?.value;
        const selectedMilk = document.querySelector('input[name="tea-milk"]:checked')?.value;

        // Selected checkboxes (Extras) ki list banate hain
        const selectedExtras = [];
        teaExtrasInputs.forEach(input => {
            if (input.checked) {
                // Input ke aage ka text content extract karte hain (Ginger, Elaichi etc.)
                const labelText = input.nextSibling.textContent.trim();
                selectedExtras.push(labelText);
            }
        });

        // --- FEATURE 1: DYNAMIC COLOR CHANGING (Type & Milk) ---
        if (selectedType === 'black-tea' || selectedMilk === 'no-milk') {
            // Dark Transparent Black/Lal Chai look
            cupLiquid.style.background = 'linear-gradient(180deg, #5c2c16 0%, #3d1a0b 60%, #1f0b03 100%)';
            steam.style.filter = 'blur(3px) hue-rotate(0deg)';
        } else if (selectedMilk === 'almond-milk') {
            // Lighter/Creamy Almond Milk Chai Look
            cupLiquid.style.background = 'linear-gradient(180deg, #f4dbb9 0%, #dcae7b 60%, #a4774b 100%)';
        } else if (selectedType === 'cold-tea') {
            // Cold Tea look (Thoda dark frosted shade)
            cupLiquid.style.background = 'linear-gradient(180deg, #d38944 0%, #aa6122 60%, #75390e 100%)';
        } else {
            // Regular Milk Tea (Standard Rich Desi Cutting Chai)
            cupLiquid.style.background = 'linear-gradient(180deg, #e19956 0%, #ba7234 60%, #8b4a18 100%)';
        }

        // --- FEATURE 2: DYNAMIC SIZE SCALING (Size) ---
        if (selectedSize === 'small') {
            cup.style.transform = 'scale(0.85)'; // Cup 15% chhota ho jayega
        } else if (selectedSize === 'large') {
            cup.style.transform = 'scale(1.15)'; // Cup 15% bada ho jayega
        } else {
            cup.style.transform = 'scale(1)';    // Medium (Default Size)
        }

        // --- FEATURE 3: LIVE ORDER SUMMARY TEXT ---
        // UI text labels read karte hain readable output ke liye
        const typeLabel = document.querySelector('input[name="tea-type"]:checked').nextSibling.textContent.trim();
        const sizeLabel = document.querySelector('input[name="tea-size"]:checked').nextSibling.textContent.trim();
        const milkLabel = document.querySelector('input[name="tea-milk"]:checked').nextSibling.textContent.trim();

        let summary = `Preparing: ${sizeLabel} ${typeLabel} (${milkLabel})`;

        if (selectedExtras.length > 0) {
            summary += ` + Extra ${selectedExtras.join(' & ')}`;
        }

        visualText.textContent = summary;
    }

    // 3. EVENT LISTENERS
    // Jab bhi koi input badlega (change event), preview update hoga
    allInputs.forEach(input => {
        input.addEventListener('change', updateChaiPreview);
    });

    // Initial load par call karte hain taaki default settings set ho jayein
    updateChaiPreview();
});