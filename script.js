function showMessage(id) {
    document.getElementById(id).style.display = 'block';
}

function launchConfettiBurst() {
    let duration = 2000; // 2 seconds per burst
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

function playMusic() {
    let audio = document.getElementById("bg-music");
    audio.volume = 0.6;
    audio.muted = true;

    audio.play()
        .then(() => {
            setTimeout(() => {
                audio.muted = false;
            }, 300);
        })
        .catch(() => {
            console.log("Autoplay blocked — will start after first click.");
            document.body.addEventListener("click", () => {
                audio.play();
            }, { once: true });
        });
}

window.addEventListener("load", () => {
    // Start music
    playMusic();

    // Run confetti immediately
    launchConfettiBurst();

    // Repeat confetti burst every 5 seconds
    setInterval(launchConfettiBurst, 5000);
});