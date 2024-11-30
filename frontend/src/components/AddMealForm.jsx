import { useState } from 'react';
import { Form, Input, Button, Space, Select } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

export default function AddMealForm({ setAuthorized, catalog }) {
    const [ingredientCount, setIngredientCount] = useState(5);
    const { Item } = Form;
    const { Option } = Select;

    const addIngredient = () => {
        setIngredientCount(ingredientCount + 1);
    };

    const deleteIngredient = () => {
        setIngredientCount(ingredientCount - 1);
    };

    const ingredientItems = [];

    for (let i = 1; i <= ingredientCount; i++) {
        ingredientItems.push(
            <Item
                key={`ingredient${i}`}
                label={`Ingredient ${i}`}
                style={{ marginBottom: 8 }}
            >
                <Space.Compact block>
                    <Item
                        name={`strIngredient${i}`}
                        noStyle
                    >
                        <Input
                            style={{ width: '50%' }}
                            placeholder={`Ingredient ${i}`}
                        />
                    </Item>
                    <Item
                        name={`strMeasure${i}`}
                        noStyle
                    >
                        <Input
                            style={{ width: '50%' }}
                            placeholder={`Measure ${i}`}
                        />
                    </Item>
                </Space.Compact>
            </Item>
        );
    }

    const onFinish = (values) => {
        const token = sessionStorage.getItem("token");
        fetch(`${process.env.REACT_APP_SERVER_URL}/meal/new`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(values)
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
            alert('Meal added successfully');
        })
        .catch((error) => {
            console.error('Error adding meal:', error);

        })
    };

    return (
        <Form
            name="add-meal"
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
                name="strMeal"
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
                label="Category"
                name="idCategory"
                rules={[
                    {
                        required: true,
                        message: 'Please select category!',
                    },
                ]}
            >
                <Select
                    allowClear
                    >
                        {catalog.map((element) => 
                            <Option key={element.idCategory} value={element.idCategory}>{element.strCategory}</Option>
                        )}
                </Select>
            </Item>
            <Item
                label="Area"
                name="strArea"
                rules={[
                    {
                        required: true,
                        message: 'Please input area!',
                    },
                ]}
            >
                <Input />
            </Item>
            <Item
                label="Instruction"
                name="strInstructions"
                rules={[
                    {
                        required: true,
                        message: 'Please input instruction!',
                    },
                ]}
            >
                <Input.TextArea />
            </Item>
            <Item
                label="Image URL"
                name="strMealThumb"
                rules={[
                    {
                        required: true,
                        message: 'Please input URL!',
                    },
                ]}
            >
                <Input />
            </Item>
            <Item
                label="Tags"
                name="strTags"
            >
                <Input />
            </Item>
            <Item
                label="Video URL"
                name="strYoutube"
                rules={[
                    {
                        required: true,
                        message: 'Please input URL!',
                    },
                ]}
            >
                <Input />
            </Item>

            {ingredientItems}

            <Item
                wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 18, offset: 6 },
                }}
            >
                <Space.Compact block>
                    <Button
                        type="dashed"
                        onClick={deleteIngredient}
                        icon={<MinusOutlined />}
                        block
                        style={{ width: '50%' }}
                    >
                        Delete
                    </Button>

                    <Button
                        type="dashed"
                        onClick={addIngredient}
                        icon={<PlusOutlined />}
                        block
                        style={{ width: '50%' }}
                    >
                        Add
                    </Button>
                
                </Space.Compact>
            </Item>

            <Item
                wrapperCol={{
                    xs: { span: 24 },
                    sm: { span: 12, offset: 6 },
                }}
            >
                <Button
                    block
                    type="primary"
                    htmlType="submit"
                >
                    Save
                </Button>
            </Item>
        </Form>
    );
}
