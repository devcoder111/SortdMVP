import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  List,
  Typography,
  Tooltip,
  notification,
} from 'antd';
import React from 'react';
import { Link, Dispatch } from 'umi';
import {connect} from 'dva'

import logo from '@/assets/full-logo.png';
import firebase from 'firebase';
import styles from './styles.less';
import request from '@/utils/request';
import { setOrgDetails, setUserDetails } from '@/utils/localStorage';
import { SuspenseWithPerf, useUser, useAuth, useFirestore, useFirestoreCollectionData } from 'reactfire';
import { PageLoading } from '@ant-design/pro-layout';
const { Paragraph } = Typography;



const welcomeMessage = (belongs: boolean) => belongs ? 
"It looks like you belong to a company already using Sortd. Please select the company you'd like to join, or create a new one below." : 
"First things first, you'll need to create an organisation to store all your change activity. You can do that below."

function JoinOrg ({submitting, joinOrg, dispatch}){

const user:firebase.User = useUser()
const auth:any = useAuth()

const domain = user?.email?.split('@')[1]

  const orgRef = useFirestore()
  .collection('companies')
  .where("allowed_domains", "array-contains", domain || '')
  .where("ssu", "==", true);

    const orgs:any = useFirestoreCollectionData(orgRef);

    const nullData: Partial<any> = {};

    const saveUser = (uid: string, orgID: string) => {
      const payload = {uid: uid, orgID: orgID}

      dispatch({
        type: 'joinOrg/joinOrg',
        payload: payload,
      });



  }


    return (
        <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>
            </div>
            <div className={styles.title}>Sortd Organisational Change Management Platform</div>
            <div className={styles.subtitle}>Welcome to Sortd, {user.displayName || user.email}!</div>
            <div className={styles.desc}>{welcomeMessage(orgs.length > 0)} {orgs.length == 0 &&  <Tooltip title="If you can't see your company below, but you know they're already using Sortd, it may be possible that they haven't enabled self sign up. Contact your comanies Sortd administrator for help"><QuestionCircleOutlined /></Tooltip>}</div>
          </div>
      <div className={styles.main}>
        <div className={styles.cardList}>

        <List<Partial<any>>
            rowKey="id"
            grid={{ gutter: 24, lg: 1, md: 1, sm: 1, xs: 1 }}
            dataSource={[...orgs, nullData]}
            renderItem={item => {
              if (item && item.id) {
                return (
                  <List.Item key={item.id}>
                    <Card
                      hoverable
                      className={styles.card}
                      loading={submitting}
                      onClick={() => saveUser(user.uid, item.id)}
                    >
                      <Card.Meta
                        avatar={<img alt="" className={styles.cardAvatar} src={item.avatar} />}
                        title={<a>{item.name}</a>}
                        description={
                          <Paragraph className={styles.item} ellipsis={{ rows: 3 }}>
                            {item.description}
                          </Paragraph>
                        }
                      />
                    </Card>
                  </List.Item>
                );
              }
              return <>
              <List.Item>
                <Button type="dashed" className={styles.newButton} >
                  <PlusOutlined style={{fontSize: 30}} /><br/>Create a New Organisation
                </Button>
              </List.Item>
              </>;
            }}
          />
          </div>
          <Button type='danger' block onClick={() => auth.signOut()}>Cancel</Button>
      </div>
      </div>
      </div>
    );
  }

  function JoinOrgContainer(props) {
    return (
        <SuspenseWithPerf
            fallback={<PageLoading />}
            traceId={'join-org'}
        >
            <JoinOrg {...props}/>
        </SuspenseWithPerf>
    )
}

export default connect(({ joinOrg, loading }: any) => ({
  joinOrg: joinOrg,
  submitting: loading.effects['joinOrg/joinOrg'],
}))(JoinOrgContainer);
