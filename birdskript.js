$(document).ready(function() {
    let bird = $('#bird');
    let birdY = 200;
    let velocity = 0;
    let gravity = 0.1;      // Reduced fall speed (was 0.4)
    let jump = -5;          // Slightly adjusted jump
    let score = 0;
    let gameRunning = true;
    let pipes = [];
    let gameContainer = $('#game-container');

    let gameState = {
        score: 0,
        highestScore: localStorage.getItem('flappyHighest') || 0
    };

    function createPipe() {
        if (!gameRunning) return;
        
        let gap = 160;
        let minHeight = 60;
        let maxHeight = 280;
        let pipeTopHeight = Math.random() * (maxHeight - minHeight) + minHeight;
        let pipeBottomHeight = $(window).height() - pipeTopHeight - gap;

        let pipeTop = $("<div class='pipe'></div>").css({
            left: '100%',
            top: 0,
            height: pipeTopHeight + 'px'
        });

        let pipeBottom = $("<div class='pipe'></div>").css({
            left: '100%',
            top: (pipeTopHeight + gap) + 'px',
            height: pipeBottomHeight + 'px'
        });

        gameContainer.append(pipeTop, pipeBottom);
        pipes.push({top: pipeTop, bottom: pipeBottom});

        pipeTop.animate({left: '-100px'}, 4500, function() {
            $(this).remove();
            pipes = pipes.filter(p => p.top[0] !== this);
            if (gameRunning) score++;
            updateScore();
        });

        pipeBottom.animate({left: '-100px'}, 4500, function() {
            $(this).remove();
            pipes = pipes.filter(p => p.bottom[0] !== this);
        });
    }

    function updateBird() {
        if (!gameRunning) return;
        
        velocity += gravity;
        birdY += velocity;
        
        if (birdY > $(window).height() - 60) {
            gameOver();
            return;
        }
        if (birdY < 0) {
            birdY = 0;
            velocity = 0;
        }
        
        bird.css('top', birdY + 'px');
    }

    function checkCollisions() {
        if (!gameRunning) return;
        
        let birdRect = bird[0].getBoundingClientRect();
        let containerRect = gameContainer[0].getBoundingClientRect();
        
        pipes.forEach(function(pipePair) {
            if (!pipePair.top[0] || !pipePair.bottom[0]) return;
            
            let topRect = pipePair.top[0].getBoundingClientRect();
            let bottomRect = pipePair.bottom[0].getBoundingClientRect();
            
            if (birdRect.right > topRect.left && 
                birdRect.left < topRect.right && 
                birdRect.bottom > topRect.top && 
                birdRect.top < topRect.bottom) {
                gameOver();
                return;
            }
            
            if (birdRect.right > bottomRect.left && 
                birdRect.left < bottomRect.right && 
                birdRect.bottom > bottomRect.top && 
                birdRect.top < bottomRect.bottom) {
                gameOver();
                return;
            }
        });
    }

    function updateScore() {
        $('#scorebox').text('Score: ' + score);
    }

    function gameOver() {
        gameRunning = false;
        clearInterval(pipeInterval);
        clearInterval(birdInterval);
        clearInterval(collisionInterval);
        
        if (score > gameState.highestScore) {
            gameState.highestScore = score;
            localStorage.setItem('flappyHighest', score);
        }
        
        $('#final-score').text(score + ' (High: ' + gameState.highestScore + ')');
        $('#game-over').fadeIn(500);
    }

    function restartGame() {
        gameRunning = true;
        score = 0;
        birdY = 200;
        velocity = 0;
        pipes = [];
        $('.pipe').remove();
        $('#game-over').fadeOut(500);
        updateScore();
        
        pipeInterval = setInterval(createPipe, 2500);  // Slower pipe generation (was 2500)
        birdInterval = setInterval(updateBird, 210);
        collisionInterval = setInterval(checkCollisions, 20);
    }

    $(document).keydown(function(e) {
        if (e.key === ' ' && gameRunning) {
            e.preventDefault();
            velocity = jump;
        }
    });

    gameContainer.click(function(e) {
        if (gameRunning) {
            e.preventDefault();
            velocity = jump;
        }
    });

    $('#restart-btn').click(restartGame);

    let pipeInterval = setInterval(createPipe, 2500);
    let birdInterval = setInterval(updateBird, 10);
    let collisionInterval = setInterval(checkCollisions, 20);
});
