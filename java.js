


document.addEventListener('DOMContentLoaded', function () {
    const audioPlayers = document.querySelectorAll('.myAudio'); 

    audioPlayers.forEach((audio) => {
        const wrapper = audio.closest('.wrapper, .multiple-wrapper-item');
		const playPauseButton = wrapper.querySelector('.play-pause');
		const seekBar = wrapper.querySelector('.seek-bar');
		const currentTimeDisplay = wrapper.querySelector('.current-time');
		const durationDisplay = wrapper.querySelector('.duration');
		const clickableImage = wrapper.querySelector('.clickable-image');

        audio.addEventListener('loadedmetadata', () => {
            const duration = audio.duration;
            durationDisplay.textContent = formatTime(duration);
            seekBar.max = duration;
        });
		

		function togglePlayPause() {

			if (audio.paused) {

				audioPlayers.forEach(otherAudio => {
					if (otherAudio !== audio) {
						otherAudio.pause();

						const otherWrapper = otherAudio.closest('.wrapper, .multiple-wrapper-item');
						const otherButton = otherWrapper.querySelector('.play-pause');
						otherButton.textContent = '▶';
					}
				});

				audio.play();
				playPauseButton.textContent = '❚❚';

			} else {
				audio.pause();
				playPauseButton.textContent = '▶';
			}
		}		
		
		

/* (play at the same time)		
		function togglePlayPause() {
            if (audio.paused) {
                audio.play();
                playPauseButton.textContent = '❚❚'; // Pause 
            } else {
                audio.pause();
                playPauseButton.textContent = '▶'; // Play 
            }
        }
		
*/
		
		playPauseButton.addEventListener('click', togglePlayPause);
		clickableImage.addEventListener('click', togglePlayPause);


        audio.addEventListener('timeupdate', () => {
            currentTimeDisplay.textContent = formatTime(audio.currentTime);
            seekBar.value = audio.currentTime;
        });

        seekBar.addEventListener('input', () => {
            audio.currentTime = seekBar.value;
        });
    
	
		const timestamps = audio.closest('.wrapper, .multiple-wrapper-item').querySelectorAll('.timestamp');
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
	
