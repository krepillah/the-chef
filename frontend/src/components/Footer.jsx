import { Layout, Row, Col, Typography, Menu } from 'antd';
import { Link } from "react-router-dom";

export default function Footer() {
    const { Footer } = Layout;
    const { Title, Text } = Typography;
    const { Item } = Menu; 
    
    return (
        <Footer style={{ backgroundColor: '#001529', padding: '24px 50px' }}>
            <div className="footer-main-content">
                <Row justify="space-between" gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={12}>
                        <Title level={5} style={{ color: '#fff' }}>
                        Interest
                        </Title>
                        <Text style={{ color: '#8c8c8c' }}>
                        Imagine that there is a cool footer here and you feel incredible
                        pleasure reading it.
                        </Text>
                    </Col>
                    <Col xs={24} sm={12} lg={8}>
                        <Menu theme="dark" mode="vertical" style={{ backgroundColor: '#001529' }}>
                            <Item key="0">
                                <Title level={5} style={{ color: '#fff' }}>
                                    Links
                                </Title>
                            </Item>
                            <Item key="1">
                                <a href="#!" style={{ color: '#8c8c8c' }}>
                                Instagram
                                </a>
                            </Item>
                            <Item key="2">
                                <a
                                href="https://github.com/krepillah"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: '#8c8c8c' }}
                                >
                                GitHub
                                </a>
                            </Item>
                            <Item key="3">
                                <a href="#!" style={{ color: '#8c8c8c' }}>
                                Telegram
                                </a>
                            </Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
            <div className="footer-copyright">
                <Row justify="space-between" align="middle">
                <Col>
                    <Text style={{ color: '#8c8c8c' }}>
                    © {new Date().getFullYear()} Copyright Text
                    </Text>
                </Col>
                <Col>
                    <Link to="/about" style={{ color: '#8c8c8c' }}>
                    About us
                    </Link>
                </Col>
                </Row>
            </div>
        </Footer>
    );
}
