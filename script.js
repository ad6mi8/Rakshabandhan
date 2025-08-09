function showMessage(id) {
    document.getElementById(id).style.display = 'block';
}

function launchConfettiBurst() {
    let duration = 2000;
    let end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 7,
            angle: 60,
            spread: 70,
            colors: ['#ff007f', '#ffcc00', '#ffffff'],
            origin: { x: 0 }
        });
        confetti({
            particleCount: 7,
            angle: 120,
            spread: 70,
            colors: ['#ff007f', '#ffcc00', '#ffffff'],
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

function setupMusicOnClick() {
    document.body.addEventListener("click", () => {
        let audio = document.getElementById("bg-music");
        audio.volume = 0; // start silent
        audio.play().then(() => {
            console.log("Music started on click.");
            // Fade in
            let fadeIn = setInterval(() => {
                if (audio.volume < 0.6) {
                    audio.volume = Math.min(audio.volume + 0.05, 0.6);
                } else {
                    clearInterval(fadeIn);
                }
            }, 150);
        }).catch(err => {
            console.log("Could not play music:", err);
        });
    }, { once: true }); // Only run once
}

window.addEventListener("load", () => {
    setupMusicOnClick();
    launchConfettiBurst();
    setInterval(launchConfettiBurst, 3000);
});