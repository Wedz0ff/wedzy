import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import CountUp from 'react-countup';

export default function TibiaCoinsCard() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card sx={{ height: '100%' }} variant="outlined">
      <CardContent>
        <Image src="/tibiacoin.gif" width={24} height={24} alt="Tibia Coin" />
        <Typography
          component="h2"
          variant="subtitle2"
          gutterBottom
          sx={{ fontWeight: '600' }}
        >
          <CountUp end={500} decimal="." separator="" suffix="k+" />
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: '8px' }}>
          Tibia Coins spent.
        </Typography>
      </CardContent>
    </Card>
  );
}
