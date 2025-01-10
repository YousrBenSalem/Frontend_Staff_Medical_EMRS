import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Plot from "react-plotly.js";
import Lyout from "../components/lyout/Lyout";

function PatientDashboard() {
  const { patientId } = useParams();
  const [patient, setPatient] = useState(null);
  const { user } = useSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [chartSize, setChartSize] = useState({ width: 1000, height: 500 });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setChartSize({ width: 500, height: 300 });
      } else {
        setChartSize({ width: 1450, height: 500 });
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchPatientName = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/patient/patients/${patientId}`,
          {
            params: { userId: user._id },
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setPatient(response.data.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des détails du patient:",
          error
        );
      }
    };

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/Consultations/all-data/${patientId}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const sortedData = response.data
          .map((d) => ({
            type: d.type,
            ph: d.ph,
            pco2: d.pco2,
            dailyUse: d.dailyUse,
            leaks: d.leaks,
          }))
          .sort((a, b) => new Date(a.date) - new Date(b.date)); // Trier par date croissante

        setData(sortedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
      }
    };

    fetchPatientName();
    fetchData();
  }, [patientId, user._id]);

  const renderPlot = (title, yAxisKey, yAxisTitle, yAxisLineValue) => (
    <div className="flex-1 border bg-white shadow-md cursor-pointer rounded-[4px] mb-[30px]">
      <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
        <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
          {title}
        </h2>
      </div>
      <div>
        <Plot
          data={[
            {
              x: data.map((d) => d.type),
              y: data.map((d) => d[yAxisKey]),
              type: "scatter",
              mode: "lines+markers",
              line: { shape: "spline", color: "blue", width: 2 }, // Courbe lissée
              marker: { color: "blue" },
            },
          ]}
          layout={{
            width: chartSize.width,
            height: chartSize.height,
            title,
            shapes: [
              {
                type: "line",
                x0: 0,
                x1: 1,
                y0: yAxisLineValue,
                y1: yAxisLineValue,
                xref: "paper",
                yref: "y",
                line: {
                  color: "green",
                  width: 2,
                },
              },
            ],
            xaxis: { title: "Consultation type" },
            yaxis: { title: yAxisTitle },
          }}
        />
      </div>
    </div>
  );

  return (
    <Lyout>
      <div className="pt-[2px] px-[10px] bg-white">
        {patient ? (
          <div className="uppercase tracking-wide text-[#308def] text-[18px] leading-[19px] font-bold text-center mt-6 mb-8">
            Dashboard of : {patient?.History?.PatientDemographics?.name}
          </div>
        ) : (
          <p>Patient not found...</p>
        )}
        <div className="grid grid-cols-1 gap-[30px] mt-[22px] w-full ">
          <div className="flex flex-col gap-[30px]">
            {renderPlot("PH Variation", "ph", "pH", 7.36)}
            {renderPlot("PCO2 Variation", "pco2", "PCO2", 40)}
          </div>
          <div className="flex flex-col gap-[30px]">
            {renderPlot("Daily Use Variation", "dailyUse", "Daily Use", 4.5)}
            {renderPlot("Leaks Variation", "leaks", "Leaks", 24)}
          </div>
        </div>
      </div>
    </Lyout>
  );
}

export default PatientDashboard;
