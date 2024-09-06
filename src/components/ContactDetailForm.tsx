import React from 'react';
import { Form, Input, Select, Col, Row } from 'antd';
import { titleValues } from '../assets/mock';

const ContactDetailsForm: React.FC = () => {
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          {' '}
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Please select your title!' }]}
          >
            <Select
              showSearch
              placeholder='Select Title'
              optionFilterProp='label'
              options={titleValues}
            />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            label='First Name + Middle Name'
            name='firstName'
            rules={[{ required: true, message: 'Please enter your first and middle name' }]}
          >
            <Input placeholder='Yin Yin' />
          </Form.Item>
        </Col>
        <Col span={9}>
          {' '}
          <Form.Item
            label='Last Name'
            name='lastName'
            rules={[{ required: true, message: 'Please enter your last name' }]}
          >
            <Input placeholder='Kyi' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          {' '}
          <Form.Item label='Mobile Number' name='phone'>
            <Input addonBefore='+66' placeholder='955344187' />
          </Form.Item>
        </Col>
        <Col span={12}>
          {' '}
          <Form.Item
            label='Email*'
            name='email'
            rules={[
              { required: true, type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input placeholder='yinyinkyi90@gmail.com' />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ContactDetailsForm;
