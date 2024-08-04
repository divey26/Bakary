import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', values);
      const { token } = response.data;

      // Store the token in localStorage or a state management tool
      localStorage.setItem('token', token);

      // Redirect to the home page or dashboard
      navigate('/home');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      style={{ maxWidth: 300, margin: '0 auto', paddingTop: '100px' }}
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[{ type: 'email', message: 'The input is not valid E-mail!' }, { required: true, message: 'Please input your E-mail!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Login</Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
