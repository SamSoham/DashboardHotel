import { Stack } from "@mui/material";
import { useEffect } from "react";
import Chart from "react-apexcharts";

export default function LineChart({ adultData, day, childData }) {
  var totalAdult = adultData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
  var totalChildren = childData.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);

  var ad = []
  function set(){
    let i=0;
    for(i=1;i<adultData.length;i++){
      ad[i-1]=adultData[i]
    }
  }


  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        padding: "12px 16px",
        gap: "32px",
        alignItems:"center"
      }}
    >
      <Chart
        options={{
          chart: {
            type: "line",
            fontFamily: "'Poppins', sans-serif",
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            }
          },
          xaxis: {
            categories: day,
            title: {
              text: "Date",
            },
          },
          yaxis: {
            title: {
              text: "Number of Adults",
            },
            axisBorder: {
              show: true,
            },
          },
          grid: {
            show: false,
          },
          stroke: {
            curve: "straight",
            width: 3,
            colors: "#438AF6",
          },
          title: {
            text: totalAdult,
            offsetX: 50,
            style: {
              fontSize: "24px",
            },
          },
          subtitle: {
            text: "Total number of Adults",
            offsetX: 50,
            style: {
              fontSize: "14px",
            },
          },
        }}
        height={400}
        width={500}
        series={[
          {
            name: "Adults",
            data: adultData,
          },
        ]}
      />
      <Chart
        options={{
          chart: {
            type: "line",
            fontFamily: "'Poppins', sans-serif",
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            }
          },
          xaxis: {
            categories: day,
            title: {
              text: "Date",
            },
          },
          yaxis: {
            title: {
              text: "Number of Children",
            },
            axisBorder: {
              show: true,
            },
          },
          grid: {
            show: false,
          },
          stroke: {
            curve: "straight",
            width: 3,
            colors: "#438AF6",
          },
          title: {
            text: totalChildren,
            offsetX: 50,
            style: {
              fontSize: "24px",
            },
          },
          subtitle: {
            text: "Total number of Children",
            offsetX: 50,
            style: {
              fontSize: "14px",
            },
          },
        }}
        height={400}
        width={500}
        series={[
          {
            name: "Children",
            data: childData,
          },
        ]}
      />
    </Stack>
  );
}
