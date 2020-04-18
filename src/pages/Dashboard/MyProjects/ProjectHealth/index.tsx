import React from 'react';
import * as _ from 'lodash';;
import styles from '../styles.less';
import {dueness} from '@/utils/dateTime'
import { MiniProgress } from '../../SummaryRow/Charts';
import { TasksArray } from '@/typings/tasks';
import { getOrgDetails } from '@/utils/localStorage';
import { useFirestore, useFirestoreCollectionData, SuspenseWithPerf } from 'reactfire';
import { Spin } from 'antd';


interface ProjectHealthProps {
    id: String;
}

function ProjectHealth({id}: ProjectHealthProps) {
    // lazy load the Firestore SDK and create a document reference
    const tasksRef = useFirestore()
      .collection('companies')
      .doc(getOrgDetails())
      .collection('tasks')
      .where('project', '==', id)
      .where('status', '==', 0);


    // subscribe to the doc. just one line!
    const tasks:TasksArray = useFirestoreCollectionData(tasksRef);

    return (
        tasks.length > 0 ?
          <div className={styles.listContentItem}>
              <span>Task Health</span><br/>
              <MiniProgress
                  percent={dueness(tasks).futureDuePercent}
                  percent1={dueness(tasks).soonduePercent}
                  percent2={dueness(tasks).overduePercent}
                  percent3={dueness(tasks).noduePercent}
                  percentLabel={`${dueness(tasks).futureDuePercent}% Future Due`}
                  percent1Label={`${dueness(tasks).soonduePercent}% Soon Due`}
                  percent2Label={`${dueness(tasks).overduePercent}% Overdue`}
                  percent3Label={`${dueness(tasks).noduePercent}% No Due Date`}
                  strokeWidth={10}
                  color="rgb(82, 196, 26)"
                  color1="#fa8c16"
                  color2="#f5222d"
              />
        </div>
  
       : (null)
      );
  }

function ProjectHealthContainer({id}: ProjectHealthProps) {
    return (
        <SuspenseWithPerf
            fallback={<Spin spinning />}
            traceId={'load-project-health'}
        >
            <ProjectHealth id={id} />
        </SuspenseWithPerf>
    )
}

export default ProjectHealthContainer;
