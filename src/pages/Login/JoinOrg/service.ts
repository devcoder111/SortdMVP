import request from '@/utils/request';
import {isEmpty} from 'lodash';
import { notification } from 'antd';
import { setOrgDetails } from '@/utils/localStorage';
import { history } from 'umi';




export async function joinOrg(payload: any) {
    const response = await request('https://us-central1-sortd-portal.cloudfunctions.net/api/users/joinOrg/', {
        method: 'POST',
        data: payload,
      });
      const status = !isEmpty(response?.userDetails?.customClaims?.orgID) ? 'ok' : 'error'
      if(status == 'ok') {
        notification.success({
          message: 'Successfully joined Organisation',
          description: 'You are being logged in now.'
        })
        setOrgDetails(response?.userDetails?.customClaims?.orgID)
        history.push('/dashboard')
      }
      return {status: status, ...response}
  }
