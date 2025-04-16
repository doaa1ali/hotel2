import React, { useState } from 'react';
import { useDropzone } from "react-dropzone";
import { Box, Avatar, TextField, MenuItem, Button, Typography,InputAdornment, Divider, Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import image4 from "../../assets/images/image4.png";
import image5 from "../../assets/images/image5.png";
import image6 from "../../assets/images/image6.png";
import Edit_image1 from "../../assets/images/Edit_image1.png";
import Edit_image2 from "../../assets/images/Edit_image2.png";
import Edit_image3 from "../../assets/images/Edit_image3.png";
import Edit_image4 from "../../assets/images/Edit_image4.png";
import { useNavigate } from "react-router-dom";

const Table = () => {

    const [images, setImages] = useState ([Edit_image2, Edit_image3, Edit_image4]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && images.length < 4) { 
            const imageUrl = URL.createObjectURL(file);
            setImages((prevImages) => [...prevImages, imageUrl]); // إضافة الصورة الجديدة
        }
    };

    const remainingSlots = 4 - images.length;

    const navigate = useNavigate();

  return (
    <div style={{ padding: "16px" }}>
      {/* العنوان والوصف */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
        <Typography variant="h4" sx={{ fontFamily: "Poppins", fontWeight: "500", fontSize: "32px", color:"#333333" }}>
          Edit - Apartments
        </Typography>
        <Typography variant="body1" sx={{  color: "#5C5C5C",fontFamily: "Poppins", fontWeight: "200", fontSize: "20px",}}>
          Fill in the data to edit an apartment.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: "40px", }}>
        <Box sx={{ flex: 2,  borderRadius: "8px", backgroundColor: "#fff", width:"792px", }}>
          
          {/* الحقول */}
            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <Box sx={{ flex: 1 , height: "50px"}}>
                <Typography variant="subtitle1">Apartment</Typography>
                <TextField fullWidth variant="outlined" placeholder="Name"/>
                </Box>
                <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1">Building</Typography>
                <TextField fullWidth variant="outlined" placeholder="Bulid No."/>
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Area</Typography>
                    <TextField fullWidth variant="outlined" placeholder="Area x" />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Location</Typography>
                    <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="https://goo.gl/m...."
                    InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                            <LocationOnIcon color="primary" />
                        </InputAdornment>
                        ),
                    }}
                    sx={{ input: { color: "#1C9FE2" } }} // تغيير لون النص إلى الأزرق
                    />
                </Box>
            </Box>

            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>
                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Partners</Typography>
                    <TextField fullWidth variant="outlined" select defaultValue="name">
                    <MenuItem value="name">Name</MenuItem>
                    <MenuItem value="Rented">Rented</MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                    </TextField>
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Reserved</Typography>
                    <TextField fullWidth variant="outlined" select defaultValue="Available">
                    <MenuItem value="Available">Available</MenuItem>
                    <MenuItem value="Rented">Rented</MenuItem>
                    <MenuItem value="Maintenance">Maintenance</MenuItem>
                    </TextField>
                </Box>
            </Box>


            <Box sx={{ display: "flex", gap: "16px", marginBottom: "16px" }}>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1">Price</Typography>
                    <TextField fullWidth variant="outlined" select defaultValue="UAE">
                    <MenuItem value="UAE">Y: 12.000 UAE</MenuItem>
                    <MenuItem value="AED">Y: 12.000 AED</MenuItem>
                   
                    </TextField>
                </Box>

                <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1">Total item Cost</Typography>
                <TextField fullWidth variant="outlined" type="number" placeholder="(635)" />
                </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: "16px", width:"600px" }}>

                <Box
                    sx={{display: "flex", alignItems: "center", padding: "20px", borderRadius: "5px", width: "200px", color: "#182775", height: "50px", backgroundColor: "#F6F8FA", fontWeight: "bold", gap: "12px", flex: 1,}}
                > Total Salary: 5200 </Box>

                <Box
                    sx={{display: "flex", alignItems: "center", padding: "20px", borderRadius: "5px", width: "200px", color: "#182775", height: "50px", backgroundColor: "#F6F8FA", fontWeight: "bold", gap: "12px", flex: 1,}}
                > Monthly rate : 1200 </Box>


                <Button variant="contained"  sx={{ height: "50px", minWidth: "150px", padding: "8px 16px", backgroundColor:"#182775", textTransform: "none" }}>
                    Apple
                </Button>
            </Box>

   
            <Box sx={{ width: "100%", marginTop: "16px",  }}>
                <Typography variant="subtitle1">Description</Typography>
                <TextField fullWidth variant="outlined" multiline minRows={5} placeholder="Type your message here" />
            </Box>

            <Box sx={{ width: "100%", marginTop: "16px" }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "16px" }}>
                    
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
                                src={Edit_image1}
                                alt="Default Image 5"
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                        </Box>
                    {/* عرض الصور الثابتة + حقل الرفع إذا كانت أقل من 4 */}
                    <Grid container spacing={2} sx={{ width: "270px", flexWrap: "wrap" }}>
                        {images.map((image, index) => (
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
                                        backgroundColor: "#F6F8FA"
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`default-${index}`}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                    />
                                </Box>
                            </Grid>
                        ))}

                        {/* عرض حقول الرفع إذا كان هناك أماكن فارغة */}
                        {[...Array(remainingSlots)].map((_, index) => (
                            <Grid item xs={6} key={`upload-${index}`}>
                                <Box
                                    sx={{
                                        width: "124px",
                                        height: "90px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: "pointer",
                                        backgroundColor: "#F6F8FA",
                                        position: "relative"
                                    }}
                                    onClick={() => document.getElementById(`fileInput-${index}`).click()}
                                >
                                    <input 
                                        type="file" 
                                        id={`fileInput-${index}`} 
                                        accept="image/*" 
                                        style={{ display: "none" }} 
                                        onChange={handleImageUpload} 
                                    />
                                    <AddIcon sx={{ fontSize: 30, color: "#182775" }} />
                                </Box>
                            </Grid>
                        ))}  
                    </Grid>

                </Box>
            </Box>
            

            <Divider sx={{ marginY: "16px" }} />

            {/* الأزرار */}
            <Box sx={{ display: "flex", justifyContent: "flex-start", gap: "16px" }}>
                <Button 
                    variant="contained" 
                    sx={{ backgroundColor: "#182775", "&:hover": { backgroundColor: "#121E5B" }, textTransform: "none" }}
                    onClick={() => navigate("/dashboard/apartments-list")}
                >
                    Save
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
                {/* أيقونة الإغلاق في الأعلى واليمين */}
                <IconButton 
                    sx={{ position: "absolute", top: 5, right: 5, color: "#182775" }} 
                    onClick={() => console.log("Close button clicked")}
                >
                    <Close />
                </IconButton>

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

export default Table;







