import React from 'react';
import { Form, Input, Select, DatePicker, Row, Col } from 'antd';
import { nationalityValues, titleValues } from '../assets/mock';

const { Option } = Select;

interface typeTravelerDetails {
  index: number;
}

const TravelerDetailsForm: React.FC<typeTravelerDetails> = ({ index }) => {
  return (
    <>
      <Row gutter={[8, 8]}>
        <Col span={6}>
          {' '}
          <Form.Item
            name={`title-${index}`}
            key={`title-${index}`}
            label='Title'
            rules={[{ required: true, message: 'Please select a title!' }]}
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
            key={`firstName-${index}`}
            name={`firstName-${index}`}
            label='First Name + Middle Name'
            rules={[{ required: true, message: 'Please enter your first and middle name!' }]}
          >
            <Input placeholder='Enter your first and middle name' />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item
            name={`lastName-${index}`}
            label='Last Name'
            rules={[{ required: true, message: 'Please enter your last name!' }]}
          >
            <Input placeholder='Enter your last name' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name={`dateOfBirth-${index}`}
            key={`dateOfBirth-${index}`}
            label='Date of Birth'
            rules={[{ required: true, message: 'Please select your date of birth!' }]}
          >
            <DatePicker placeholder='Select your date of birth' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={`passport-${index}`}
            key={`passport-${index}`}
            label='Passport'
            rules={[{ required: true, message: 'Please enter your passport number!' }]}
          >
            <Input placeholder='Enter your passport number' />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Form.Item
            name={`nationality-${index}`}
            key={`nationality-${index}`}
            label='Nationality'
            rules={[{ required: true, message: 'Please select your nationality!' }]}
          >
            <Select
              showSearch
              placeholder='Select your nationality'
              optionFilterProp='label'
              options={nationalityValues}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={`expirationDate-${index}`}
            key={`expirationDate-${index}`}
            label='Expiration Date'
            rules={[{ required: true, message: 'Please select your passport expiration date!' }]}
          >
            <DatePicker placeholder='Select expiration date' style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default TravelerDetailsForm;
