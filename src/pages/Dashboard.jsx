import Lyout from "../components/lyout/Lyout";
import { FaRegCalendarMinus } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Flex, Progress } from "antd";
import PieComponent from "../components/PieComponent/PieComponent";
import { useState, useEffect } from "react";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

function Dashboard() {
  const [chartSize, setChartSize] = useState({ width: 1000, height: 500 });

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setChartSize({ width: 500, height: 300 });
      } else {
        setChartSize({ width: 1000, height: 500 });
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <Lyout>
      <div className="pt-[2px] px-[10px] bg-white ">
        <div className="grid grid-cols-4 gap-[30px] mt-[25px] pb-[15px]">
          <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out ">
            <div>
              <h2 className="text-[#B589DF] text-[11px] leading-[17px] font-bold ">
                Total Patients
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                100
              </h1>
            </div>
            <FaRegCalendarMinus />
          </div>
          <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out ">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold ">
                Deaths at 30 days
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                2
              </h1>
            </div>
            <FaRegCalendarMinus />
          </div>
          <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out ">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold ">
                Deaths at 90 days
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                4
              </h1>
            </div>
            <FaRegCalendarMinus />
          </div>
          <div className="h-[100px] rounded-[8px] bg-white border-l-[4px] border-[#4E73DF] flex items-center justify-between px-[30px] cursor-pointer hover:shadow-lg transform hover:scale-[103%] transition duration-300 ease-out ">
            <div>
              <h2 className="text-[#1cc88a] text-[11px] leading-[17px] font-bold ">
                ICU/PD readmissions at 180 days
              </h2>
              <h1 className="text-[20px] leading-[24px] font-bold text-[#5a5c69] mt-[5px]">
                3
              </h1>
            </div>
            <FaRegCalendarMinus />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row mt-[22px] w-full gap-[30px]">
          <div className="flex-1 sm:basis-[70%] border bg-white shadow-md cursor-pointer rounded-[4px]">
            <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
              <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                Deaths indexed
              </h2>
            </div>
            <div>
              <LineChart
                width={chartSize.width}
                height={chartSize.height}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </div>
          </div>
          <div className="flex-1 sm:basis-[30%] border bg-white shadow-md cursor-pointer rounded-[4px]">
            <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
              <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                Mean survival, follow-up time and Maximum survival time (months)
              </h2>
            </div>
            <div className="pl-[30px]">
              <PieComponent />
            </div>
          </div>
        </div>

        <div className="flex mt-[22px]  gap-[30px] shadow-md cursor-pointer rounded-[4px]">
          <div className="basis-[55%] border bg-white shadow-md cursor-pointer rounded-[4px]">
            <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
              <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                Provider : delays for requested docs
              </h2>
            </div>
            <div className="px-[25px] py-[15px] space-y-[15px]">
              <Flex gap="small" vertical>
                <div>
                  <h2>Provider 1</h2>
                  <Progress
                    percent={30}
                    strokeColor="#0088FE"
                    status="active"
                  />
                </div>
                <div>
                  <h2>Provider 2</h2>
                  <Progress
                    percent={50}
                    strokeColor="#02EAF6"
                    status="active"
                  />
                </div>
                <div>
                  <h2>Provider 3</h2>
                  <Progress
                    percent={70}
                    strokeColor="#0A803C"
                    status="active"
                  />
                </div>
                <div>
                  <h2>Provider 4</h2>
                  <Progress
                    percent={100}
                    strokeColor="#66DC67"
                    status="active"
                  />
                </div>
                <div>
                  <h2>Provider 5</h2>
                  <Progress
                    percent={50}
                    strokeColor="#C2668A"
                    status="active"
                  />
                </div>
                <div>
                  <h2>Provider 6</h2>
                  <Progress
                    percent={50}
                    strokeColor="#C7DDBA"
                    status="active"
                  />
                </div>
                <div>
                  <h2>Provider 7</h2>
                  <Progress
                    percent={50}
                    strokeColor="#FC2869"
                    status="active"
                  />
                </div>
              </Flex>
            </div>
          </div>
          <div className="basis-[45%]  border bg-white shadow-md cursor-pointer rounded-[4px]">
            <div className="bg-[#F8F9FC] py-[15px] px-[20px] border-b-[1px] border-[#EDEDED] mb-[20px]">
              <h2 className="text-[#308def] text-[16px] leading-[19px] font-bold">
                Family Satisfaction
              </h2>
            </div>
            <div className=" space-y-[15px]">
              <div className="flex flex-col sm:flex-row gap-small items-center text-center justify-between">
                {/* Premier groupe de cercles de progression */}
                <div className="flex flex-col px-[50px] ">
                  <h2>Positive</h2>
                  <Progress
                    type="circle"
                    className="mb-20  " // Espacement entre les cercles sur tous les affichages
                    format={() => "😊"}
                    percent={75}
                    strokeColor="#06FF00"
                  />
                  <h2>Neutral</h2>
                  <Progress
                    type="circle"
                    percent={70}
                    format={() => "😐"}
                    strokeColor="#FFE400"
                  />
                </div>

                {/* Deuxième groupe de cercles de progression */}
                <div className="flex flex-col px-[50px] py-14">
                  <h2>Negative</h2>
                  <Progress
                    type="circle"
                    className="mb-20" // Espacement entre les cercles sur tous les affichages
                    format={() => "😢"}
                    percent={100}
                    strokeColor="#FF1700"
                  />
                  <h2>No emotion</h2>
                  <Progress
                    type="circle"
                    percent={100}
                    format={() => "😑"}
                    strokeColor="#FF8E00"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Lyout>
  );
}

export default Dashboard;
