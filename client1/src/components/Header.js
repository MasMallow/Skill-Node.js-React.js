import React from "react";
import {
  Button,
  Grid,
  Typography,
} from "@mui/material";

export default function Header() {
  return (
    <Grid container sx={{ alignItems: "center" }}>
      <Grid xs={2}>
        <Typography variant="h4" color="initial">
          logo
        </Typography>
      </Grid>
      <Grid xs={10} sx={{display:"flex", justifyContent:"end",columnGap:"1rem"}}>
        <Button variant="text">Login</Button>
        <Button variant="contained">Register</Button>
      </Grid>
    </Grid>
  );
}
