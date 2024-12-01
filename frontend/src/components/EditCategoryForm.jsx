import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button } from 'antd';

export default function EditCategoryForm({highlighted, description, setAuthorized}){

    const { Item } = Form;
    const navigate = useNavigate(); 

    const [formData, setFormData] = useState({
      strCategory: highlighted || '',
      strCategoryDescription: description || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

    const onFinish = (values) => {
        const token = sessionStorage.getItem("token");
        fetch(`${process.env.REACT_APP_SERVER_URL}/categories/${highlighted}/edit`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(values)
        })
        .then((response) => {
            if (!response.ok) {
                if(response.status === 401){
                    setAuthorized(false);
                    if(token){
                        navigate("/admin");
                    }
                }
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            alert('Category updated successfully');
            navigate(`/category/${values.strCategory}`);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error updating category:', error);
            
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
        initialValues={formData}
        onFinish={onFinish}
      >
        <Item
          label="Name"
          name="strCategory"
          rules={[
            {
              required: true,
              message: "Please input name!",
            },
          ]}
        >
          <Input
            name="strCategory"
            value={formData.strCategory}
            onChange={handleInputChange}
          />
        </Item>
        <Item
          label="Description"
          name="strCategoryDescription"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <Input.TextArea
            name="strCategoryDescription"
            value={formData.strCategoryDescription}
            onChange={handleInputChange}
            autoSize={{ minRows: 5, maxRows: 10 }}
          />
        </Item>
        <Item
          wrapperCol={{
            xs: { span: 24 },
            sm: { span: 12, offset: 6 },
          }}
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Item>
      </Form>
    )
}