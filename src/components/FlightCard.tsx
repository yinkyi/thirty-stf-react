import React from 'react';
import { Card, Row, Col, Typography, Radio, RadioChangeEvent } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { FlightSchedule } from '../libs/apiResponseInterface';
import dayjs from 'dayjs';
import { numberFormat } from '../utils/helper';
const { Text, Title } = Typography;

interface FlightCardProps {
  flight: FlightSchedule;
  value: string | null;
  onChange: (e: RadioChangeEvent) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, value, onChange }) => (
  <Card bordered={false} style={{ marginBottom: 16 }}>
    <Radio.Group value={value} onChange={onChange} style={{ width: '100%' }}>
      <Row gutter={[16, 16]} align='middle'>
        <Col span={1}>
          <Radio value={flight.id} />
        </Col>
        <Col span={8}>
          <Text>{flight.departureAirport.name}</Text>
          <br />
          <Text>{dayjs(flight.depatureDate).format('DD-MMM-YYYY')}</Text>
          <br />
          <Text strong>{dayjs(flight.depatureTime).format('HH:mm')}</Text>
        </Col>
        <Col span={4}>
          <Title level={3} style={{ margin: 0 }}>
            {flight.departureAirport.city}
          </Title>
        </Col>
        <Col span={4} style={{ textAlign: 'center' }}>
          <Text>{flight.duration}</Text>
          <br />
          <ArrowRightOutlined style={{ fontSize: 24 }} />

          <br />
          <Text type='secondary'>Direct</Text>
        </Col>
        <Col span={4}>
          <Title level={3} style={{ margin: 0 }}>
            {flight.arrivalAirport.city}
          </Title>
        </Col>
        <Col span={8}>
          <Row justify='space-between' align='middle'>
            <Col>
              <Text>20kg</Text>
            </Col>
            <Col>
              <Title level={4} style={{ margin: 0, color: 'green' }}>
                {numberFormat(+flight.unitPrice)}
              </Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </Radio.Group>
  </Card>
);

export default FlightCard;
