import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';

import { useAppContext } from '@/context/appContext';
import logoIcon from '@/style/images/logo-icon.png';
import logoText from '@/style/images/logo-text.png';

import { useTranslation } from "react-i18next";

import {
  SettingOutlined,
  CustomerServiceOutlined,
  FileTextOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
  UserOutlined,
  CreditCardOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;
const { SubMenu } = Menu;

export default function Navigation() {
  const { t } = useTranslation();
  const { state: stateApp, appContextAction } = useAppContext();
  const { isNavMenuClose } = stateApp;
  const { navMenu } = appContextAction;
  const [showLogoApp, setLogoApp] = useState(isNavMenuClose);

  useEffect(() => {
    if (isNavMenuClose) {
      setLogoApp(isNavMenuClose);
    }
    const timer = setTimeout(() => {
      if (!isNavMenuClose) {
        setLogoApp(isNavMenuClose);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [isNavMenuClose]);
  const onCollapse = () => {
    navMenu.collapse();
  };

  return (
    <>
      <Sider collapsible collapsed={isNavMenuClose} onCollapse={onCollapse} className="navigation">
        <div className="logo">
          <img
            src={logoIcon}
            alt="Logo"
            style={{ height: '67px' }}
            // style={{ margin: "0 auto 40px", display: "block" }}
          />

          {!showLogoApp && (
            <img
              src={logoText}
              alt="Logo"
              style={{ height: '27px', width: '80px', marginTop: '3px' }}
            />
          )}
        </div>
        <Menu mode="inline">
          <Menu.Item key={'Dashboard'} icon={<DashboardOutlined />}>
            <Link to={'/'} />
            {t('sidebar_menu_dashboard')}
          </Menu.Item>
          <SubMenu key={'Purchasing'} icon={<SettingOutlined />} title={t('sidebar_menu_purchasing')}>
            <Menu.Item key={'Suplier'} icon={<UsergroupAddOutlined />}>
              <Link to={'/suplier'} />
            {t('sidebar_menu_supplier')}
            </Menu.Item>
            <Menu.Item key={'Bills'} icon={<UsergroupAddOutlined />}>
              <Link to={'/bills'} />
            {t('sidebar_menu_bill')}
            </Menu.Item>
          </SubMenu>
          <SubMenu key={'Settings'} icon={<SettingOutlined />} title={t('sidebar_menu_setting')}>
            <Menu.Item key={'SettingsPage'}>
              <Link to={'/settings'} />
              General Settings
            </Menu.Item>
            <Menu.Item key={'PaymentMode'}>
              <Link to={'/payment/mode'} />
              Payment Mode
            </Menu.Item>
            <Menu.Item key={'Role'}>
              <Link to={'/role'} />
              Role
            </Menu.Item>
          </SubMenu>
          <Menu.Item key={'Customer'} icon={<CustomerServiceOutlined />}>
            <Link to={'/customer'} />
            {t('sidebar_menu_customer')}
          </Menu.Item>
          <Menu.Item key={'Invoice'} icon={<FileTextOutlined />}>
            <Link to={'/invoice'} />
            {t('sidebar_menu_invoice')}
          </Menu.Item>
          <Menu.Item key={'Quote'} icon={<FileSyncOutlined />}>
            <Link to={'/quote'} />
            Quote
          </Menu.Item>
          <Menu.Item key={'PaymentInvoice'} icon={<CreditCardOutlined />}>
            <Link to={'/payment/invoice'} />
            {t('sidebar_menu_invoicepayment')}
          </Menu.Item>
          <Menu.Item key={'Employee'} icon={<UserOutlined />}>
            <Link to={'/employee'} />
            {t('sidebar_menu_employee')}
          </Menu.Item>
          <Menu.Item key={'Admin'} icon={<TeamOutlined />}>
            <Link to={'/admin'} />
            Admin
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
