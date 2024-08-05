import React, { useState } from 'react';
import { Layout, Space, Typography, Form, message, Button, Modal } from "antd";
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';
import { StockOutlined } from '@ant-design/icons';
import LayoutNew from '../Layout';
import ItemForm from './AddEditItems';

const { Title } = Typography;

const About = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);

  const handleCancel = () => {
    setIsAddItemModalVisible(false);
  };

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
            <Button type="primary" onClick={() => setIsAddItemModalVisible(true)}>
              Add Department
            </Button>
          </Space>

          <Modal
            open={isAddItemModalVisible}
            cancelText="Cancel"
            onCancel={handleCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  onFinish(values);
                  setIsAddItemModalVisible(false);
                })
                .catch((errorInfo) => {
                  console.log("Validation Failed:", errorInfo);
                });
            }}
          >
            <ItemForm form={form} onFinish={onFinish} />
          </Modal>
        </Layout>
      </LayoutNew>
    </div>
  );
};

export default About;
