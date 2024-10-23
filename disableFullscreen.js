document.addEventListener('DOMContentLoaded', function () {
    const videos = document.querySelectorAll('.myVideo');

    videos.forEach(video => {
        video.addEventListener('fullscreenchange', function () {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        });

        video.addEventListener('play', function () {
            if (document.fullscreenElement) {
                document.exitFullscreen();
            }
        });
    });
});