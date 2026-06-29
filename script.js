const resultEl = document.getElementById('password-result');
const lengthSlider = document.getElementById('length-slider');
const lengthVal = document.getElementById('length-val');
const uppercaseCb = document.getElementById('uppercase');
const lowercaseCb = document.getElementById('lowercase');
const numbersCb = document.getElementById('numbers');
const symbolsCb = document.getElementById('symbols');
const generateBtn = document.getElementById('generate-btn');
const copyBtn = document.getElementById('copy-btn');
const bars = document.querySelectorAll('.bar');

// Character Sets
const charSets = {
    uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lowercase: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+~`|}{[]:;?><,./-='
};

// Update Length Value
lengthSlider.addEventListener('input', (e) => {
    lengthVal.textContent = e.target.value;
});

// Generate Password
const generatePassword = () => {
    const length = +lengthSlider.value;
    const hasUpper = uppercaseCb.checked;
    const hasLower = lowercaseCb.checked;
    const hasNumber = numbersCb.checked;
    const hasSymbol = symbolsCb.checked;

    let allowedChars = '';
    let generatedPassword = '';

    if (hasUpper) allowedChars += charSets.uppercase;
    if (hasLower) allowedChars += charSets.lowercase;
    if (hasNumber) allowedChars += charSets.numbers;
    if (hasSymbol) allowedChars += charSets.symbols;

    if (allowedChars.length === 0) {
        resultEl.value = '';
        updateStrength(0);
        return;
    }

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        generatedPassword += allowedChars[randomIndex];
    }

    resultEl.value = generatedPassword;
    updateStrength(calculateStrength(length, hasUpper, hasLower, hasNumber, hasSymbol));
};

// Calculate Strength
const calculateStrength = (length, upper, lower, num, sym) => {
    let score = 0;
    if (upper) score++;
    if (lower) score++;
    if (num) score++;
    if (sym) score++;
    if (length >= 12) score++;
    if (length >= 16) score++;

    if (score < 3) return 1; // Weak
    if (score < 5) return 2; // Medium
    if (score < 6) return 3; // Good
    return 4; // Strong
};

// Update Strength UI
const updateStrength = (score) => {
    bars.forEach(bar => {
        bar.className = 'bar';
    });

    let colorClass = '';
    if (score === 1) colorClass = 'weak';
    else if (score === 2) colorClass = 'medium';
    else if (score >= 3) colorClass = 'strong';

    for (let i = 0; i < score; i++) {
        bars[i].classList.add('filled', colorClass);
    }
};

// Copy Password
const copyPassword = async () => {
    if (!resultEl.value) return;
    try {
        await navigator.clipboard.writeText(resultEl.value);
        const originalIcon = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span style="font-size:0.8rem; font-weight:600;">COPIED!</span>';
        setTimeout(() => {
            copyBtn.innerHTML = originalIcon;
        }, 2000);
    } catch (err) {
        console.error('Failed to copy', err);
    }
};

// Event Listeners
generateBtn.addEventListener('click', generatePassword);
copyBtn.addEventListener('click', copyPassword);

// Init
generatePassword();
