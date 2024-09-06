import React from 'react';
import { Result, Button } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/'); // Redirect to home or another page
  };

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <Result
        icon={<SmileOutlined />}
        status='success'
        title='Payment Successful'
        subTitle='Your payment has been processed successfully. You will receive a confirmation email shortly.'
        extra={[
          <Button type='primary' onClick={handleContinue} key='continue'>
            Go to home
          </Button>,
        ]}
      />
    </div>
  );
};

export default PaymentSuccess;
