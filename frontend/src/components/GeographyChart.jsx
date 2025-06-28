import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures"; // your static world map JSON

const GeographyChart = ({ data = [] }) => {
  const chartData = data
    .filter((d) => d.country)
    .reduce((acc, curr) => {
      const found = acc.find((item) => item.id === curr.country);
      if (found) {
        found.value += curr.intensity || 1;
      } else {
        acc.push({ id: curr.country, value: curr.intensity || 1 });
      }
      return acc;
    }, []);

  return (
    <div style={{ height: "400px" }}>
      <ResponsiveChoropleth
        data={chartData}
        features={geoFeatures.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        domain={[0, 100]}
        unknownColor="#666"
        label="properties.name"
        valueFormat=".2s"
        projectionScale={110}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        borderWidth={0.5}
        borderColor="#ffffff"
        legends={[
          {
            anchor: "bottom-left",
            direction: "column",
            translateX: 20,
            translateY: -60,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: "left-to-right",
            itemTextColor: "#999",
            symbolSize: 18,
          },
        ]}
      />
    </div>
  );
};

export default GeographyChart;
