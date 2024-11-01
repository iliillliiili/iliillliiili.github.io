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

document.addEventListener('DOMContentLoaded', function () {
    const audioPlayers = document.querySelectorAll('.myAudio'); 

    audioPlayers.forEach((audio) => {
        const playPauseButton = audio.closest('.wrapper').querySelector('.play-pause');
        const seekBar = audio.closest('.wrapper').querySelector('.seek-bar');
        const currentTimeDisplay = audio.closest('.wrapper').querySelector('.audio-time');
        const durationDisplay = audio.closest('.wrapper').querySelector('#duration'); 

        audio.addEventListener('loadedmetadata', () => {
            const duration = audio.duration;
            durationDisplay.textContent = formatTime(duration);
            seekBar.max = duration;
        });

        playPauseButton.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = '❚❚'; //pause
            } else {
                audio.pause();
                playPauseButton.textContent = '▶'; //play
            }
        });

        audio.addEventListener('timeupdate', () => {
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
            seekBar.value = audio.currentTime;
        });

        seekBar.addEventListener('input', () => {
            audio.currentTime = seekBar.value;
        });
    
	
		const timestamps = audio.closest('.wrapper').querySelectorAll('.timestamp');
		timestamps.forEach(timestamp => {
			timestamp.addEventListener('click', function (event) {
				event.preventDefault(); 
				const time = parseInt(this.getAttribute('data-time'));
				audio.currentTime = time; 
				audio.play(); 
				playPauseButton.textContent = '❚❚';
			});
		});
	
	});
	
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});

	
