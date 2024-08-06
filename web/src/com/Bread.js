import React, { useState, useEffect } from 'react';
import { Layout, Space, Typography, Form, message, Button, Modal, Table } from "antd";
import axios from 'axios'; 
import { StockOutlined } from '@ant-design/icons';
import LayoutNew from '../Layout';
import ItemForm from './AddEditItems';

const { Title } = Typography;

const BreadManagementPage = () => {
  const [form] = Form.useForm();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [breads, setBreads] = useState([]);

  const handleCancel = () => {
    setIsAddItemModalVisible(false);
  };

  const onFinish = async (values) => {
    const { confirm, ...formData } = values;
    
    try {
      console.log('Entered details:', formData);
      const response = await axios.post('http://localhost:5000/api/bread', formData);
      console.log('Form data saved:', response.data);
      fetchBreads(); // Refresh the list of breads after adding new item
      setIsAddItemModalVisible(false);
    } catch (error) {
      console.error('Error saving form data:', error.response ? error.response.data : error.message);
      message.error('Registration failed. Please try again.');
    }
  };

  const fetchBreads = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/breads');
      setBreads(response.data);
    } catch (error) {
      console.error('Error fetching breads:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    fetchBreads(); // Fetch the list of breads when the component mounts
  }, []);

  const columns = [
    {
      title: 'Bread Name',
      dataIndex: 'breadname',
      key: 'breadname',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const tableHeaderStyle = {
    backgroundColor: '#f0f0f0', // Change to your desired color
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
                Bread
              </Title>
            </Space>
            <Button type="primary" onClick={() => setIsAddItemModalVisible(true)}>
              Add Bread
            </Button>
          </Space>

          <Table
            dataSource={breads}
            columns={columns}
            rowKey="_id"
            style={{ marginTop: '20px' }}
            onHeaderRow={() => {
              return {
                style: tableHeaderStyle,
              };
            }}
          />

          <Modal
            open={isAddItemModalVisible}
            cancelText="Cancel"
            onCancel={handleCancel}
            onOk={() => {
              form
                .validateFields()
                .then((values) => {
                  onFinish(values);
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

export default BreadManagementPage;
