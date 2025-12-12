function calculateCompatibility(name1, name2) {
    // Simple random percentage for fun
    const percent = Math.floor(Math.random() * 101); // 0–100
    return percent;
}

document.getElementById("checkBtn").addEventListener("click", function () {
    const name1 = document.getElementById("name1").value.trim();
    const name2 = document.getElementById("name2").value.trim();
    if (!name1 || !name2) {
        alert("Please enter both names.");
        return;
    }
    const percent = calculateCompatibility(name1, name2);
    const resultText = document.getElementById("resultText");
    const resultPercent = document.getElementById("resultPercent");
    resultText.textContent = `${name1} ❤️ ${name2}'s love compatibility is:`;
    resultPercent.textContent = `${percent}%`;
});
