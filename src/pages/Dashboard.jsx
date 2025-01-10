import { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { FaRegCalendarMinus } from "react-icons/fa";
import Lyout from "../components/lyout/Lyout";
import PieComponent from "../components/PieComponent/PieComponent";
//import { Progress, Flex } from "antd";
import axios from "axios";
import { useSelector } from "react-redux";
import DoughnutComponent from "../components/PieComponent/DoughnutComponent";
import BiomarkersChart from "../components/PieComponent/BiomarkersChart";

function Dashboard() {
  const [chartSize, setChartSize] = useState({ width: 1000, height: 500 });
  const [consultationType, setConsultationType] = useState("S1");
  const [scores, setScores] = useState([]);
  const [statistics, setStatistics] = useState(null);

  const [data, setData] = useState({ death: [], readmission: [] });
  const { user } = useSelector((state) => state.user);
  const userId = user?.isAssistant ? user?.doctorId : user?._id;

  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.post(
        "http://localhost:3000/api/doctor/profile",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("User data:", res.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };

  const fetchData = async () => {
    try {
      console.log(user._id);
      if (!userId) {
        return;
      }
      const response = await axios.get(
        `http://localhost:3000/api/patient/${userId}/statistics`,
        {
          params: { userId: userId },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setStatistics(response.data);

      console.log(statistics);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
    }
  };
  const fetchKaplanMeierData = async () => {
    try {
      if (!userId) {
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/api/patient/kaplan-meier",
        {},
        {
          params: { userId: userId },
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setData(response.data);
      console.log("Kaplan:", response.data);
    } catch (error) {
      console.error("Error fetching Kaplan-Meier data:", error);
    }
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    getUserData();
    fetchKaplanMeierData();
    fetchData();
  }, []);

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

  const deathPlotData = {
    x: data.death.map((point) => point.time),
    y: data.death.map((point) => point.atRisk),
    type: "scatter",
    mode: "lines",
    step: "hv", // horizontal-vertical steps to create a stair-like curve
    marker: { color: "red" },
    name: "Death",
  };

  const readmissionPlotData = {
    x: data.readmission.map((point) => point.time),
    y: data.readmission.map((point) => point.atRisk),
    type: "scatter",
    mode: "lines",
    step: "hv", // horizontal-vertical steps to create a stair-like curve
    marker: { color: "blue" },
    name: "Readmission",
  };

  const handleTypeChange = (event) => {
    setConsultationType(event.target.value);
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    fetch(`http://localhost:3000/api/provider/provider-scores/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched data:", data);
        if (Array.isArray(data)) {
          setScores(data);
        } else {
          console.error("Data is not an array:", data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const dataProvider = {
    labels: scores.map((score) => score.provider),
    datasets: [
      {
        label: "Scores",
        data: scores.map((score) => score.score),
        backgroundColor: scores.map((score) =>
          score.score > 0
            ? "rgba(75, 192, 192, 0.6)"
            : "rgba(255, 99, 132, 0.6)"
        ),
      },
    ],
  };

  const chartData = [
    {
      type: "bar",
      x: dataProvider.labels,
      y: dataProvider.datasets[0].data,
      marker: {
        color: dataProvider.datasets[0].backgroundColor,
      },
    },
  ];
  if (!userId) {
    return;
  }
  return (
    <Lyout>
      <>
        {" "}
        <section className="px-4 pt-2 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4 pb-4">
            {/* Card components */}
            {[
              {
                label: "Total Patients",
                value: `${statistics?.totalPatients}`,
                color: "#4E73DF",
              },
              {
                label: "The longest-standing patient",
                value: `${
                  statistics?.longestStandingPatient
                    ? new Date(
                        statistics?.longestStandingPatient?.icuPdDischarge?.Autonomy?.DateOfDischarge
                      ).toLocaleDateString()
                    : "N/A"
                }`,
                color: "#9966FF",
              },
              {
                label: "Deaths at 30 days",
                value: `${statistics?.patientsDiedWithin30Days}`,
                color: "#1cc88a",
              },
              {
                label: "Deaths at 90 days",
                value: `${statistics?.patientsDiedWithin90Days}`,
                color: "#FF6384",
              },
              {
                label: "ICU/PD readmissions at 180 days",
                value: `${statistics?.patientsReadmittedWithin180Days}`,
                color: "#FF9F40",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out"
              >
                <div>
                  <h2
                    className={`text-[11px] leading-[17px] font-bold`}
                    style={{ color: card.color }}
                  >
                    {card.label}
                  </h2>
                  <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                    {card.value}
                  </h1>
                </div>
                <FaRegCalendarMinus />
              </div>
            ))}
          </div>

          <div className="grid  gap-[30px] mt-[22px]">
            <div className=" border bg-white shadow-md cursor-pointer rounded-[4px]">
              <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
                <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                  Kaplan-Meier for Death and Readmission
                </h2>
              </div>
              <div className="grid" style={{ width: "100%", height: "auto" }}>
                <Plot
                  data={[deathPlotData, readmissionPlotData]}
                  layout={{
                    width: chartSize.width,
                    height: chartSize.height,
                    title: "Kaplan-Meier for Death and Readmission",
                    xaxis: { title: "Dates of Consultations" },
                    yaxis: { title: "Number of Patients" },
                  }}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-[30px] mt-[22px]">
            {" "}
            <div className="  border bg-white shadow-md cursor-pointer rounded-[4px]">
              <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
                <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                  Distribution of Patient Follow-up
                </h2>
              </div>
              <div className="pl-[30px]">
                <PieComponent />
              </div>
            </div>
            <div className="  border bg-white shadow-md cursor-pointer rounded-[4px]">
              <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
                <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                  Chronic Diseases Distribution
                </h2>
              </div>
              <div className="pl-[30px]">
                {/**/} <DoughnutComponent />
              </div>
            </div>
          </div>

          <div className="grid gap-[30px] mt-[22px]">
            <div className="  border bg-white shadow-md cursor-pointer rounded-[4px]">
              <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
                <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                  COPD Average Biomarkers
                </h2>
              </div>
              <div className="pl-[30px]">
                <label htmlFor="consultationType">Consultation Type:</label>
                <select
                  id="consultationType"
                  value={consultationType}
                  onChange={handleTypeChange}
                  className="mt-2 p-2 border border-gray-300 rounded-md"
                >
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="M1">M1</option>
                </select>

                <BiomarkersChart
                  userId={userId}
                  consultationType={consultationType}
                />
              </div>
            </div>
          </div>
          <div className="grid  gap-[30px] mt-[22px]">
            <div className=" border bg-white shadow-md cursor-pointer rounded-[4px]">
              <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
                <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                  Provider Scores
                </h2>
              </div>
              <div className="grid" style={{ width: "100%", height: "auto" }}>
                <Plot
                  data={chartData}
                  layout={{
                    title: "Provider Scores",
                    xaxis: { title: "Provider" },
                    yaxis: { title: "Score" },
                    paper_bgcolor: "#f8f9fa",
                    plot_bgcolor: "#f8f9fa",
                  }}
                  style={{ width: "100%", height: "400px" }}
                />
              </div>
            </div>
          </div>
        </section>
      </>
    </Lyout>
  );
}

export default Dashboard;
