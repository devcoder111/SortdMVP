import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { history, ConnectProps, connect, Dispatch } from 'umi';
import { ConnectState } from '@/models/connect';
import { CurrentUser } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import { useUser, SuspenseWithPerf, useAuth } from 'reactfire';

export interface GlobalHeaderRightProps extends Partial<ConnectProps> {
  currentUser?: CurrentUser;
  menu?: boolean;
  dispatch: Dispatch;
}

function AvatarDropdown({currentUser, menu, dispatch}:GlobalHeaderRightProps) {
  const user = useUser();
  const auth = useAuth()

  const onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      auth.signOut() 
      return;
    }

    history.push(`/account/${key}`);
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <UserOutlined />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <SettingOutlined />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={user?.avatar} alt="avatar" />
          <span className={styles.name}>{user?.displayName}</span>
        </span>
      </HeaderDropdown>
    )
}

function AvatarDropdownContainer() {
  return (
      <SuspenseWithPerf
          fallback={<Spin spinning />}
          traceId={'load-avatar'}
      >
          <AvatarDropdown />
      </SuspenseWithPerf>
  )
}

export default AvatarDropdownContainer;
