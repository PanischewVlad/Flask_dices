const backgroundMusic = document.getElementById('background-music');

// Запуск фонової музики при завантаженні сторінки
document.addEventListener('DOMContentLoaded', () => {
    backgroundMusic.volume = 1;
    backgroundMusic.play().catch(err => {
        console.error('Автозапуск фонового звуку заблоковано браузером.', err);
    });
});

// Додавання обробника на кнопку
document.getElementById('gambling-btn').addEventListener('click', () => {
    // Сигналізуємо браузеру, що користувач взаємодіє з сайтом
    const backgroundMusic = document.getElementById('background-music');
    backgroundMusic.play().catch(err => {
        console.error('Не вдалося запустити фонову музику:', err);
    });

    fetch('/roll', { method: 'POST' })
        .then(response => response.json())
        .then(data => {
            // Очистка кубиків
            const dealerDiceContainer = document.getElementById('dealer-dice');
            const playerDiceContainer = document.getElementById('player-dice');
            dealerDiceContainer.innerHTML = '';
            playerDiceContainer.innerHTML = '';

            // Додавання кубиків гравця з затримкою
            setTimeout(() => {
                data.player_dice.forEach(dice => {
                    const img = document.createElement('img');
                    img.src = `/static/images/dice${dice}.png`;
                    playerDiceContainer.appendChild(img);
                });
                new Audio('/static/sounds/dice_roll.mp3').play();
            }, 500); // Затримка 500 мс

            // Додавання кубиків дилера з затримкою
            setTimeout(() => {
                data.dealer_dice.forEach(dice => {
                    const img = document.createElement('img');
                    img.src = `/static/images/dice${dice}.png`;
                    dealerDiceContainer.appendChild(img);
                });
                new Audio('/static/sounds/dice_roll.mp3').play();
            }, 1000); 

            setTimeout(() => {
                if (data.result === 'DEFEAT') {
                    document.body.style.backgroundColor = '#000';
                    document.body.innerHTML = `<h1 style="color: red; font-family: 'Press Start 2P', cursive;">DEFEAT</h1>`;
                    
                    // Повернення до гри через 5 секунд
                    setTimeout(() => {
                        location.reload();
                    }, 5000);
                }
            }, 2000); 
        });
});
