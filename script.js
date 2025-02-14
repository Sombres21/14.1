document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const countdown = document.getElementById('countdown');
    const scene1 = document.getElementById('scene1');
    const scene2 = document.getElementById('scene2');
    const scene3 = document.getElementById('scene3');
    const scene4 = document.getElementById('scene4');
    const music1 = document.getElementById('music1');
    const music2 = document.getElementById('music2');
    const music3 = document.getElementById('music3');
    const noButton = document.getElementById('noButton');
    const yesButton = document.getElementById('yesButton');
    const loveGif = document.getElementById('loveGif');
    const loveMessage = document.getElementById('loveMessage');
    const nextSceneButton = document.getElementById('nextSceneButton');
    const lyricsText = document.getElementById('lyricsText');

    let isTransitioning = false;

    function stopAllMusic() {
        music1.pause();
        music2.pause();
        music3.pause();
        music1.currentTime = 0;
        music2.currentTime = 0;
        music3.currentTime = 0;
    }

    // Начальная кнопка
    startButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        startButton.style.display = 'none';
        countdown.style.display = 'block';
        let count = 5;

        stopAllMusic();
        music1.play().catch(console.error);

        const timer = setInterval(() => {
            countdown.textContent = count;
            count--;

            if (count < 0) {
                clearInterval(timer);
                countdown.style.display = 'none';
                scene1.style.display = 'none';
                scene2.style.display = 'flex';

                const photoContainer = document.querySelector('.photo-container');
                photoContainer.classList.add('visible');

                // Показываем кнопку "Далее" через 4 секунды
                setTimeout(() => {
                    nextSceneButton.classList.add('visible');
                }, 4000);

                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });

                isTransitioning = false;
            }
        }, 1000);
    });

    // Кнопка перехода к третьей сцене
    nextSceneButton.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        stopAllMusic();
        music2.play().catch(console.error);

        // Переход к третьей сцене
        scene2.style.opacity = '0';
        setTimeout(() => {
            scene2.style.display = 'none';
            scene3.style.display = 'flex';
            scene3.style.opacity = '1';
        }, 1000);

        window.scrollTo({
            top: window.innerHeight * 2,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isTransitioning = false;
        }, 1000);
    });

    // Кнопка "Да"
    yesButton.addEventListener('click', () => {
        stopAllMusic();
        music3.play().catch(console.error);
        loveGif.style.display = 'block';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
        loveMessage.style.display = 'block';
    });

    // Убегающая кнопка "Нет"
    let noButtonAttempts = 0;
    const maxAttempts = 10;

    noButton.addEventListener('mouseover', () => {
        if (noButtonAttempts >= maxAttempts) {
            noButton.style.transform = 'none';
            noButton.disabled = true;
            return;
        }

        const container = document.querySelector('.buttons-container');
        const containerRect = container.getBoundingClientRect();
        const buttonRect = noButton.getBoundingClientRect();

        let newX, newY;
        do {
            newX = Math.random() * (containerRect.width - buttonRect.width);
            newY = Math.random() * (containerRect.height - buttonRect.height);
        } while (
            Math.abs(newX - buttonRect.left) < buttonRect.width &&
            Math.abs(newY - buttonRect.top) < buttonRect.height
            );

        noButton.style.transform = `translate(${newX}px, ${newY}px)`;
        noButtonAttempts++;
    });

    // Lyrics changing mechanism
    const lyrics = [
        "I can give you everything, ayy",
        "Blood on the wedding ring, damn",
        "I can make her levitate, ayy",
        "I can make her medicate",
        "Drugs in my winter coat, ayy",
        "Got my plug on a fishing boat, damn",
        "That feeling never getting old, ayy",
        "You don't ever listen ho, damn"
    ];
    let currentLyricIndex = 0;

    function changeLyrics() {
        lyricsText.textContent = lyrics[currentLyricIndex];
        currentLyricIndex = (currentLyricIndex + 1) % lyrics.length;
    }

    setInterval(changeLyrics, 4000); // Change lyrics every 3 seconds
});