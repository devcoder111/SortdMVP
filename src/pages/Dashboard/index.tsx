import React from 'react';
import { useFirestoreCollectionData, useFirestore, SuspenseWithPerf} from 'reactfire';
import { getOrgDetails, getUserDetails } from '@/utils/localStorage';
import { PageLoading, PageHeaderWrapper } from '@ant-design/pro-layout';
import MyProjects from './MyProjects';
import { ProjectArray } from '@/typings/projects';
import { TasksArray } from '@/typings/tasks';
import { content, extraContent } from './content';
import { Row, Col } from 'antd';
import MyTasks from './MyTasks';
import SummaryRow from './SummaryRow'

function Dashboard() {
    // lazy load the Firestore SDK and create a document reference
    const projectsRef = useFirestore()
      .collection('companies')
      .doc(getOrgDetails())
      .collection('projects');
    const tasksRef = useFirestore()
      .collection('companies')
      .doc(getOrgDetails())
      .collection('tasks')
      .where('lead', '==', getUserDetails());

    // subscribe to the doc. just one line!
    const projects:ProjectArray = useFirestoreCollectionData(projectsRef);
    const tasks:TasksArray = useFirestoreCollectionData(tasksRef);
    return (
        <PageHeaderWrapper content={content} extraContent={extraContent}>
            <Row gutter={24}>
              <SummaryRow projects={projects} uid={'UBTXjZOmI2MAxCOkZy2TZEt3bqO2'} tasks={tasks.filter(task => task.status !== 3)} />
            </Row>
            <Row gutter={24}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <MyProjects myProjects={projects} />
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                    <MyTasks tasks={tasks} projects={projects} />
                </Col>
            </Row>
        </PageHeaderWrapper>
    );
  }

  function DashboardContainer() {
      return (
        <SuspenseWithPerf
        fallback={<PageLoading />}
        traceId={'load-dashboard'}
      >
        <Dashboard />
      </SuspenseWithPerf>
      )
  }

  export default DashboardContainer