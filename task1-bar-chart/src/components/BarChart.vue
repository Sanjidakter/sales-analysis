<script>
import { ref, onMounted } from "vue";
import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

export default {
    name: "BarChart",
    setup() {
        const barChart = ref(null);

        const fetchData = async () => {
            const response = await axios.get("/data.json");
            const data = response.data;

            const labels = data.map((item) => item.Product);
            const totalValues = data.map((item) => item.TotalValue);
            const totalSales = data.map((item) => item.TotalSales);

            return { labels, totalValues, totalSales, data };
        };

        const createChart = async () => {
            const chartData = await fetchData();

            new Chart(barChart.value, {
                type: "bar",
                data: {
                    labels: chartData.labels,
                    datasets: [
                        {
                            label: "Product Data",
                            data: chartData.totalSales,
                           
                            backgroundColor: chartData.totalValues.map((value) => {
                                const colorIntensity = Math.floor((value / 40) * 255);
                                return `rgba(255, ${255 - colorIntensity}, ${160 - colorIntensity / 2}, 0.8)`;
                            }),
                            borderColor: "rgba(0, 0, 0, 0.5)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    layout: {
        padding: {
            right: 80, // Extra space for the scale
        },
    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    const index = context.dataIndex;
                                    const product = chartData.data[index];
                                    return `Product: ${product.Product}\nTotal Sales: ${product.TotalSales}\nTotal Value: ${product.TotalValue}`;
                                },
                            },
                        },
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            ticks: {
                                color: "#000",
                            },
                            title: {
                                display: true,
                                text: "Products",
                                color: "#000",
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "Total Sales",
                                color: "#000",
                            },
                        },
                    },
                },
                plugins: [
                    {
                        id: "colorScale",
                        beforeDraw: function (chart) {
                            const ctx = chart.ctx;
                            // const canvasWidth = chart.width;
                            // const canvasHeight = chart.height;

                            const chartArea = chart.chartArea;
                            const gradientHeight = chartArea.bottom - chartArea.top; // Match height of chart
                            const gradientWidth = 30; // Gradient width
                            const xStart = chartArea.right +20; // Move scale outside the graph
                            const yStart = chartArea.top; // Align with chart top

                            // Create the gradient for the scale
                            const gradient = ctx.createLinearGradient(0, yStart, 0, yStart + gradientHeight);
                            gradient.addColorStop(0, "rgba(255, 70, 20, 0.8)");
                            gradient.addColorStop(1, "rgba(255, 200, 160, 0.8)");

                            // Draw the gradient scale
                            ctx.fillStyle = gradient;
                            ctx.fillRect(xStart, yStart, gradientWidth, gradientHeight);

                            // Add labels for the scale
                            ctx.font = "12px Arial";
                            ctx.fillStyle = "#000";
                            const maxValue = 40;
                            const minValue = 10;
                            const step = 5;
                            const numSteps = (maxValue - minValue) / step;

                            for (let i = 0; i <= numSteps; i++) {
                                const value = minValue + i * step;
                                const yPosition =
                                    yStart + gradientHeight - (i * gradientHeight) / numSteps;
                                ctx.fillText(value.toString(), xStart + 15, yPosition + 4); // Adjust label position
                            }

                            // Add title
                            ctx.save();
                            ctx.translate(xStart + 40, yStart + gradientHeight / 2);
                            ctx.rotate(-Math.PI / 2);
                            ctx.fillText("Total Value", 0, 0);
                            ctx.restore();
                        },
                    },
                ],
            });
        };

        onMounted(() => {
            createChart();
        });

        return {
            barChart,
        };
    },
};
</script>

<template>
    <div class="chart-container">
        <canvas ref="barChart"></canvas>
    </div>
</template>

<style>
.chart-container {
    position: relative;
    width: 100%;
    height: 500px; /* Adjust as needed */
    overflow: visible; /* Allow overflow for the scale */
}


canvas {
    max-width: 90%;
    height: auto;
    overflow: visible; /* Allow gradient drawing outside canvas */
}

</style>
