import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import CountUp from 'react-countup';

export default function ExperienceCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ height: '100%' }} variant="outlined">
      <CardContent>
        <Image src="/Wicked_Witch.gif" width={24} height={24} alt="XP Boost" />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          <CountUp
            end={292081709.0}
            decimal=","
            decimals={3}
            separator="."
            suffix="+"
          />
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Experience points gained.
        </Typography>
      </CardContent>
    </Card>
  );
}
