import { ResponsiveBar } from "@nivo/bar";

const BarChart = ({ data = [], dataKey = "intensity", labelKey = "topic" }) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  const fallbackData = [
    { [labelKey]: "Sample A", [dataKey]: 10 },
    { [labelKey]: "Sample B", [dataKey]: 15 },
    { [labelKey]: "Sample C", [dataKey]: 8 },
    { [labelKey]: "Sample D", [dataKey]: 12 },
    { [labelKey]: "Sample E", [dataKey]: 7 },
    { [labelKey]: "Sample F", [dataKey]: 20 },
    { [labelKey]: "Sample G", [dataKey]: 4 },
    { [labelKey]: "Sample H", [dataKey]: 16 },
    { [labelKey]: "Sample I", [dataKey]: 6 },
    { [labelKey]: "Sample J", [dataKey]: 9 },
  ];

  const chartData = isValidData ? data : fallbackData;

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <ResponsiveBar
        data={chartData}
        keys={[dataKey]}
        indexBy={labelKey}
        margin={{ top: 50, right: 30, bottom: 100, left: 60 }}
        padding={0.2} // ⬅️ Thin bars
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "category10" }}
        axisBottom={{
          tickRotation: -45,
          legend: labelKey,
          legendOffset: 80,
        }}
        axisLeft={{
          legend: dataKey,
          legendOffset: -50,
        }}
        enableLabel={false}
      />
      {!isValidData && (
        <p style={{ color: "gray", textAlign: "center", marginTop: 10 }}>
          Bar Chart
        </p>
      )}
    </div>
  );
};

export default BarChart;
