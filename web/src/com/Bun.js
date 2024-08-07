import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Space, Typography, Form, message, Button, Modal, Table, Image } from "antd";
import axios from 'axios';
import { StockOutlined } from '@ant-design/icons';
import LayoutNew from '../Layout';
import ItemForm from './AddEditItems'; // Ensure this import path is correct

const { Title } = Typography;

const ItemManagementPage = () => {
  const [form] = Form.useForm();
  const [isAddItemModalVisible, setIsAddItemModalVisible] = useState(false);
  const [Items, setItems] = useState([]);

  const handleCancel = () => {
    setIsAddItemModalVisible(false);
  };

  const onFinish = async (values) => {
    try {
      console.log('Entered details:', values);
      const response = await axios.post('http://localhost:5000/api/bun', values);
      console.log('Form data saved:', response.data);
      fetchItems();
      setIsAddItemModalVisible(false);
      message.success('Item added successfully!');
    } catch (error) {
      console.error('Error saving form data:', error.response ? error.response.data : error.message);
      message.error(`Registration failed: ${error.response?.data?.error || 'Please try again.'}`);
    }
  };

  const fetchItems = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/buns');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching buns:', error.response ? error.response.data : error.message);
      message.error('Failed to fetch items. Please try again.');
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const columns = [
    {
      title: 'Item Name',
      dataIndex: 'itemname',
      key: 'itemname',
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
    {
      title: 'Image',
      dataIndex: 'imageURL',
      key: 'imageURL',
      render: (text, record) => <Image width={100} src={record.imageURL} />
    },
  ];

  const tableHeaderStyle = {
    backgroundColor: '#f0f0f0',
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
                Buns
              </Title>
            </Space>
            <Button type="primary" onClick={() => setIsAddItemModalVisible(true)}>
              Add Item
            </Button>
          </Space>

          <Table
            dataSource={Items}
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
            title="Add New Item"
            onCancel={handleCancel}
            footer={[
              <Button key="cancel" onClick={handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={() => form.submit()}>
                Add
              </Button>,
            ]}
          >
            <ItemForm form={form} onFinish={onFinish} />
          </Modal>
        </Layout>
      </LayoutNew>
    </div>
  );
};

export default ItemManagementPage;
