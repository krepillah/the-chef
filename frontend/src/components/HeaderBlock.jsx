import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Layout, Menu } from 'antd';
import { SettingOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { getAllCategories } from '../api';

export default function HeaderBlock(props) {
    const { catalog, setCatalog } = props;
    const [current, setCurrent] = useState('logo');
    const { Header } = Layout;
    const location = useLocation();

    useEffect(() => {
        getAllCategories().then((data) => {
            setCatalog(data.categories);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const onClick = (e) => {
        setCurrent(e.key);
    };

    const items = [
        {
            key: 'logo',
            label: (
                <Link
                    to="/"
                    className="brand-logo"
                >
                    <img
                        src="/the-chef/images/chef-logo.jpg"
                        alt="Chef-logo"
                    />
                </Link>
            ),
        },
        {
            label: 'Categories',
            key: 'categories',
            children: catalog.map((el) => ({
                label: (
                    <Link to={`/category/${el.strCategory}`}>
                        {el.strCategory}
                    </Link>
                ),
                key: `category-${el.strCategory}`,
            })),
        },
        {
            label: (
                <Link
                    to="/saved"
                    className="header-menu-item"
                >
                    Saved
                </Link>
            ),
            key: 'saved',
            icon: current === 'saved' ? <HeartFilled /> : <HeartOutlined />,
        },
        {
            label: (
                <Link
                    to="/about"
                    className="header-menu-item"
                >
                    About
                </Link>
            ),
            key: 'about',
        },
        {
            key: 'api',
            label: (
                <a
                    href="https://themealdb.com/api.php"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    API
                </a>
            ),
            icon: <SettingOutlined style={{ color: 'white' }} />,
        },
        {
            label: (
                <Link
                    to="/admin"
                    className="header-menu-item"
                >
                    Admin
                </Link>
            ),
            key: 'about',
        },
    ];

    return (
        <Layout
            style={{
                height: '64px',
                minHeight: 'auto',
                position: 'sticky',
                top: '0',
                zIndex: '100',
                flex: 'inherit',
            }}
        >
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: '64px',
                    justifyContent: 'center',
                }}
            >
                <Menu
                    // selectedKeys={[current]}
                    style={{
                        background: 'none',
                        color: '#ffffffa6!important',
                    }}
                    onClick={onClick}
                    selectedKeys={[current]}
                    mode="horizontal"
                    theme="dark"
                    selectable="false"
                    items={items}
                />
            </Header>
        </Layout>
    );
}
