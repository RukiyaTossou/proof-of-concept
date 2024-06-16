// // scripts.js


        const carousel = document.querySelector('.allScans');
        const autoScans = document.querySelectorAll('.auto-scan');
        const leftButton = document.querySelector('.carousel-button-left');
        const rightButton = document.querySelector('.carousel-button-right');
    
        const scores = document.querySelectorAll('.autoScan-score');
    // CAROUSEL
            const slideWidth = autoScans[0].clientWidth; // 1 autoscan
    
            rightButton.addEventListener("click", () => {
                carousel.scrollLeft += slideWidth; //+ de lengtle van de auto scan  
               
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
                 // dit zijn if statements voor de kleuren van de score bar
                    if( beginScore <= 45 ){
                        chartBar.style.background = `conic-gradient(#ff2600 ${angle}deg, #fff 0deg)`;//rood
                        
                    } else if (beginScore > 45 && beginScore <= 75 ) {
                        chartBar.style.background = `conic-gradient(#FF9800 ${angle}deg, #fff 0deg)`;//oranje
                       
                    } else if (beginScore > 76 && beginScore <= 99) {
                        chartBar.style.background = `conic-gradient(#10ee40 ${angle}deg, #fff 0deg)`;//groen
                       
                    } else {
                        chartBar.style.background = `conic-gradient(#4285f4 ${angle}deg, #fff 0deg)`;  //blauw
                    }

                    scoreElement.textContent = `${beginScore} %`; //de text (percentage)gaat mee met de progressbar 
                     // de gradient kleuren 
                    
                    if (beginScore >= endScore) { //stop de animatie als de eidscore is bereikt 
                        clearInterval(timer);
                    }
                }, speed);//de gegeven snelhei 3ms
            }
