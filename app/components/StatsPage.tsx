'use client';
import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import TibiaCoinsCard from './Cards/TibiaCoinsCard';
import LoginCard from './Cards/LoginCard';
import ExperienceCard from './Cards/ExperienceCard';
import MonstersCard from './Cards/MonstersCard';
import TotalSpentPerDay from './Charts/TotalSpentPerDay';
import TotalSpentPerMonth from './Charts/TotalSpentPerMonth';
import { Typography } from '@mui/material';

export default function StatsPage() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Box
        component="main"
        sx={(theme) => ({
          flexGrow: 1,
          backgroundColor: theme.vars
            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
            : alpha(theme.palette.background.default, 1),
          overflow: 'auto',
        })}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: 'center',
            mx: 3,
            pb: 5,
            mt: { xs: 8, md: 0 },
          }}
        >
          <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
              Over the past 7 years...
            </Typography>
            <Grid
              container
              spacing={2}
              columns={12}
              sx={{ mb: (theme) => theme.spacing(2) }}
            >
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <TibiaCoinsCard />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <LoginCard />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <ExperienceCard />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                <MonstersCard />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TotalSpentPerDay />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TotalSpentPerMonth />
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
