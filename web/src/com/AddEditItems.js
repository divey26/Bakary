import React, { useState } from 'react';
import { Form, Row, Col, Input, Button, Upload, message } from 'antd';
import { storage, auth } from '../common/firebaseConfig'; // Import from your firebaseConfig file
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword } from 'firebase/auth';

const ItemForm = ({ form, onFinish }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = ({ file }) => {
    setFile(file.originFileObj);
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("No file selected for upload.");
      return null;
    }

    try {
      // You need to have user authentication already set up in your app
      const userCredential = await signInWithEmailAndPassword(auth, "divensignature@gmail.com", "1234567890");
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            // Handle progress, pause, and resume states here
          },
          (error) => {
            message.error(`Upload failed: ${error.message}`);
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            message.success("Upload successful!");
            resolve(downloadURL);
          }
        );
      });
    } catch (error) {
      message.error(`Authentication failed: ${error.message}`);
      return null;
    }
  };

  const handleSubmit = async (values) => {
    const imageURL = await handleUpload();
    if (imageURL) {
      onFinish({ ...values, imageURL });
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Form.Item
            name="breadname"
            label="Name"
            rules={[{ required: true, message: 'Please input the bread name!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please input the price!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please input the description!', whitespace: true }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Upload beforeUpload={() => false} onChange={handleFileChange}>
            <Button>Select File</Button>
          </Upload>
        </Col>
      </Row>
      <Row>
        <Col span={8}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ItemForm;
