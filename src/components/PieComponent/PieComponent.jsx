import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Plot from "react-plotly.js";
import { useSelector } from "react-redux";

function PieComponent() {
  const [data, setData] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [chartSize, setChartSize] = useState({ width: 1000, height: 500 });
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
  console.log(user._id);
  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/patient/follow-up-statistics",

        {
          params: { userId: userId },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setData(response.data), console.log(data);
      })
      .catch((error) =>
        console.error("Error fetching follow-up statistics", error)
      );
  }, []);
  const chartData = {
    labels: ["Flow Up <= 1 year", "Flow Up > 1 year"],
    values: [data?.followUpWithinYear, data?.followUpAfterYear],
    type: "pie",
    textinfo: "label+percent",
    marker: {
      colors: ["#FF6384", "#36A2EB"],
    },
  };
  return (
    <div>
      <Plot
        data={[chartData]}
        layout={{
          width: chartSize.width,
          height: chartSize.height,
          title: "Distribution of Patient Follow-up",
          showlegend: true,
        }}
      />
    </div>
  );
}

export default PieComponent;
