// @ts-nocheck
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { BarChart } from '@mui/x-charts/BarChart';
import { useTheme } from '@mui/material/styles';

export default function PageViewsBarChart() {
  const theme = useTheme();
  const colorPalette = [
    '#FF5733',
    '#33FF57',
    '#3357FF',
    '#F0F033',
    '#FF33F0',
    '#33F0FF',
    '#FF8C00',
    '#8A2BE2',
    '#FFD700',
    '#32CD32',
  ];

  const [spentData, setSpentData] = React.useState<
    {
      id: string;
      label: string;
      data: number[];
      showMark: boolean;
      curve: string;
      stack: string;
      area: boolean;
      stackOrder: string;
    }[]
  >([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/spent-monthly', {
        next: { revalidate: 3600 },
      });
      const data = await response.json();

      const transformedData = Object.keys(data)
        .filter((year) => parseInt(year) >= 2018)
        .map((year) => ({
          id: year,
          label: year,
          // showMark: false,
          // curve: 'linear',
          // stack: 'total',
          // area: false,
          // stackOrder: 'ascending',

          data: data[year] ?? [],
        }));

      setSpentData(transformedData);
    };

    fetchData();
  }, []);

  return (
    <Card variant="outlined" sx={{ width: '100%' }}>
      <CardContent>
        <Typography component="h2" variant="subtitle2" gutterBottom>
          Total spent per month
        </Typography>
        <Stack sx={{ justifyContent: 'space-between' }}>
          <Stack
            direction="row"
            sx={{
              alignContent: { xs: 'center', sm: 'flex-start' },
              alignItems: 'center',
              gap: 1,
            }}
          ></Stack>
        </Stack>
        <BarChart
          borderRadius={8}
          colors={colorPalette}
          xAxis={
            [
              {
                scaleType: 'band',
                categoryGapRatio: 0.5,
                data: [
                  'jan',
                  'feb',
                  'mar',
                  'apr',
                  'may',
                  'jun',
                  'jul',
                  'aug',
                  'sep',
                  'oct',
                  'nov',
                  'dec',
                ],
              },
            ] as any
          }
          series={spentData}
          height={250}
          margin={{ left: 50, right: 0, top: 20, bottom: 20 }}
          grid={{ horizontal: true }}
          slotProps={{
            legend: {
              hidden: true,
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
