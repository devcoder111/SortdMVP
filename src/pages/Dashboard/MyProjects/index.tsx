import React, { useState, useEffect } from 'react';
import * as _ from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import { Card, Avatar, List, Tooltip, Button, Badge, Typography } from 'antd';
import { history } from 'umi';
import styles from './styles.less';
import * as moment from 'moment';
import ProjectHealth from './ProjectHealth';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { ProjectArray, ProjectType, } from '@/typings/projects';

const {Text} = Typography


enum Stage {
  "Predelivery",
  "Initiate",
  "Plan",
  "Execute",
  "Close"
}

enum StageCol {
  "#eb2f96",
  "#2f54eb",
  "#722ed1",
  "#52c41a",
  "#f5222d"
}

interface MyProjectsProps {
  myProjects: ProjectArray;
}

const MyProjects = React.memo(({myProjects}: MyProjectsProps) => {
    //state
    const [projects, setProjects] = useState(myProjects.filter(project => project.status !== 1))
    const [checked, setChecked] = useState(false)
    useEffect(() => {
        setProjects(checked ? myProjects : myProjects.filter(project => project.status !== 1))
    }, [myProjects]);

    const paginationProps = {
        pageSize: 5,
    };

    const filterProjects = (val: boolean) => {
      setChecked(val)
      setProjects(val ? myProjects : myProjects.filter(project => project.status !== 1))
    }
    return (
    <Card title='My Projects' 
    bordered={false}                      
    className={styles.card}
    extra={[
        <CheckableTag key='closed-projects' style={{cursor: 'pointer'}} checked={checked} onChange={(val) => filterProjects(val)}>Include Closed Projects</CheckableTag>,
        <Button key='new-project' type='dashed' icon={<PlusOutlined />} onClick={() => history.push('projects/new')} />
    ]}
    >
        <div className={styles.standardList}>
            <List
                dataSource={projects}
                pagination={paginationProps}
                renderItem={(project: ProjectType) => (
                    <List.Item 
                        key={project.id}
                        onClick={() =>history.push('/projects/project_new/' + project.id)}
                    >
                        <List.Item.Meta
                            avatar={
                            <Tooltip title={Stage[project.stage]}>
                                <Badge color={project.avatar && StageCol[project.stage]}>
                                    <Avatar shape="square" src={project.avatar && project.avatar}size={48} style={{ backgroundColor: !project.avatar ? StageCol[project.stage] : '#fff' }} >
                                        {!project.avatar && project.name.match(/\b(\w)/g)?.join('')}
                                    </Avatar>
                                </Badge>
                            </Tooltip>
                            }
                            title={
                                <a onClick={() =>  history.push(`/projects/project_new/${project.id}`)}>
                                    <Text delete={project.status==1}>{project.name} </Text>
                                </a> 
                            }
                            style={{cursor: 'pointer'}}
                            description={project.createdAt && `Created: ${moment(project.createdAt.toDate()).format('D-MM-YYYY')}`}
                        />
                        <ProjectHealth id={project.id} />
                    </List.Item>
                )}
            />
        </div>
    </Card>
    )
  })


export default MyProjects;
