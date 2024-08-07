import React, { useState } from 'react';
import { Form, Row, Col, Input, Button, Upload, message } from 'antd';
import { storage, auth } from '../common/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword } from 'firebase/auth';

const ItemForm = ({ form, onFinish = () => {} }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = ({ fileList }) => {
    if (fileList.length > 0) {
      setFile(fileList[0].originFileObj);
    } else {
      message.error("Failed to select file.");
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      message.error("No file selected for upload.");
      return null;
    }

    try {
      // Sign in the user (replace with actual credentials)
      const userCredential = await signInWithEmailAndPassword(auth, "divensignature@gmail.com", "12345678");
      const user = userCredential.user;

      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            // Handle progress
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            message.error(`Upload failed: ${error.message}`);
            reject(error);
          },
          async () => {
            try {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              message.success("Upload successful!");
              resolve(downloadURL);
            } catch (error) {
              message.error(`Failed to retrieve download URL: ${error.message}`);
              reject(error);
            }
          }
        );
      });
    } catch (error) {
      message.error(`Authentication failed: ${error.message}`);
      return null;
    }
  };

  const handleSubmit = async (values) => {
    console.log('onFinish type:', typeof onFinish);
    const imageURL = await handleUpload(file);
    if (imageURL) {
      onFinish({ ...values, imageURL });
    } else {
      message.error('Image upload failed. Please try again.');
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
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            fileList={file ? [{ originFileObj: file, uid: '1', name: file.name }] : []}
          >
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
