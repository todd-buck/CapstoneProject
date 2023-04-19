import React, { useState, useEffect } from 'react';
import ReactEcharts from 'echarts-for-react';
import { target_URL } from "../../App.js";
import {
    useQuery
} from '@tanstack/react-query';

const PieChart = () => {

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
        title: {
            text: 'Meat Items On Hand',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            orient: 'vertical',
            left: 'left',
        },
        series: [
            {
                name: 'Quantity on Hand',
                type: 'pie',
                radius: '50%',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
                label: {
                    formatter: '{b}: {c} ({d}%)',
                },
            },
        ],
    };

    return <ReactEcharts option={options} />;
};

export default PieChart;