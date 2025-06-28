import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, TextField, MenuItem } from "@mui/material";
import axios from "axios";
import BarChart from "../../components/BarChart";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
import API_BASE_URL from "../../config/api";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  const fields = ["end_year", "topic", "sector", "region", "pestle", "source", "country"];

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/filters`).then((res) => setFilterOptions(res.data));
  }, []);

useEffect(() => {
  const fetchData = async () => {
    const query = new URLSearchParams(filters).toString();
    const res = await axios.get(`${API_BASE_URL}/api/data?${query}`);
    setData(res.data);
  };
  fetchData();
}, [filters]);



  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  return (
    <Box m="20px">
      <Typography variant="h3" fontWeight="bold">Blackcoffer Dashboard</Typography>

      {/* Filters */}
      <Grid container spacing={2} mb={2}>
        {fields.map((field) => (
          <Grid item xs={6} sm={3} md={2} key={field}>
            <TextField
              select
              label={field}
              fullWidth
              size="small"
              value={filters[field] || ""}
              onChange={(e) => handleFilterChange(field, e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              {[...new Set(filterOptions[field] || [])].map((val) => (
                <MenuItem key={`${field}-${val}`} value={val}>
                  {val || "N/A"}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ))}
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}><BarChart data={data} /></Grid>
        <Grid item xs={12} md={6}><PieChart data={data} /></Grid>
        <Grid item xs={12}><LineChart data={data} /></Grid>
        {/* <Grid item xs={12}><GeographyChart data={data} /></Grid> */}
      </Grid> 
    </Box>
  );
};

export default Dashboard;
