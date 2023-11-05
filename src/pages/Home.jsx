import { Button, Stack, Snackbar, Alert, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import data from "../data.json";
import LineChart from "../components/lineChart";
import AreaChart from "../components/AreaChart";

export default function Home() {
  const date = dayjs().year(2015).month(6).date(6).hour(0);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [from, setFrom] = useState(date.subtract(5, "day"));
  const [to, setTo] = useState(date);

  const [adult, setAdult] = useState([]);
  const [child, setChild] = useState([]);
  const [total, setTotal] = useState([]);
  const [day, setDay] = useState([]);
  const [country, setCountry] = useState([]);

  const [open, setOpen] = useState(false);
  const [people, setPeople] = useState([]);


  function getData({data,dt}) {
    if (to.diff(from, "day") <= 20) {
      const ainfo = [];
      const cinfo = [];
      const tinfo = [];
      const visitorCounts = [];
      const set = new Set();
      const countries = new Set();
      var count = [];
      let i = 0;

      cinfo[0] = 0;
      ainfo[0] = 0;
      tinfo[0] = 0;

      data.map((x) => {
        set.add(`${x.arrival_date_day_of_month} ${x.arrival_date_month}`);
        countries.add(x.country);
        let country = x.country;
        if (ainfo[x.arrival_date_day_of_month]) {
          ainfo[x.arrival_date_day_of_month] += x.adults;
          cinfo[x.arrival_date_day_of_month] += x.children + x.babies;
          tinfo[x.arrival_date_day_of_month] +=
            x.children + x.babies + x.adults;
        } else {
          ainfo[x.arrival_date_day_of_month] = x.adults;
          cinfo[x.arrival_date_day_of_month] = x.children + x.babies;
          tinfo[x.arrival_date_day_of_month] = x.children + x.babies + x.adults;
        }
        if (visitorCounts[country]) {
          visitorCounts[country] += 1;
        } else {
          visitorCounts[country] = 1;
        }
      });
     
    Array.from(countries).map((x) => {
      count[i++] = visitorCounts[x];
    });

    const adData = [];
    const cdData = [];
    const vdData = [];

    for(i=1;i<ainfo.length;i++){
      adData[i-1]=ainfo[i]
    }
    for(i=1;i<cinfo.length;i++){
      cdData[i-1]=cinfo[i]
    }
    for(i=1;i<tinfo.length;i++){
      vdData[i-1]=tinfo[i]
    }

      setPeople(count);
      setAdult(adData);
      setChild(cdData);
      setTotal(vdData);
      setDay(Array.from(dt));
      setCountry(Array.from(countries));
    } else {
      setOpen(true);
    }
  }

  function fetchData() {
    const t = new Set();
    const filteredData = data.filter((entry) => {
      const d = new Date(
        entry.arrival_date_year,
        months.indexOf(entry.arrival_date_month),
        entry.arrival_date_day_of_month
      );
     
      t.add(`${entry.arrival_date_day_of_month} ${entry.arrival_date_month}`)
      const entryDate = dayjs(d);
      return entryDate > from.subtract(1, "day") && entryDate <= to;
    });
    getData({data: filteredData, dt:t});
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Stack>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="warning"
          sx={{ width: "100%" }}
        >
          The "To" date cannot be more than 20 days after the "From" date
        </Alert>
      </Snackbar>
      <Stack direction="row" sx={{padding:"16px",gap:"8px",justifyContent:"center"}}>
      <Stack direction="row" sx={{gap:"16px"}}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="From"
            format="DD-MM-YYYY"
            value={from}
            onChange={(val) => setFrom(val)}
            slotProps={{ textField: { size: 'small' } }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="To"
            format="DD-MM-YYYY"
            value={to}
            onChange={(val) => setTo(val)}
            slotProps={{ textField: { size: 'small' } }}
          />
        </LocalizationProvider>
      </Stack>
      <Button onClick={() => fetchData()} variant="contained" disableElevation sx={{width:"150px"}}>Submit</Button>
      </Stack>

      <LineChart adultData={adult} day={day} childData={child} />

      <AreaChart
        totalData={total}
        day={day}
        country={country}
        visitor={people}
      />
    </Stack>
  );
}
