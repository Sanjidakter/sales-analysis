<script>
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Filler, Tooltip, Legend);

// Utility function for number formatting
function number_format(number, decimals, dec_point, thousands_sep) {
  number = (number + "").replace(",", "").replace(" ", "");
  const n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = thousands_sep || ",",
    dec = dec_point || ".",
    toFixedFix = (n, prec) => {
      const k = Math.pow(10, prec);
      return "" + Math.round(n * k) / k;
    };
  let s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
  }
  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

export default {
  name: "AreaChart",
  data() {
    return {
      chartInstance: null, // Reference to the Chart.js instance
    };
  },
  mounted() {
    this.fetchDataAndCreateChart();
  },
  methods: {
    async fetchDataAndCreateChart() {
      try {
        // Fetch data from the API
        const response = await fetch("https://analytical-dashboard-backend-rosy.vercel.app/api/dashboard");
        const rawData = await response.json();

        // Process data: Extract Age and Income
        const labels = rawData.map((item) => item.Age); // X-axis (Age)
        const dataPoints = rawData.map((item) => item.Income); // Y-axis (Income)

        // Create the chart
        const ctx = document.getElementById("myAreaChart").getContext("2d");

        this.chartInstance = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "Income by Age",
                lineTension: 0.3,
                backgroundColor: "rgba(78, 115, 223, 0.05)",
                borderColor: "rgba(78, 115, 223, 1)",
                pointRadius: 3,
                pointBackgroundColor: "rgba(78, 115, 223, 1)",
                pointBorderColor: "rgba(78, 115, 223, 1)",
                pointHoverRadius: 3,
                pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
                pointHoverBorderColor: "rgba(78, 115, 223, 1)",
                pointHitRadius: 10,
                pointBorderWidth: 2,
                data: dataPoints,
              },
            ],
          },
          options: {
            plugins: {
              tooltip: {
                backgroundColor: "rgba(0, 0, 0, 0.8)", // Ensure contrast
                bodyFontColor: "#fff",
                titleFont: { size: 14, weight: "bold" },
                titleFontColor: "#fff",
                borderColor: "rgba(0, 0, 0, 0.2)",
                borderWidth: 1,
                displayColors: false,
                intersect: false,
                mode: "index",
                caretPadding: 10,
                callbacks: {
                  label: function (context) {
                    let label = context.dataset.label || "";
                    if (label) label += ": ";
                    label += "$" + number_format(context.raw);
                    return label;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: "Age",
                },
              },
              y: {
                title: {
                  display: true,
                  text: "Income ($)",
                },
              },
            },
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
};
</script>
