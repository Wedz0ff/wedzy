'use client';
import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import ImageSlider from './ImageSlider';

export default function Home() {
  return (
    <>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Hey!
      </Typography>
      <p>
        I guess you are here because you're somehow curious about the sale of my
        character, aren't you? I created this website to share some informations
        about this character that I've played over the past 7 years.
      </p>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        Screenshots
      </Typography>
      Here are some screenshots from my character progress over the years.
      <p></p>
      <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
        <ImageSlider />
      </Box>
    </>
  );
}
