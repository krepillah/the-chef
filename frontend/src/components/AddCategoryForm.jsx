import { Form, Input, Button } from "antd"

export default function AddCategoryForm ({setAuthorized}) {
    const {Item} = Form;

    const onFinish = (values) => {
        const token = sessionStorage.getItem("token");
        fetch(`${process.env.REACT_APP_SERVER_URL}/categories/new`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                strCategory: values.name,
                strCategoryThumb: values.url,
                strCategoryDescription: values.description,
            })
        })
        .then((response) => {
            console.log(response);
            if (!response.ok) {
                if(response.status === 401){
                    setAuthorized(false);
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            alert('Category added successfully');
        })
        .catch((error) => {
            console.error('Error adding category:', error);
            
        })

    }
    
    return (
        <Form
            name="add-category"
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
                label="Name"
                name="name"
                rules={[
                    {
                    required: true,
                    message: 'Please input name!',
                    },
                ]}
                >
                <Input />
            </Item>
            <Item
                label="Description"
                name="description"
                rules={[
                    {
                    required: true,
                    message: 'Please input description!',
                    },
                ]}
                >
                <Input.TextArea/>
            </Item>
            <Item
                label="Image URL"
                name="url"
                rules={[
                    {
                    required: true,
                    message: 'Please input URL!',
                    },
                ]}
                >
                <Input/>
            </Item>
            <Item
                wrapperCol={{
                    xs: { span: 24 }, 
                    sm: { span: 12, offset: 6 },
                }}
            >
                <Button block type="primary" htmlType="submit">
                    Save
                </Button>
            </Item>
        </Form>
    )
}