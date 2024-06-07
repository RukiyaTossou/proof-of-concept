document.addEventListener('DOMContentLoaded', function () {
    const scans = JSON.parse(document.getElementById('scans-data').textContent);
    scans.forEach(item => {
        var ctx = document.getElementById(`chart-${item.id}`).getContext('2d');
        var score = item.score;
        var chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                datasets: [{
                    data: [score, 100 - score],
                    backgroundColor: ['#4caf50', '#e0e0e0']
                }]
            },
            options: {
                cutout: '80%',
                plugins: {
                    tooltip: {
                        enabled: false
                    },
                    legend: {
                        display: false
                    }
                }
            }
        });
    });
    <div class="pie-chart">
    <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={allScans.score}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
        </PieChart>
</div>
});
