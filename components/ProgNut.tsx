import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Box} from "@chakra-ui/react";

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressDoughnut = ({props}) => {
    const taskCompleteCount = props.taskCompleteCount;
    const taskNotCompleteCount = props.taskNotCompleteCount;

    const completeCountArrayLenSum = taskCompleteCount.length + taskNotCompleteCount.length;
    /**
     * If no tasks
     */
    if (completeCountArrayLenSum === 0) {
        return (
            <Box width={'35%'}>
                <p>you don't have any tasks... add some!</p>
            </Box>
        )
    }

    if (completeCountArrayLenSum === 1) {
        // initialize variables
        let completeCount = 0;
        let notCompleteCount = 0;

        // assign diff value if
        if (taskCompleteCount.length === 1) {
            completeCount = props.taskCompleteCount[0]._count._all
        }
        else {
            notCompleteCount = props.taskNotCompleteCount[0]._count._all
        }

        // create data
        const data =  {
            labels: ['Completed', 'Not Completed'],
            datasets: [
                {
                    label: 'Complete vs Not Complete',
                    data: [completeCount, notCompleteCount],
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };
        return (
            <Box width={'35%'}>
                <Doughnut data={data} />
            </Box>
        )
    }

    const completeCount = props.taskCompleteCount[0]._count._all
    const notCompleteCount = props.taskNotCompleteCount[0]._count._all

    const data =  {
        labels: ['Completed', 'Not Completed'],
        datasets: [
            {
                label: 'Complete vs Not Complete',
                data: [completeCount, notCompleteCount],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Box width={'35%'}>
            <Doughnut data={data} />
        </Box>
    )
}

export default ProgressDoughnut;