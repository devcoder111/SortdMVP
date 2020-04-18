import React from 'react';
import {Tag} from 'antd'

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

enum Status {
    'To Do',
    'Doing',
    'Stuck',
    'Done'
}

interface StatusTagProps {
    status: number;
}

const StatusTag = ({status}:StatusTagProps) => (
    <Tag style={{borderColor: StatusBorderCol[status], color: StatusTextCol[status]}} color={StatusBackCol[status]}>{Status[status]}</Tag>
)

export default StatusTag;
