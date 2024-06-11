// // scripts.js
//     const carousel = document.querySelector('.allScans');
//     const autoScans = document.querySelectorAll('.auto-scan');
//     const leftButton = document.querySelector('.carousel-button-left');
//     const rightButton = document.querySelector('.carousel-button-right');
    document.addEventListener('DOMContentLoaded', () => {
        function animateDoughnutChart(endScore, speed) {
            let chartBars = document.querySelectorAll('.outer');
            let scorePercentage = document.querySelectorAll('.autoScan-score');
            
            let beginScore = 0;
            let timer = setInterval(() => {
                beginScore += 1;
                let angle = (beginScore / 100) * 360;
                
                chartBars.forEach((chartBar, index) => {
                    chartBar.style.background = `conic-gradient(#4285f4 ${angle}deg, #fff 0deg)`;
                    scorePercentage[index].textContent = `${beginScore} %`;
                });

                if (beginScore >= endScore) {
                    clearInterval(timer);
                }
            }, speed);
        }

        // Call the function to animate the chart
        animateDoughnutChart(54, 3); // 54% with speed of 50ms per increment
    });
