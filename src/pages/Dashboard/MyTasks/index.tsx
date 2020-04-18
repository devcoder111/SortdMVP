import React, { Fragment } from "react";
import { PlusOutlined } from '@ant-design/icons';
import {Card, List, Avatar, Tooltip, Button} from 'antd';
import style from '../styles.less'
import StatusTag from '@/components/StatusTag';
import TypeIcon from '@/components/TypeIcon';
import {truncateString} from '@/utils/strings';
import DueDate from '@/components/DueDate';
import { TasksArray } from '@/typings/tasks';
import { ProjectArray } from '@/typings/projects';
import EmptyTasks from "./Empty";
import {history} from 'umi'


interface MyTasksProps {
    tasks: TasksArray;
    projects: ProjectArray;
}
function MyTasks({tasks, projects}: MyTasksProps) {

  const paginationProps = {
    pageSize: 5,
  };

  return (
    <Fragment>
        <Card
            bordered={true}
            title={"My Tasks"}
            className={style.card}
            extra={<Button type='dashed' icon={<PlusOutlined />} onClick={() => history.push('projects/new')} />}
        >
            <List   
                pagination={paginationProps}
                size="small"
                dataSource={tasks
                    .filter(task => projects.find(project => project.id == task.project)?.status !== 1)
                    .sort((a,b) => b.status - a.status)
                }
                locale={{ emptyText: <EmptyTasks />}}   
                renderItem={item => 
                    <List.Item
                        style={{cursor: 'pointer'}}
                    >
                        <List.Item.Meta
                            title={[<TypeIcon type={item.type} />, item.title]}
                            description={truncateString(item.content?.replace(/(<([^>]+)>)/ig,""), 80)}
                        />
                        <StatusTag status={item?.status} />
                        {item.dueDate && <DueDate dueDate={ item.dueDate.toDate()} />}
                        <Tooltip title={projects.find(project => project.id == item.project)?.projectName || ''}>
                            <Avatar src={projects.find(project => project.id == item.project)?.avatar || ''} size='small' /> 
                        </Tooltip>
                    </List.Item>
                }
            />
        </Card>
    </Fragment>
  );
}

export default MyTasks
