import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

export default function AreaChart({ totalData, day, country, visitor }) {
  return (
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems:"center"
      }}
    >
      <Chart
        options={{
          chart: {
            type: "area",
            fontFamily: "'Poppins', sans-serif",
            toolbar: {
              autoSelected: "zoom",
              tools: {
                download: false,
                pan: false,
              },
            },
          },
          zoom: {
            type: "x",
            enabled: true,
            autoScaleYaxis: true,
          },
          xaxis: {
            categories: day,
            title: {
              text: "Date",
            },
          },
          yaxis: {
            title: {
              text: "Number of Vistors",
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
        }}
        height={400}
        width={500}
        series={[
          {
            name: "Total Visitors",
            data: totalData,
          },
        ]}
      />
      <Chart
        type="bar"
        options={{
          chart: {
            fontFamily: "'Poppins', sans-serif",
            toolbar: {
              show: false,
            },
          },
          xaxis: {
            categories: country,
            title: {
              text: "Country",
            },
          },
          yaxis: {
            title: {
              text: "Number of Visitor",
            },
            axisBorder: {
              show: true,
            },
          },
          plotOptions: {
            bar: {
              borderRadius: 10,
              dataLabels: {
                position: "top",
              },
            },
          },
          dataLabels: {
            enabled: true,
            offsetY: -30,
            style: {
              fontSize: "12px",
              colors: ["#304758"],
            },
          },
        }}
        height={400}
        width={500}
        series={[
          {
            name: "Total Visitors",
            data: visitor,
          },
        ]}
      />
    </Stack>
  );
}
