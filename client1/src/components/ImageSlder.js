import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid2 from '@mui/material/Grid2';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/material/Box';
import "../css/Login.css";

const images = [
    {
        label: 'Image 1',
        imgPath: 'https://via.placeholder.com/400x200?text=Image+1',
    },
    {
        label: 'Image 2',
        imgPath: 'https://via.placeholder.com/400x200?text=Image+2',
    },
    {
        label: 'Image 3',
        imgPath: 'https://via.placeholder.com/400x200?text=Image+3',
    },
    {
        label: 'Image 4',
        imgPath: 'https://via.placeholder.com/400x200?text=Image+4',
    },
    {
        label: 'Image 5',
        imgPath: 'https://via.placeholder.com/400x200?text=Image+5',
    },
    {
        label: 'Image 6',
        imgPath: 'https://via.placeholder.com/400x200?text=Image+6',
    },
];

export default function CustomGridCarousel() {
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Grid2
            sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#ffafcc",
                marginTop: "10%",
                padding: 2,
            }}
        >
            <Box sx={{ flexGrow: 1, maxWidth: '100%', width: { xs: '90%', sm: '70%', md: '60%' } }}>
                <Box
                    component="img"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                        overflow: 'hidden',
                        marginBottom: 2,
                    }}
                    src={images[activeStep].imgPath}
                    alt={images[activeStep].label}
                />
                <MobileStepper
                    variant="dots"
                    steps={maxSteps}
                    position="static"
                    activeStep={activeStep}
                    sx={{ flexGrow: 1 }}
                    nextButton={
                        <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                            Next
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowLeft />
                            ) : (
                                <KeyboardArrowRight />
                            )}
                        </Button>
                    }
                    backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            {theme.direction === 'rtl' ? (
                                <KeyboardArrowRight />
                            ) : (
                                <KeyboardArrowLeft />
                            )}
                            Back
                        </Button>
                    }
                />
            </Box>
        </Grid2>
    );
}
