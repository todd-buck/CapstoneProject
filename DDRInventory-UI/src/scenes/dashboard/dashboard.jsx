import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { target_URL } from "../../App.js";
import {
    useQuery
} from '@tanstack/react-query';
import { tokens } from "../../theme";
import useTheme from "@mui/material/styles/useTheme";
import { Typography, Box } from '@mui/material';
import TransitionsModal from '../global/welcomepage.jsx';

const PieChart = () => {
    const [open, setOpen] = React.useState(true);


    const theme = useTheme();
    const colors = tokens(theme.palette.mode, theme.palette.scheme);

    const { data, isFetchError, isFetching, refetch } = useQuery({
        queryKey: [
            'table-data',
        ],
        queryFn: async () => {
            const fetchURL = new URL(
                '/api/item/catalog',
                target_URL,
            );

            const response = await fetch(fetchURL.href);
            const json = await response.json();

            const chartData = json
                .filter(item => item.subCategory === "Meat")
                .sort((a, b) => b.quantityOnHand - a.quantityOnHand)
                .map(({ name, quantityOnHand }) => ({
                    name,
                    value: quantityOnHand,
                }));

            return chartData;
        }
    });

    const options = {
        tooltip: {
            trigger: 'item',
            borderWidth: 3,
            backgroundColor: colors.primary[300],
            textStyle: {
                color: colors.gray[100],
            },
        },
        legend: {
            orient: 'horizontal',
            top: '75%',
            textStyle: {
                color: colors.gray[100],
            },
            backgroundColor: colors.primary[200],
            padding: [10, 10, 10, 10],
        },
        series: [
            {
                bottom: '10%',
                center: ['50%', '40%'],
                name: 'Quantity on Hand',
                type: 'pie',
                radius: '60%',
                data: data,
                label: {
                    color: colors.gray[100],
                    formatter: '{b}: {c} ({d}%)',
                },
            },
        ],
    };

    return (
        <Box>
            {open ? <TransitionsModal open={open} setOpen={setOpen} /> : null}
            <Typography variant="h1" sx={{ textAlign: "center", marginTop: "20px"} }>
                On Hand: Meat Items
            </Typography>
            <ReactEcharts option={options} style={{ maxWidth: '1000px', height: '400px', margin: "0 auto" }} />;
        </Box>    
    );
};

export default PieChart;