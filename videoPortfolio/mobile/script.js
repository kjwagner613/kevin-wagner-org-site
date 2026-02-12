const video = document.getElementById('myVideo');


// Pause immediately after load
video.addEventListener('loadedmetadata', () => {
    video.pause();
});



// Set volume to 15% (0.15)
video.volume = 0.15;

// Pause immediately after load
video.addEventListener('loadedmetadata', () => {
    video.pause();
});

video.addEventListener('click', () => {
    try {
        if (video.paused) {
            // Play and unmute
            video.muted = false;
            video.play().catch(err => {
                console.error("Playback failed:", err);
            });
        } else {
            // Pause video
            video.pause();
        }
    } catch (err) {
        console.error("Error handling video click:", err);
    }
});