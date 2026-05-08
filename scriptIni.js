document.addEventListener('DOMContentLoaded', function () {
    const twEl       = document.getElementById('tw-text');
    const subtitle   = document.getElementById('subtitle');
    const enterWrap  = document.getElementById('enterWrap');
    const enterBtn   = document.getElementById('enterBtn');

    if (!twEl) return;

    const msgs = ['Bienvenido a mi Portfolio', 'Welcome to my Portfolio'];
    let mIdx      = 0;
    let cIdx      = 0;
    let deleting  = false;
    let revealed  = false;

    function tick() {
        const word = msgs[mIdx];

        if (!deleting) {
            cIdx++;
            twEl.textContent = word.substring(0, cIdx);
            if (cIdx === word.length) {
                if (!revealed) {
                    revealed = true;
                    setTimeout(() => {
                        if (subtitle)   subtitle.classList.add('show');
                        if (enterWrap)  enterWrap.classList.add('show');
                    }, 500);
                }
                setTimeout(() => { deleting = true; tick(); }, 2200);
                return;
            }
        } else {
            cIdx--;
            twEl.textContent = word.substring(0, cIdx);
            if (cIdx === 0) {
                deleting = false;
                mIdx = (mIdx + 1) % msgs.length;
                setTimeout(tick, 380);
                return;
            }
        }

        setTimeout(tick, deleting ? 55 : 95);
    }

    setTimeout(tick, 700);

    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            window.location.href = 'portfolio.html';
        });
    }
});
