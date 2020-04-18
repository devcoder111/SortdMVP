import React from 'react';
import {isOverdue, isSoonDue} from '@/utils/dateTime'
import {Tag} from 'antd';
import moment from 'moment';
enum StatusBackCol {
    '#f0f5ff',
    '#fff7e6',
    '#fff1f0',
    '#f6ffed'
}
enum StatusTextCol {
    '#2f54eb',
    '#fa8c16',
    '#f5222d',
    '#52c41a'
}

enum StatusBorderCol {
    '#adc6ff',
    '#ffd591',
    '#ffa39e',
    '#b7eb8f'
}


const DueDate = ({dueDate}: any) => {

    const overdue = isOverdue(dueDate)
    const soonDue = isSoonDue(dueDate, 2)
    return (
        <Tag style={{
                borderColor: overdue ? StatusBorderCol[2] : soonDue ? StatusBorderCol[1] : StatusBorderCol[3], 
                color: overdue ? StatusTextCol[2] : soonDue ? StatusTextCol[1] : StatusTextCol[3]
            }} 
            color={
                overdue ? StatusBackCol[2] : soonDue ? StatusBackCol[1] : StatusBackCol[3]
            }>{moment(dueDate).format('DD-MM-YYYY')}</Tag>
    )
}


export default DueDate;
