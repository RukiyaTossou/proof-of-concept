const scans = window.scanData;

// Maak voor elke scan een grafiek aan
scans.forEach((item, index) => {
    const ctx = document.getElementById(`myChart-${item.id}`).getContext('2d');
    const data = item.result.slice(1).map(error => error.amount);

    // Lollipop Chart Plugin
    const lollipopChart = {
        id: 'lollipopChart',
        afterDatasetsDraw(chart, args, options) {
            const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
            chart.data.datasets.forEach((dataset, datasetIndex) => {
                const meta = chart.getDatasetMeta(datasetIndex);
                meta.data.forEach((bar, index) => {
                    const { x: barX, y: barY } = bar.tooltipPosition();
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(barX, barY, 5, 0, 2 * Math.PI);
                    ctx.fillStyle = 'blue';
                    ctx.fill();
                    ctx.restore();
                });
            });
        }
    };

    // Nieuwe Chart aanmaken
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Contrast', 'Structureel', 'Alt-teksten', 'Aria-labels'],
            datasets: [{
                label: 'Soorten foutmeldingen',
                data: data,
                backgroundColor: 'rgba(66, 133, 244, 0.2)',
                borderColor: 'rgba(66, 133, 244, 1)',
                borderWidth: 1,
                barPercentage: 0.03
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
        plugins: [lollipopChart]
    });
});

// area chart
