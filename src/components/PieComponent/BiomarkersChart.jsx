/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import Plot from "react-plotly.js";

const BiomarkersChart = ({ userId, consultationType }) => {
  const [data, setData] = useState([]);
  const [chartSize, setChartSize] = useState({ width: 1000, height: 500 });

  useEffect(() => {
    if (consultationType && userId) {
      axios
        .get(
          `http://localhost:3000/api/patient/average-biomarkers/${consultationType}/${userId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          // Trier les données par date en ordre croissant
          const sortedData = response.data.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setData(sortedData);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [consultationType, userId]);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setChartSize({ width: 400, height: 400 });
      } else {
        setChartSize({ width: 1200, height: 600 });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Préparer les données pour le graphique
  const plotData = [
    {
      x: data.map((entry) => new Date(entry.date).toLocaleDateString()),
      y: data.map((entry) => entry.PH),
      type: "scatter",
      mode: "lines+markers",
      name: "PH",
      line: { color: "#FF6384", width: 2 },
    },
    {
      x: data.map((entry) => new Date(entry.date).toLocaleDateString()),
      y: data.map((entry) => entry.PCO2),
      type: "scatter",
      mode: "lines+markers",
      name: "PCO2",
      line: { color: "#36A2EB", width: 2 },
    },
    {
      x: data.map((entry) => new Date(entry.date).toLocaleDateString()),
      y: data.map((entry) => entry.PO2),
      type: "scatter",
      mode: "lines+markers",
      name: "PO2",
      line: { color: "#4BC0C0", width: 2 },
    },
    {
      x: data.map((entry) => new Date(entry.date).toLocaleDateString()),
      y: data.map((entry) => entry.DailyUse),
      type: "scatter",
      mode: "lines+markers",
      name: "Daily Use",
      line: { color: "#9966FF", width: 2 },
    },
    {
      x: data.map((entry) => new Date(entry.date).toLocaleDateString()),
      y: data.map((entry) => entry.Leaks),
      type: "scatter",
      mode: "lines+markers",
      name: "Leaks",
      line: { color: "#FF9F40", width: 2 },
    },
  ];

  const layout = {
    title: "COPD Average Biomarkers over Time",
    xaxis: {
      title: "Date",
      tickangle: -45,
    },
    yaxis: {
      title: "Value",
    },
    margin: { t: 50, b: 100, l: 60, r: 30 },
    height: chartSize.height,
    width: chartSize.width,
  };

  return (
    <div>
      <div style={{ width: chartSize.width, height: chartSize.height }}>
        {data.length ? (
          <Plot data={plotData} layout={layout} />
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default BiomarkersChart;
