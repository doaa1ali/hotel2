import React, { useState, useEffect } from 'react';
import { useDropzone } from "react-dropzone";
import { Box, Avatar, TextField, MenuItem, Button, Typography,InputAdornment, Divider, Grid } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import axios from "axios";
import AddIcon from "@mui/icons-material/Add";
import ImageIcon from "@mui/icons-material/Image";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.png";
import image6 from "../../assets/images/image6.png";
import { useNavigate } from "react-router-dom";

const API_URL = "https://royal-hotel-backend.onrender.com/api/apartments/";

const TableList = () => { 

    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [isUploadReplaced, setIsUploadReplaced] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        building: "",
        area: 200,
        google_maps_link: "",
        partners: "name",
        state: "",
        pricing: "",
        totalCost: "",
        description: "",
        images: [] 
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const openMap = () => {
        window.open("https://www.google.com/maps", "_blank");
    };

    const handleSubmit = async () => {
        const formDataToSend = new FormData();
        
        // إضافة بيانات الشقة
        Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
        });
    
        // إضافة الصور إلى FormData
        files.forEach((file, index) => {
            formDataToSend.append(`images`, file);
        });
    
        try {
            const response = await axios.post(API_URL, formDataToSend, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            console.log("Data saved successfully!", response.data);
            navigate("/dashboard/apartments-list");
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };
    
    
    

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            
            // تحديث حالة الصورة في الواجهة
            if (files.length === 4) {
                setUploadedImage(imageUrl);
                setIsUploadReplaced(true);
            } else {
                setFiles([...files, file]);
            }
    
            // رفع الصورة إلى الـ API
            const formData = new FormData();
            formData.append("images", file);
    
            try {
                const response = await axios.post(`${API_URL}upload-image/`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                });
    
                console.log("Image uploaded successfully:", response.data);
                // حفظ الصورة المرفوعة في البيانات
                setFormData((prev) => ({
                    ...prev,
                    images: [...(prev.images || []), response.data.image_url], // تحديث الصور
                }));
            } catch (error) {
                console.error("Error uploading image:", error);
            }
        }
    };
    


    // const { getRootProps, getInputProps } = useDropzone({
    //     accept: "image/*",
    //     multiple: true,
    //     maxFiles: 5,
    //     onDrop: (acceptedFiles) => {
    //         const remainingSlots = 4 - files.length;
    //         if (remainingSlots > 0) {
    //             const newFiles = acceptedFiles.slice(0, remainingSlots);
    //             setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    //         } else if (!isUploadReplaced && acceptedFiles.length > 0) {
    //             setUploadedImage(URL.createObjectURL(acceptedFiles[0]));
    //             setIsUploadReplaced(true);
    //         }
    //     },
    // });


  return (
    <div style={{ padding: "16px" }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
        <Typography variant="h4" sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "32px", color:"#333333" }}>
          Add - Apartments
        </Typography>
        <Typography variant="body1" sx={{ color: "#5C5C5C",fontFamily: "Poppins", fontWeight: "200", fontSize: "20px", }}>
          Fill in the data to add an apartment.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "40px", }}>
        <Box sx={{ flex: 2, borderRadius: "8px", backgroundColor: "#fff", width:"792px", }}>
    
            {/* الحقول */}
            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <Box sx={{ flex: 1 , height: "50px"}}>
                    <Typography variant="subtitle1">Apartment</Typography>
                    <TextField fullWidth variant="outlined" name="name" value={formData.name} onChange={handleChange} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Building</Typography>
                    <TextField fullWidth variant="outlined" name="building" value={formData.building} onChange={handleChange} />
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Area</Typography>
                    <TextField fullWidth variant="outlined" name="area" value={formData.area} onChange={handleChange} />
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Location</Typography>
                    <TextField
                        fullWidth
                        variant="outlined"
                        name="google_maps_link"
                        value={formData.google_maps_link}
                        onChange={handleChange}
                        placeholder="https://goo.gl/m...."
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <LocationOnIcon color="primary" onClick={openMap} style={{ cursor: "pointer" }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ input: { color: "#1C9FE2" } }}
                    />
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Partners</Typography>
                    <TextField fullWidth variant="outlined" name="partners" select value={formData.partners} onChange={handleChange}>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="Rented">Rented</MenuItem>
                        <MenuItem value="Maintenance">Maintenance</MenuItem>
                    </TextField>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">state</Typography>
                    <TextField fullWidth variant="outlined" name="state" select value={formData.state} onChange={handleChange}>
                        <MenuItem value="available">Available</MenuItem>
                        <MenuItem value="rented">Rented</MenuItem>
                        <MenuItem value="maintenance">Maintenance</MenuItem>
                    </TextField>
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">pricing</Typography>
                    <TextField fullWidth variant="outlined" name="pricing"  value={formData.pricing} onChange={handleChange}>
                        {/* <MenuItem >12.000</MenuItem>
                        <MenuItem value="AED">Y: 12.000 AED</MenuItem> */}
                    </TextField>
                </Box>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Total item Cost</Typography>
                    <TextField fullWidth variant="outlined" name="totalCost" type="number" value={formData.totalCost} onChange={handleChange} placeholder="(635)" />
                </Box>
            </Box>

            <Box sx={{ width: "100%", marginTop: "16px" }}>
                <Typography variant="subtitle1">Description</Typography>
                <TextField fullWidth variant="outlined" name="description" multiline minRows={5} value={formData.description} onChange={handleChange} placeholder="Type your message here" />
            </Box>


    
            <Box sx={{ width: "100%", marginTop: "16px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "16px" }}>
                    {!isUploadReplaced ? (

                        <Box
                            sx={{
                                width: "500px",
                                height: "200px",
                                border: "none",
                                borderRadius: "8px",
                                backgroundColor: "#F6F8FA",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                flexShrink: 0,
                                cursor: "pointer"
                            }}
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            <input 
                                type="file" 
                                id="fileInput" 
                                accept="image/*" 
                                style={{ display: "none" }} 
                                onChange={handleImageUpload} 
                            />
                            <ImageIcon sx={{ fontSize: 40, color: "#182775" }} />
                            <Typography sx={{ fontWeight: "bold", color: "#182775" }}>
                                Upload Image
                            </Typography>
                            <Typography variant="caption">Click to upload</Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                width: "500px",
                                height: "200px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                border: "1px solid #ddd",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#F6F8FA"
                            }}
                        >
                            <img
                                src={uploadedImage}
                                alt="Uploaded"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>
                    )}

                    <Grid container spacing={2} sx={{ width: "270px", flexWrap: "wrap" }}>
                        {files.map((file, index) => (
                            <Grid item xs={6} key={index}>
                                <Box
                                    sx={{
                                        width: "124px",
                                        height: "90px",
                                        borderRadius: "8px",
                                        overflow: "hidden",
                                        border: "1px solid #ddd",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#F6F8FA",
                                    }}
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt="uploaded"
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </Box>
                            </Grid>
                        ))}

                        {[...Array(4 - files.length)].map((_, index) => (
                            <Grid item xs={6} key={index}>
                                <Box
                                    onClick={() => document.querySelector("input[type='file']").click()}
                                    sx={{
                                        width: "124px",
                                        height: "90px",
                                        borderRadius: "8px",
                                        border: "none",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        backgroundColor: "#F6F8FA",
                                    }}
                                >
                                    <AddIcon sx={{ fontSize: 30, color: "#182775" }} />
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Box>




            <Divider sx={{ marginY: "16px" }} />

            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "16px" }}>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: "#182775", "&:hover": { backgroundColor: "#121E5B" }, textTransform: "none" }}
                    onClick={handleSubmit}
                >
                    Add
                </Button>
                <Button 
                    variant="outlined"
                    sx={{ color: "#182775", textTransform: "none" }}
                    onClick={() => navigate("/dashboard/apartments-list")}
                >
                    Cancel
                </Button>
            </Box>
        </Box>

        {/* قائمة العملاء */}
        <Box sx={{ flex: 1,  backgroundColor: "#fff", borderRadius: "11px", width: "350px" }}>
          {[image1, image2, image3, image4, image5, image6 ].map((image, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "20px",
                borderRadius: "5px",
                width: "100%",
                color: "#00CB22",
                height: "105px",
                backgroundColor: "#F6F8FA",
                fontWeight: "bold",
                gap: "12px",
                marginBottom: "15px",
              }}
            >
            <Box sx={{ position: "relative", display: "flex", gap: 2, width: "100%", p: 2, }}>

                <Avatar alt={`image${index + 1}`} src={image} sx={{ width: 73, height: 73, border: "none" }} />

                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h6" sx={{ fontFamily: "Poppins", fontWeight: "500", lineHeight: "1", color: "#182775" }}>
                        Client Name
                    </Typography>
                    <Box sx={{ color: "#182775", fontSize: "14px", lineHeight: "0.2", fontWeight: "275" }}>
                        <p>Unit Number: 023</p>
                        <p>Rent Type: Monthly</p>
                    </Box>
                </Box>
            </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default TableList;

