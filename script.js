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
    audio.volume = 0; // start silent

    audio.play()
        .then(() => {
            // fade in to 0.6 volume
            let fadeIn = setInterval(() => {
                if (audio.volume < 0.6) {
                    audio.volume = Math.min(audio.volume + 0.05, 0.6);
                } else {
                    clearInterval(fadeIn);
                }
            }, 150);
        })
        .catch(() => {
            console.log("Autoplay blocked — will start after first click.");
            document.body.addEventListener("click", () => {
                audio.play();
                audio.volume = 0.6;
            }, { once: true });
        });
}

function playMusic() {
    let audio = document.getElementById("bg-music");

    // Try to autoplay silently
    audio.play().then(() => {
        console.log("Music started muted.");
    }).catch(() => {
        console.log("Autoplay blocked — will wait for interaction.");
    });

    // On first click/tap, unmute and fade in
    document.body.addEventListener("click", () => {
        audio.muted = false; // unmute
        audio.volume = 0; // start fade-in
        audio.play();

        let fadeIn = setInterval(() => {
            if (audio.volume < 0.6) {
                audio.volume = Math.min(audio.volume + 0.05, 0.6);
            } else {
                clearInterval(fadeIn);
            }
        }, 150);
    }, { once: true });
}

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

function playMusic() {
    let audio = document.getElementById("bg-music");
    audio.volume = 0; // start silent

    audio.play().then(() => {
        console.log("Music autoplayed muted.");
        // Auto fade in after 1 second
        setTimeout(() => {
            audio.muted = false;
            let fadeIn = setInterval(() => {
                if (audio.volume < 0.6) {
                    audio.volume = Math.min(audio.volume + 0.05, 0.6);
                } else {
                    clearInterval(fadeIn);
                }
            }, 150);
        }, 1000);
    }).catch(err => {
        console.log("Autoplay blocked in some browsers:", err);
    });
}

window.addEventListener("load", () => {
    playMusic();
    launchConfettiBurst();
    setInterval(launchConfettiBurst, 5000);
});