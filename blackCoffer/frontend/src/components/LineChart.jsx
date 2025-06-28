import { ResponsiveLine } from "@nivo/line";

const LineChart = ({ data = [], dataKey = "relevance", labelKey = "end_year" }) => {
  const isValidData = Array.isArray(data) && data.length > 0;

  const fallbackData = [
    {
      id: "Dummy Line",
      data: [
        { x: "2018", y: 4 },
        { x: "2019", y: 8 },
        { x: "2020", y: 6 },
        { x: "2021", y: 9 },
        { x: "2022", y: 7 },
      ],
    },
  ];

  const lineData = isValidData
    ? [
        {
          id: "Relevance",
          data: data
            .filter((d) => d[labelKey] && typeof d[dataKey] === "number")
            .map((d) => ({
              x: String(d[labelKey]),
              y: d[dataKey],
            }))
            .slice(0, 20),
        },
      ]
    : fallbackData;

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveLine
        data={lineData}
        margin={{ top: 50, right: 110, bottom: 80, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: -45,
          legend: labelKey,
          legendOffset: 50,
          legendPosition: "middle",
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: dataKey,
          legendOffset: -50,
          legendPosition: "middle",
        }}
        enablePoints={true}
        pointSize={6}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        enableGridX={false}
        enableGridY={true}
        useMesh={true}
      />
      {!isValidData && (
        <p style={{ color: "gray", textAlign: "center", marginTop: 10 }}>
          Line Chart
        </p>
      )}
    </div>
  );
};

export default LineChart;
