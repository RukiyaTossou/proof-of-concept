// // scripts.js

const carousel = document.querySelector('.allScans');
const autoScans = document.querySelectorAll('.auto-scan');
const leftButton = document.querySelector('.carousel-button-left');
const rightButton = document.querySelector('.carousel-button-right');
const currentDateElement = document.getElementById('current-scan-date').querySelector('span');
const singleScans = document.querySelectorAll('.single-scan'); // Selecteer alle .single-scan elementen
let currentIndex = 0; // Initialize currentIndex to 0
const slideWidth = autoScans[0].clientWidth; // Breedte van de eerste auto-scan
const scores = document.querySelectorAll('.autoScan-score');


updateHeaderCurrentDate();
function updateHeaderCurrentDate() {
    const currentScan = singleScans[currentIndex];
    const scanDate = new Date(currentScan.getAttribute('data-scan-date'));

    // Formateer de datum zoals gewenst
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = monthNames[scanDate.getMonth()];
    if (currentDateElement) {
        currentDateElement.textContent = ` ${formattedDate}`;
    } else {
        console.error('currentDateElement is null or not found.');
    }
}
leftButton.addEventListener('click', leftScroll);
rightButton.addEventListener('click', rightScroll);

function leftScroll() {
    if (currentIndex > 0) {
        currentIndex--;
        carousel.scrollLeft -= slideWidth;
        updateHeaderCurrentDate(); // Datum bijwerken
        console.log('Left button clicked. Current index:', currentIndex);
    }
}

function rightScroll() {
    if (currentIndex < singleScans.length - 1) {
        currentIndex++;
        carousel.scrollLeft += slideWidth;
        updateHeaderCurrentDate(); // Datum bijwerken
        console.log('Right button clicked. Current index:', currentIndex);
    }
}

            
                
                // // Haal alleen de maand op
                // const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                // const formattedDate = monthNames[scanDate.getMonth()];
                
                // currentDateElement.textContent = formattedDate;
        
        
            // rightButton.addEventListener("click", () => {
            //     // Check if there's a next scan to move to
            //     if (currentIndex < allScans.length - 1) {
            //         currentIndex++;
            //         carousel.scrollLeft += slideWidth;
            //         updateDateDisplay();
            //     }
            // });
            
            // leftButton.addEventListener("click", () => {
            //     // Check if there's a previous scan to move to
            //     if (currentIndex > 0) {
            //         currentIndex--;
            //         carousel.scrollLeft -= slideWidth;
            //         updateDateDisplay();
            //     }
            // });
            
            // // Function to update the date display in the header
            // function updateDateDisplay() {
            //     dateDisplay.textContent = carousel[currentIndex].date;
            // }
            
            // // Initial update of date display based on initial currentIndex
            // updateDateDisplay();
            


    //     // Update the date display
    // function updateDateDisplay(index) {
    //     const currentScan = autoScans[index];
    //     const currentDate = currentScan.getAttribute('data-date');
    //     dateDisplay.textContent = currentDate;
    // }

    // Initial date display


    // CAROUSEL

    // rightButton.addEventListener("click", () => {
    //     if (currentIndex < autoScans.length - 1) {
    //         currentIndex++;
    //         carousel.scrollBy({
    //             left: slideWidth,
    //             behavior: 'smooth' // Enable smooth scroll
    //         });
    //         updateDateDisplay(currentIndex);
    //     }
    // });

    // leftButton.addEventListener("click", () => {
    //     if (currentIndex > 0) {
    //         currentIndex--;
    //         carousel.scrollBy({
    //             left: -slideWidth,
    //             behavior: 'smooth' // Enable smooth scroll
    //         });
    //         updateDateDisplay(currentIndex);
    //     }
    // });
    // // Debug log
    // updateDateDisplay(currentIndex);

        
                // rightButton.addEventListener("click", () => {
                //     carousel.scrollLeft += slideWidth; //+ de lengtle van de auto scan  
                
                // });
        
                // leftButton.addEventListener("click", () => {
                //     carousel.scrollLeft -= slideWidth;
                    
                // });


    
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
                        chartBar.style.background = `conic-gradient(#ff2600 ${angle}deg, #ffc0b5 0deg)`;//rood
                        
                    } else if (beginScore > 45 && beginScore <= 75 ) {
                        chartBar.style.background = `conic-gradient(#FF9800 ${angle}deg, #FFE0B3 0deg)`;//oranje
                       
                    } else if (beginScore > 76 && beginScore <= 99) {
                        chartBar.style.background = `conic-gradient(#10ee40 ${angle}deg, #b8fcc7 0deg)`;//groen
                       
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
