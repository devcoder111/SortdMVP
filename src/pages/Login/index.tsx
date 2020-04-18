import { getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import {Link} from 'umi';
import React from 'react';
import GlobalFooter from '@ant-design/pro-layout/lib/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import logo from '@/assets/full-logo.png';
import styles from './styles.less';
import { Layout } from 'antd';
import minilogo from '@/assets/mini-logo.png';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import * as firebase from 'firebase';
import { useAuth } from 'reactfire';
import { setToken, setUserDetails, setOrgDetails, getToken, getUserDetails } from '@/utils/localStorage';
import getEmail from './getEmail';

const { Footer } = Layout;


const defaultCopyright = ' Sortd Consulting Pty Ltd';
const defaultLinks = [
  {
    key: 'sortd',
    title:  'Sortd.io',
    href: 'https://sortd.io',
    blankTarget: true,
  },
  {
    key: 'documentation',
    title: 'Documentation',
    href: 'https://sortd.io/docs',
    blankTarget: true,
  },
];
const LoginPage: React.SFC<UserLayoutProps> = props => {
  const auth = useAuth();
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes);
  // let btn=document.getElementsByClassName("firebaseui-id-submit");
  // console.log("ddd", btn);

  setUserDetails('')
  setOrgDetails('')
  console.log("previous token", getToken())
  setToken('')
  const actionCodeSettings = {
    // Your redirect URL
    url: window.location.href,
    handleCodeInApp: true,
  };
  console.log("loginpageauth", firebase.auth().isSignInWithEmailLink(window.location.href));
  console.log("firbeaseauth", firebase.auth());

  // firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
  // .then(function() {
  //   // The link was successfully sent. Inform the user.
  //   // Save the email locally so you don't need to ask the user for it again
  //   // if they open the link on the same device.
  //   window.localStorage.setItem('emailForSignIn', email);
  // })
  // .catch(function(error) {
  //   // Some error occurred, you can inspect the code: error.code
  // });

// Confirm the link is a sign-in with email link.
firebase.auth().onAuthStateChanged(function() {
  console.log("ee");
});
if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
  // Additional state parameters can also be passed via URL.
  // This can be used to continue the user's intended action before triggering
  // the sign-in operation.
  // Get the email if available. This should be available if the user completes
  // the flow on the same device where they started it.
  var email = window.localStorage.getItem('emailForSignIn');
  console.log("email:", email);
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      console.log("authemail", firebase.auth);
      email = window.prompt('Please provide your email for confirmation');

    }
    // The client SDK will parse the code from the link for you.
    firebase.auth().signInWithEmailLink(email, window.location.href)
      .then(function(result: any) {
        setUserDetails(result.user.uid)
            auth.currentUser?.getIdTokenResult()
            .then((idTokenResult: any) => {
                setOrgDetails(idTokenResult.claims?.orgID)
                console.log("token: ", idTokenResult.token)
                setToken(idTokenResult.token)
            })
        // Clear email from storage.
        window.localStorage.removeItem('emailForSignIn');
        // You can access the new user via result.user
        // Additional user info profile not available via:
        // result.additionalUserInfo.profile == null
        // You can check if the user is new or existing:
        // result.additionalUserInfo.isNewUser
      })
      .catch(function(error: any) {
        console.log("isSigninEmailError",error)

        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
      });
  }
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    credentialHelper: 'none',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        // Use email link authentication and do not require password.
        // Note this setting affects new users only.
        // For pre-existing users, they will still be prompted to provide their
        // passwords on sign-in.
        signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,

        // Allow the user the ability to complete sign-in cross device, including
        // the mobile apps specified in the ActionCodeSettings object below.
        forceSameDevice: false,
        // Used to define the optional firebase.auth.ActionCodeSettings if
        // additional state needs to be passed along request and whether to open
        // the link in a mobile app if it is installed.
        emailLinkSignIn: function() {

            return {
              // Custom FDL domain.
              dynamicLinkDomain: 'portal.sortd.io',
              // Always true for email link sign-in.
              handleCodeInApp: true,
              // Whether to handle link in iOS app if installed.
            };
          }
      },

      {
        provider: 'microsoft.com',
        loginHintKey: 'login_hint',

    },
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,


    ],
    callbacks: {
        signInSuccessWithAuthResult: (response: any) => {
            setUserDetails(response.user.uid)
            auth.currentUser?.getIdTokenResult()
            .then((idTokenResult: any) => {
                setOrgDetails(idTokenResult.claims?.orgID)
                setToken(idTokenResult.token)
                console.log("gettoken", getToken(), idTokenResult)
                console.log(idTokenResult.token)
                console.log(auth.currentUser)

            })
        },

      },
  };

  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        ...props,
      })}
    >
      <div className={styles.container}>

        <div className={styles.lang}>
          <SelectLang />
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
              </Link>
            </div>
            <div className={styles.title}>Sortd Organisational Change Management Platform</div>

            <div className={styles.desc}>Please login using one of the methods below to start getting your changes #Sortd</div>
          </div>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
        </div>
        <Footer style={{ padding: 0 }}>
          <GlobalFooter
            links={defaultLinks}
            copyright={
              <>
              <img src={minilogo} height={16}/>
                {defaultCopyright}
              </>
            }
          />
        </Footer>
      </div>
    </DocumentTitle>
  );
};

export default LoginPage;
