import React from 'react';
import { Layout, Space, Typography, Form, Input, message, Button } from "antd";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { StockOutlined } from '@ant-design/icons';
import LayoutNew from '../Layout';

const { Title } = Typography;

const About = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async (values) => {
        const { confirm, ...formData } = values;
      
        try {
          console.log('Entered details:', formData);
          const response = await axios.post('http://localhost:5000/api/bread', formData);
          console.log('Form data saved:', response.data);
          navigate('/suc');
        } catch (error) {
          console.error('Error saving form data:', error.response ? error.response.data : error.message);
          message.error('Registration failed. Please try again.');
        }
      };

  return (
    <div className="about">
      <LayoutNew>
        <Layout>
          <Space
            style={{
              background: "#65451F",
              color: "black",
              padding: "12px",
              borderRadius: "8px",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Space>
              <StockOutlined style={{ fontSize: "24px", marginRight: "8px" }} />
              <Title
                level={2}
                style={{ fontSize: "24px", marginTop: "8px", color: "black" }}
              >
                Department arettyuiy
              </Title>
            </Space>
          </Space>

          <div style={{ padding: '24px' }}>
            <Form
              form={form}
              name="register"
              onFinish={onFinish}
              style={{ maxWidth: 600 }}
              scrollToFirstError
            >
              <Form.Item
                name="breadname"
                label="Name"
                rules={[{ required: true, message: 'Please input the bread name!', whitespace: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: 'Please input the price!', whitespace: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="description"
                label="Description"
                rules={[{ required: true, message: 'Please input the description!', whitespace: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Layout>
      </LayoutNew>
    </div>
  );
}

export default About;
