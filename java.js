/*
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
*/

document.addEventListener('DOMContentLoaded', function () {
    const audioPlayers = document.querySelectorAll('.myAudio'); 

    audioPlayers.forEach((audio) => {
        const playPauseButton = audio.closest('.wrapper').querySelector('.play-pause');
        const seekBar = audio.closest('.wrapper').querySelector('.seek-bar');
        const currentTimeDisplay = audio.closest('.wrapper').querySelector('.audio-time');
        const durationDisplay = audio.closest('.wrapper').querySelector('#duration'); 
		const clickableImage = audio.closest('.wrapper').querySelector('.clickable-image');

        audio.addEventListener('loadedmetadata', () => {
            const duration = audio.duration;
            durationDisplay.textContent = formatTime(duration);
            seekBar.max = duration;
        });

/*
        playPauseButton.addEventListener('click', () => {
			console.log("Play/Pause button clicked");
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = '❚❚'; //pause
            } else {
                audio.pause();
                playPauseButton.textContent = '▶'; //play
            }
        });
		
		clickableImage.addEventListener('click', () => {
			console.log("Image clicked");
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = '❚❚'; //pause
            } else {
                audio.pause();
                playPauseButton.textContent = '▶'; //play
            }
        });
*/
		
		function togglePlayPause() {
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = '❚❚'; // Pause 
            } else {
                audio.pause();
                playPauseButton.textContent = '▶'; // Play 
            }
        }
		
		playPauseButton.addEventListener('click', togglePlayPause);
		clickableImage.addEventListener('click', togglePlayPause);


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

	const allImages = document.querySelectorAll('img');
		allImages.forEach(img => {
			img.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				
			});
		});


	document.querySelectorAll('.toggle-components').forEach(button => {
		button.addEventListener('click', () => {
			const collapse = button.closest('.collapsible').querySelector('.collapsible-items');
			const expanded = button.getAttribute('aria-expanded') === 'true';
			
			collapse.classList.toggle('hidden', expanded);
			button.setAttribute('aria-expanded', !expanded);
			button.textContent = expanded ? '+' : '–'; 
		});

	});

});
	
