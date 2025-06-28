import { ResponsivePie } from "@nivo/pie";

const PieChart = ({ data = [], dataKey = "likelihood", nameKey = "region" }) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  const fallbackData = [
    { id: "Sample A", value: 10 },
    { id: "Sample B", value: 15 },
    { id: "Sample C", value: 8 },
    { id: "Sample D", value: 12 },
  ];

  const chartData = isValidData
    ? data
        .filter((d) => d[nameKey] && typeof d[dataKey] === "number")
        .reduce((acc, curr) => {
          const name = curr[nameKey];
          const value = Number(curr[dataKey]);
          const existing = acc.find((item) => item.id === name);
          if (existing) existing.value += value;
          else acc.push({ id: name, value });
          return acc;
        }, [])
        .slice(0, 8) // Limit top 8 regions
    : fallbackData;

  return (
    <div style={{ height: "400px" }}>
      <ResponsivePie
        data={chartData}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
      />
      {!isValidData && (
        <p style={{ color: "gray", textAlign: "center", marginTop: 10 }}>
          Pie Chart
        </p>
      )}
    </div>
  );
};

export default PieChart;
