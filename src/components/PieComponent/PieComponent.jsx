import { PieChart, Pie, Cell } from "recharts";

const data = [
  { name: "Mean survival time", value: 400 },
  { name: "Mean follow-up time", value: 300 },
  { name: "Maximum survival time", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function PieComponent() {
  return (
    <div>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <div className="grid grid-cols-3">
        {data.map((item, index) => (
          <p key={index} className="cursor-pointer font-bold">
            {item.name}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-3 mt-[15px] mb-[15px]">
        {COLORS.map((item, index) => (
          <div
            key={index}
            className="h-[30px] w-[30px] rounded-full"
            style={{ backgroundColor: item }}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default PieComponent;
