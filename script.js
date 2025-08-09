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
    audio.muted = true; // start muted for autoplay

    audio.play()
        .then(() => {
            // unmute smoothly after autoplay starts
            setTimeout(() => {
                audio.muted = false;
            }, 500);
        })
        .catch(() => {
            console.log("Autoplay blocked — waiting for user interaction.");
            document.body.addEventListener("click", () => {
                audio.muted = false; // make sure it’s unmuted
                audio.play();
            }, { once: true });
        });
}

window.addEventListener("load", () => {
    // Try to start music
    playMusic();

    // Confetti right away
    launchConfettiBurst();

    // Confetti burst every 5 seconds
    setInterval(launchConfettiBurst, 5000);
});