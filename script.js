const phrases = ["Clipping Path", "Jewelry Retouching", "Real Estate Editing", "AI Creative Studio", "Color Correction"];

function toggleText(btn) {
    const moreText = btn.previousElementSibling.querySelector('.more-text');
    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline";
        btn.textContent = "See Less";
    } else {
        moreText.style.display = "none";
        btn.textContent = "See More";
    }
}

function toggleText(btn) {
    const parentP = btn.previousElementSibling;
    const moreText = parentP.querySelector('.more-text');
    
    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline";
        btn.textContent = "See Less";
    } else {
        moreText.style.display = "none";
        btn.textContent = "See More";
    }
}

function toggleText(btn) {
    const parentP = btn.previousElementSibling;
    const moreText = parentP.querySelector('.more-text');
    
    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline";
        btn.textContent = "See Less";
    } else {
        moreText.style.display = "none";
        btn.textContent = "See More";
    }
}