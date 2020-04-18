import { FrownTwoTone, SmileTwoTone } from '@ant-design/icons';
import { Col, Row, Tooltip } from 'antd';
import React from 'react';
import numeral from 'numeral';
import { ChartCard,MiniProgress } from './Charts';
import {dueness} from '@/utils/dateTime'
import { ProjectArray } from '@/typings/projects';
import { TasksArray } from '@/typings/tasks';
import {filter} from 'lodash';

interface SummaryRowProps {
  projects: ProjectArray;
  tasks: TasksArray;
  uid: string;
}
const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: {
    marginBottom: 24,
  },
};


const ownership = (projects: ProjectArray, uid: string) => {
  const leadPercent = parseInt(((projects.filter(o => o.lead == uid).length/projects.length)*100).toFixed(0));
  const participantPercent = parseInt(((filter(projects, ['name', uid]).length/projects.length)*100).toFixed(0));
  const createdPercent = parseInt(((projects.filter(o => o.createdBy == uid).length/projects.length)*100).toFixed(0));

  return {
    leadPercent,
    participantPercent,
    createdPercent
  }
}


const SummaryRow = ({ projects, uid, tasks }: SummaryRowProps) => (
  
  <Row gutter={24}  style={{width: '100%'}}>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="My Projects"
        total={projects.length}
        footer={
          <MiniProgress
            percent={ownership(projects, uid).leadPercent}
            percent1={ownership(projects, uid).participantPercent}
            percent2={ownership(projects, uid).createdPercent}
            percentLabel={`${ownership(projects, uid).leadPercent}% Lead`}
            percent1Label={`${ownership(projects, uid).participantPercent}% Team Member`}
            percent2Label={`${ownership(projects, uid).createdPercent}% Created Project`}
            strokeWidth={10}
            color="#2f54eb"
            color1="#fa8c16"
            color2="#f5222d"
            hideTarget={true}
          />
        }
        contentHeight={46}
      ></ChartCard>
    </Col>

    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="Tasks"
        action={
          tasks.length > 0 &&
          ((dueness(tasks)[3] + dueness(tasks)[2]) > 80 
          ? 
          <Tooltip title='Keep up the good work!'>
            <SmileTwoTone style={{ fontSize: 24 }} twoToneColor="#52c41a" /> 
          </Tooltip>
          : 
          <Tooltip title='Try to complete some of your overdue and upcoming tasks!'>
            <FrownTwoTone style={{ fontSize: 24 }} twoToneColor="#f5222d" /> 
          </Tooltip>
          )
        }
        total={numeral(tasks.length).format('0')}
        footer={
            <MiniProgress
            percent={dueness(tasks).futureDuePercent}
            percent1={dueness(tasks).soonduePercent}
            percent2={dueness(tasks).overduePercent}
            percent3={dueness(tasks).noduePercent}
            percentLabel={`${dueness(tasks)[2]}% Future Due`}
            percent1Label={`${dueness(tasks)[1]}% Soon Due`}
            percent2Label={`${dueness(tasks)[0]}% Overdue`}
            percent3Label={`${dueness(tasks)[3]}% No Due Date`}
            strokeWidth={10}
            color="rgb(82, 196, 26)"
            color1="#fa8c16"
            color2="#f5222d"
            hideTarget={true}
          />
        }
        contentHeight={46}
      ></ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
      <ChartCard
        bordered={false}
        title="More Amazing projects"
        total={'Coming Soon!'}
        footer={
          <MiniProgress
          percent={0}
          strokeWidth={10}
          />
      }
        contentHeight={46}
      ></ChartCard>
    </Col>
    <Col {...topColResponsiveProps}>
    <ChartCard
        bordered={false}
        title="More Amazing projects"
        total={'Coming Soon!'}
        footer={
          <MiniProgress
          percent={0}
          strokeWidth={10}
          />
      }
        contentHeight={46}
      ></ChartCard>
    </Col>
  </Row>
);

export default SummaryRow;
