import { Form, Input, Button, Row, Col } from "antd"

export default function AuthForm({setAuthorized}){
    const {Item} = Form;

    const onFinish = (values) => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: values.email,
                password: values.password,
            }),
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            sessionStorage.setItem('token', data.session.access_token);
            setAuthorized(true);
        })
        .catch((error) => {
            console.error('Login failed:', error);
        });
    }

    return (
        <Row justify="center">
            <Col xs={24} sm={16} md={12} lg={10} xxl={6}>
                <Form
                    name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    autoComplete="off"
                    onFinish={onFinish}
                    initialValues={{
                        remember: true,
                    }}
                >
                    <Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your email!',
                            },
                        ]}
                        >
                        <Input />
                    </Item>

                    <Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Please input your password!',
                            },
                        ]}
                        >
                        <Input.Password />
                    </Item>
                    <Item
                        wrapperCol={{
                            xs: { span: 24 }, 
                            sm: { span: 12, offset: 6 },
                        }}
                    >
                        <Button block type="primary" htmlType="submit">
                            Log in
                        </Button>
                    </Item>
                </Form>
            </Col>
        </Row>
    )
}