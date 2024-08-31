import React from "react";
import {
  Button,
  Grid,
  Box,
  Modal,
  TextField,
  FormControl,
  Typography,
} from "@mui/material";

export default function Header() {
  return (
    <Grid container sx={{alignItems:"center"}}>
      <Grid xs={2}>
        <Typography variant="h4" color="initial">logo</Typography>
      </Grid>
      <Grid xs={10}>1</Grid>
    </Grid>
  )
}
