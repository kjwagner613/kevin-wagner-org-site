const video = document.getElementById("myVideo");
const playButton = document.querySelector(".play-unmute-btn");
const volDownButton = document.querySelector(".vol-down-btn");
const volUpButton = document.querySelector(".vol-up-btn");

if (video) {
  // Keep initial load behavior and avoid autoplay surprises.
  video.addEventListener(
    "loadedmetadata",
    () => {
      video.pause();
      video.volume = 0.15;
    },
    { once: true }
  );

  // If user starts playback via native controls, ensure sound is enabled.
  video.addEventListener("play", () => {
    video.muted = false;
  });
}

if (video && playButton) {
  playButton.addEventListener("click", () => {
    video.muted = false;
    if (video.volume === 0) {
      video.volume = 0.15;
    }
    video.play().catch((err) => {
      console.error("Playback failed:", err);
    });
  });
}

if (video && volDownButton) {
  volDownButton.addEventListener("click", () => {
    const nextVolume = Math.max(0, Number((video.volume - 0.1).toFixed(2)));
    video.volume = nextVolume;
  });
}

if (video && volUpButton) {
  volUpButton.addEventListener("click", () => {
    const nextVolume = Math.min(1, Number((video.volume + 0.1).toFixed(2)));
    video.volume = nextVolume;
    if (video.muted && nextVolume > 0) {
      video.muted = false;
    }
  });
}
