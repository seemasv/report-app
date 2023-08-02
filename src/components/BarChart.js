import Typography from "@mui/material/Typography";
import ReactEcharts from "echarts-for-react";

const BarChart = (props) => {
  const barData = props.barData
  console.log(barData)
  return (
    <>
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Bar Data
      </Typography>
      <ReactEcharts
        key={Date.now()}
        theme="light"
        option={{
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          grid: {},
          xAxis: [{
            type: "category",
            data: ["Death","Recoveries","New Cases"]
          }],
          yAxis: [{
            type: "value"
          }],
          series: [{
            name: "",
            type: "bar",
            barWidth: "60%",
            data: [barData.death,barData.recoveries,barData.new_cases]
          }]
        }}
        style={{ width: "100%", height: 400 }}
      />
  </>
  );
};

export default BarChart;
