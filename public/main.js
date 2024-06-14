// // scripts.js

    document.addEventListener('DOMContentLoaded', () => {
        const carousel = document.querySelector('.allScans');
        const autoScans = document.querySelectorAll('.auto-scan');
        const leftButton = document.querySelector('.carousel-button-left');
        const rightButton = document.querySelector('.carousel-button-right');
    
        const scores = document.querySelectorAll('.autoScan-score');
    // CAROUSEL
            const slideWidth = autoScans[0].clientWidth;
    
            rightButton.addEventListener("click", () => {
                carousel.scrollLeft += slideWidth;
               
            });
    
            leftButton.addEventListener("click", () => {
                carousel.scrollLeft -= slideWidth;
               
            });
    
          // progress bar 
              
                scores.forEach(scoreElement => {
                    const score = parseInt(scoreElement.textContent, 10); // de 10 zorgt ervoor dat er gehele getallen worden gebruikt
                    animateDoughnutChart(score, 3, scoreElement); 
                });
        
            
            function animateDoughnutChart(endScore, speed, scoreElement) {
                const chartBar = scoreElement.closest('.outer'); //closest voor de dichtbijzijnde outer classe
                let beginScore = 0;//begin de score bij nul
                let timer = setInterval(() => {
                    beginScore += 1; //verhoog de beginscore 
                    let angle = (beginScore / 100) * 360;//hele cirkel
            
                    chartBar.style.background = `conic-gradient(#4285f4 ${angle}deg, #fff 0deg)`; // de gradient kleuren 
                    scoreElement.textContent = `${beginScore} %`; //de text (percentage)gaat mee met de progressbar
            
                    if (beginScore >= endScore) { //stop de animatie als de eidscore is bereikt 
                        clearInterval(timer);
                    }
                }, speed);//de gegeven snelhei 3ms
            }
            
    });
