import React, { useEffect, useState } from "react";
import { Edit, Delete, Add, Tune,Visibility } from "@mui/icons-material";
import { 
  Box, Button, IconButton, Divider, Pagination, 
  Table as MuiTable, TableHead, TableRow, TableCell, TableBody, 
  TableContainer, Paper
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const API_URL = "https://royal-hotel-backend.onrender.com/api/apartments/";
const REFRESH_URL = "https://royal-hotel-backend.onrender.com/api/token/refresh/";

const MyComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [page, setPage] = useState(0);
  const rowsPerPage = 5;
  const totalRows = 15;
  const [data, setData] = useState([]); 
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const refreshToken = localStorage.getItem("refreshToken");
  const [loading, setLoading] = useState(false);

  const fetchData = async (accessToken) => {
    if (!accessToken) {
      console.error(" No access token found! Logging in...");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      });

      console.log("API Response:", response.data);
      setData(Array.isArray(response.data.results) ? response.data.results : []); 

    } catch (error) {
      if (error.response?.status === 401) {
        if (refreshToken) {
          console.warn("Access token expired. Refreshing...");
          await refreshAccessToken();
        } else {
          console.error("No refresh token available. Please log in again.");
        }
      } else {
        console.error("Error fetching data:", error);
        setData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const refreshAccessToken = async () => {
    if (!refreshToken) {
      console.error("No refresh token found! Please log in again.");
      return;
    }

    try {
      const response = await axios.post(REFRESH_URL, { refresh: refreshToken });
      const newAccessToken = response.data.access;
      localStorage.setItem("accessToken", newAccessToken);
      setToken(newAccessToken);
      console.log("Access token refreshed successfully!");
      await fetchData(newAccessToken);
    } catch (error) {
      console.error("Failed to refresh token! Logging out...");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    }
  };

  useEffect(() => {
    fetchData(token);
  }, [token]);

  return (
        <div style={{ padding: "20px" }}>
       <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: "50px", mb: 2 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
            <h1
                style={{
                fontSize: "22px",
                cursor: "pointer",
                color: location.pathname === "/dashboard/apartments-list" ? "#182775" : "#555",
                borderBottom: location.pathname === "/dashboard/apartments-list" ? "2px solid #182775" : "none"
                }}
                onClick={() => navigate("/dashboard/apartments-list")}
            >
                Apartments List
            </h1> 
        
            <h3>|</h3>

            <h1
                style={{
                fontSize: "22px",
                cursor: "pointer",
                color: location.pathname === "/dashboard/units-list" ? "#182775" : "#555",
                borderBottom: location.pathname === "/dashboard/units-list" ? "2px solid #182775" : "none"
                }}
                onClick={() => navigate("/dashboard/units-list")}
            >
                Units List
            </h1>
        </Box>

        <Button 
            variant="contained"
            sx={{ backgroundColor: "#182775", "&:hover": { backgroundColor: "#0F1A4D" }, width: "200px", height: "50px", borderRadius: "6px", textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
            onClick={() => navigate("/dashboard/add-apartments")}

            >
            <IconButton sx={{ color: "white", borderRadius: "50%" }}>
                <Add />
            </IconButton>
            Add Apartments
        </Button>

      </Box>


      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <Box sx={{ maxWidth: "650px", height: "50px", position: "relative", padding: "8px 12px", borderRadius: "5px", border: "1px solid #ddd", display: "flex", alignItems: "center", backgroundColor: "white", flexGrow: 1 }}>
          <SearchIcon sx={{ position: "absolute", left: "12px", color: "#475FD9" }} />
          <input
            type="text"
            placeholder="Search Apartments Name..."
            style={{ width: "100%", height: "100%", padding: "8px 12px 8px 40px", fontSize: "0.9rem", borderRadius: "5px", border: "none", outline: "none", backgroundColor: "transparent" }}
          />
        </Box>

        <Button 
          variant="contained"
          sx={{ backgroundColor: "#182775", "&:hover": { backgroundColor: "#354AB6" }, width: "130px", height: "50px", borderRadius: "6px", textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
          onClick={() => alert("تصفية البيانات")}
          startIcon={<Tune />}
        >
          Filter
        </Button>
      </Box>

      {/* Table */}
      <Paper sx={{ width: "100%", overflow: "hidden", mt: 3 }}>
        <TableContainer>
        <MuiTable>
  <TableHead>
    <TableRow sx={{ backgroundColor: "#F6F8FA", color: "#182775" }}>
      {["Apartment", "Building", "Area", "Status", "No. of units", "Client Rent", "Type", "Start & End", "Expenses", "Price", "Actions"].map((col, index) => (
        <TableCell key={index} sx={{ textAlign: "center", fontSize: "12px", color: "#182775" }}>
          {col}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>

  <TableBody>
    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
      <TableRow key={row.id} sx={{ borderBottom: "1px solid #ddd" }}>
        <TableCell sx={{ textAlign: "center" }}>{row.name}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{row.building}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>{row.area}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <Box sx={{ padding: "5px", borderRadius: "5px", color: row.state === "available" ? "green" : "red", backgroundColor: row.state === "available" ? "#E8F5E9" : "#FFEBEE", fontWeight: "bold" }}>
            {row.state}
          </Box>
        </TableCell>
        <TableCell sx={{ textAlign: "center" }}>{row.units.length}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>-</TableCell> 
        <TableCell sx={{ textAlign: "center" }}>-</TableCell> 
        <TableCell sx={{ textAlign: "center" }}>-</TableCell> 
        <TableCell sx={{ textAlign: "center" }}>-</TableCell> 
        <TableCell sx={{ textAlign: "center" }}>{row.pricing}</TableCell>
        <TableCell sx={{ textAlign: "center" }}>
          <IconButton><Visibility sx={{ color: "#475467" }} /></IconButton>
          <IconButton onClick={() => navigate("/dashboard/edit-apartment")}><Edit sx={{ color: "#475467" }} /></IconButton>
          <IconButton><Delete sx={{ color: "#475467" }} /></IconButton>
        </TableCell>
      </TableRow>
    ))}
  </TableBody>
</MuiTable>

        </TableContainer>
      </Paper>

      {/* Pagination */}
      <Divider sx={{ my: 3 }} />
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination count={Math.ceil(totalRows / rowsPerPage)} page={page + 1} onChange={(_, newPage) => setPage(newPage - 1)} color="primary" />
      </Box>
    </div>
  );
};

export default MyComponent;


