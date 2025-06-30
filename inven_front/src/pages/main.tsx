import React from 'react';
import { Breadcrumb, Button, ConfigProvider, Layout, Menu, MenuProps, Table, theme } from 'antd';
import { CarryOutOutlined, ContactsFilled, ContactsOutlined, ProductOutlined, TruckOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
    key,
    label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [
    ProductOutlined,
    ProductOutlined,
    TruckOutlined,
    CarryOutOutlined,
    ContactsOutlined,
].map((icon, index) => {
    const key = String(index + 1);

    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
    };
});

export const Main = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    return (
        <Layout>
            <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'right' }}>
                <div className="demo-logo" />
                <div>
                    <Button type="primary" onClick={() => navigate('/login')}>
                        로그인
                    </Button>
                </div>
            </Header>
            <div style={{ padding: '0 48px' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[{ title: 'Home' }, { title: 'App' }, { title: 'Dashboard' }]}
                />
                <Layout style={{ padding: '30px 0', background: colorBgContainer, borderRadius: borderRadiusLG }}>
                    <Sider style={{ background: colorBgContainer }} width={220}>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                            items={items2}
                        />
                    </Sider>
                    <Content style={{ padding: '0 24px', minHeight: 300 }}>Content</Content>
                </Layout>
            </div>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
        </Layout>
    );
};
