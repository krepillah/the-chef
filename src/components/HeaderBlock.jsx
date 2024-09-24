import { Link} from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCategories } from "../api";
import { Layout, Menu} from "antd";
import {  SettingOutlined  } from '@ant-design/icons';

export default function HeaderBlock(props) {
  const {catalog, setCatalog} = props;
    const { Header } = Layout;

    useEffect(() => {
      getAllCategories().then(data => {
          setCatalog(data.categories)
      })
  }, []);

  const [current, setCurrent] = useState('logo');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

    const items = [
        {
          key: 'logo',
          label: (
            <Link to="/" className="brand-logo">
              <img
                  src="/images/chef-logo.jpg"
                  alt="Chef-logo"
              />
            </Link>
          ),
        },
        {
          label: (
            <Link to="/about" className="header-menu-item">
              About
            </Link>
          ),
          key: 'about',
        },
        {
          label: (
            <Link to="/contacts" className="header-menu-item">
                Contacts
            </Link>
          ),
          key: 'contacts',
        },
        {
          label: 'Categories',
          key: 'categories',
          children: catalog.map((el) => (
            {
              label: (
                <Link to={`/category/${el.strCategory}`}>
                  {el.strCategory}
                </Link>
              ),
              key: `category-${el.strCategory}`,
            }
          )),
        },
        {
          key: 'api',
          label: (
            <a href="https://themealdb.com/api.php" target="_blank" rel="noopener noreferrer">
                API
            </a>
          ),
          icon: <SettingOutlined style={{color: "white"}}/>,
        },
    ];

    return (
        <Layout style={{
            height: '64px',
            minHeight: 'auto',
        }}>
            <Header
            style={{
                display: 'flex',
                alignItems: 'center',
                height: "64px",
                justifyContent: "center",
            }}
            >
            <Menu 
            // selectedKeys={[current]} 
              style={{
                background: "none",
                color: "white",
            }}
            onClick={onClick} 
            selectedKeys={[current]}
            mode="horizontal"
            theme="dark"
            selectable="false" 
            items={items} />
            </Header>
        </Layout>
    )
}