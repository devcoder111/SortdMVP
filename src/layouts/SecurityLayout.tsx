import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import { FirebaseAppProvider, AuthCheck, SuspenseWithPerf } from 'reactfire';
import { firebaseConfig } from '../../config/firebase.config';
import LoginPage from '@/pages/Login';
import JoinOrg from '@/pages/Login/JoinOrg';
import { OrgCheck } from './OrgChecker';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  currentUser?: CurrentUser;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
    }


  }



  componentDidUpdate()
  {
    // setTimeout(function()
    // {
    //     inpEle = document.evaluate('/html/body/div[1]/div/div[2]/div[2]/div/form/div[2]/div/div[1]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue);
    // }
    // , 100
    // );

    function timeout()
    {
      setTimeout(function () {
          var inpEle = document.evaluate('/html/body/div[1]/div/div[2]/div[2]/div/form/div[2]/div/div[1]/input', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

          if (inpEle != null)
          {
            var email = window.localStorage.getItem('emailForSignIn');
            console.log("email:", email);
            //if (!email)
            {
              // User opened the link on a different device. To prevent session fixation
              // attacks, ask the user to provide the associated email again. For example:
              //email = window.prompt('Please provide your email for confirmation');
              window.localStorage.setItem('emailForSignIn' ,inpEle.value );
            }
          }
          timeout();

      }, 100);
    };
    timeout();
  }

  render() {
    const { isReady } = this.state;
    const { children, loading, currentUser } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const isLogin = currentUser && currentUser.userid;

    const queryString = stringify({
      redirect: window.location.href,
    });


    return  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
              <SuspenseWithPerf fallback={<PageLoading />} traceId={'auth-check'}>
                <AuthCheck fallback={<LoginPage />}>
                  <OrgCheck fallback={<JoinOrg />}>
                    {children}
                  </OrgCheck>
                </AuthCheck>
              </SuspenseWithPerf>
            </FirebaseAppProvider>

    if ((!isLogin && loading) || !isReady) {
      return <PageLoading />;
    }
    if (!isLogin && window.location.pathname !== '/user/login') {
      return <Redirect to={`/user/login?${queryString}`} />;
    }
    return children;
  }
}


export default connect(({ user, loading }: ConnectState) => ({
  currentUser: user.currentUser,
  loading: loading.models.user,
}))(SecurityLayout);
