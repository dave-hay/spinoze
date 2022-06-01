import {Box} from '@chakra-ui/react'
import ProgressDoughnut from "./ProgressDoughnut";

type TaskStatus = {
    _count: {
        _all: number;
    };
    completed: boolean;
}

type PropsWithCount = {
    list: TaskProps[];
    taskStatus: TaskStatus[];
}

// 35%
const RightView = () => {
    return (
        <Box width={'35%'}>
            <ProgressDoughnut />
        </Box>
    )
}

export default RightView;