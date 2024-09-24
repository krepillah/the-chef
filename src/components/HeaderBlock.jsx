import { Link} from "react-router-dom";
import { Layout, Menu} from "antd";
import {  UserOutlined, MailOutlined, SettingOutlined  } from '@ant-design/icons';

export default function HeaderBlock({ catalog = [] }) {
    const { Header } = Layout;

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
              О проекте
            </Link>
          ),
          key: 'about',
        },
        {
          label: (
            <Link to="/contacts" className="header-menu-item">
                Контакты
            </Link>
          ),
          key: 'contacts',
        },
        {
          label: 'Категории',
          key: 'categories',
          children: catalog.map((el) => (
            {
              label: (
                <Link to={`/category/${el.idCategory}`}>
                  {el.strCategory}
                </Link>
              ),
              key: `category-${el.idCategory}`,
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
            }}
            >
            <Menu 
            // selectedKeys={[current]} 
              style={{
                background: "none",
                color: "white",
            }}
            mode="horizontal"
            theme="dark"
            selectable="false" 
            items={items} />
            </Header>
        </Layout>
    )
}