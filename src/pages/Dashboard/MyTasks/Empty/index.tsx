import React from 'react';
import {Empty} from 'antd';

function EmptyTasks(){
    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={"No assigned tasks (perhaps it's time to ask your boss for more work?)."}
        />
    )
}

export default EmptyTasks