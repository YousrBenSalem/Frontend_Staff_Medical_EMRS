import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Plot from "react-plotly.js";

function DoughnutComponent() {
  const [chartData, setChartData] = useState({});
  const { user } = useSelector((state) => state.user);
  const [chartSize, setChartSize] = useState({ width: 500, height: 600 });
  const userId = user.isAssistant ? user.doctorId : user._id;
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setChartSize({ width: 300, height: 400 });
      } else {
        setChartSize({ width: 500, height: 600 });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/patient/chronic-disease-stats", {
        params: { userId: userId },
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        const data = response.data;

        const labels = Object.keys(data);
        const percentages = Object.values(data);

        setChartData({
          labels: labels,
          values: percentages,
        });
      })
      .catch((error) =>
        console.error("Error fetching follow-up statistics", error)
      );
  }, [user]);

  return (
    <div>
      <Plot
        data={[
          {
            type: "pie",
            labels: chartData.labels,
            values: chartData.values,

            hole: 0.4,
            marker: {
              colors: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
              ],
            },
            hovertemplate: "%{label}: %{percent} <extra></extra>",
          },
        ]}
        layout={{
          width: chartSize.width,
          height: chartSize.height,
          title: "Chronic Diseases Distribution",
        }}
      />
    </div>
  );
}

export default DoughnutComponent;
