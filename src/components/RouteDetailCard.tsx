import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import { GlobalOutlined, MoreOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { IinitialState } from '../utils/interface';
import dayjs from 'dayjs';
import { numberFormat } from '../utils/helper';
const { Title, Text } = Typography;

const RouteDetailsCard: React.FC = () => {
  const booking = useSelector((state: IinitialState) => state.booking);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    if (booking) {
      const depatureTicketCost = parseFloat(booking.depatureFlight?.unitPrice || '0');
      const returnTicketCost = parseFloat(booking.returnFlight?.unitPrice || '0');
      const numberOfPassengers = booking.noOfPassenger || 0;

      const totalCost = (depatureTicketCost + returnTicketCost) * numberOfPassengers;
      setTotalCost(totalCost);
    }
  }, []);

  return (
    <Card style={{ width: '100%' }}>
      <Title style={{ marginTop: '1px' }} level={4}>
        Route Details
      </Title>

      {/* Outbound Flight */}
      <Card
        type='inner'
        title={`Departure Flight - ${dayjs(booking?.depatureFlight?.depatureDate).format(
          'DD-MMM-YYYY',
        )} - (${booking?.depatureFlight?.flight.flightNumber})`}
      >
        <Row>
          <Col span={6}>
            <GlobalOutlined />
          </Col>
          <Col span={18}>
            <Text strong>{booking?.depatureFlight?.departureAirport.name}</Text>
            <br />
            <Text>{booking?.depatureFlight?.departureAirport.city}</Text>
            <br />
            <Text>{dayjs(booking?.depatureFlight?.depatureTime).format('HH:mm')}</Text>
          </Col>
        </Row>
        <Row style={{ margin: '20px 0' }}>
          <Col span={12} style={{ textAlign: 'center' }}>
            <MoreOutlined style={{ fontSize: 24 }} />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <GlobalOutlined />
          </Col>
          <Col span={18}>
            <Text strong>{booking?.depatureFlight?.arrivalAirport.name}</Text>
            <br />
            <Text>{booking?.depatureFlight?.arrivalAirport.city}</Text>
            <br />
            <Text>{dayjs(booking?.returnFlight?.arrivalTime).format('HH:mm')}</Text>
          </Col>
        </Row>
      </Card>

      {/* Return Flight */}
      {booking?.returnFlight && (
        <Card
          type='inner'
          title={`Return Flight - ${dayjs(booking?.returnFlight?.depatureDate).format(
            'DD-MMM-YYYY',
          )} - ${booking?.returnFlight?.flight.flightNumber}`}
          style={{ marginTop: 20 }}
        >
          <Row>
            <Col span={6}>
              <GlobalOutlined />
            </Col>
            <Col span={18}>
              <Text strong>{booking?.returnFlight.departureAirport.name}</Text>
              <br />
              <Text>{booking?.returnFlight?.departureAirport.city}</Text>
              <br />
              <Text>{dayjs(booking?.returnFlight?.depatureTime).format('HH:mm')}</Text>
            </Col>
          </Row>
          <Row style={{ margin: '20px 0' }}>
            <Col span={12} style={{ textAlign: 'center' }}>
              <MoreOutlined style={{ fontSize: 24 }} />
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <GlobalOutlined />
            </Col>
            <Col span={18}>
              <Text strong>{booking?.returnFlight.arrivalAirport.name}</Text>
              <br />
              <Text>{booking?.returnFlight?.arrivalAirport.city}</Text>
              <br />
              <Text>{dayjs(booking?.returnFlight?.arrivalTime).format('HH:mm')}</Text>
            </Col>
          </Row>
        </Card>
      )}

      {/* Total */}
      <Row>
        <Col span={12}>
          <Title level={5}>Total</Title>
        </Col>
        <Col span={12}>
          <Title level={4} style={{ color: 'orange' }}>
            {numberFormat(totalCost)}
          </Title>
        </Col>
      </Row>
    </Card>
  );
};

export default RouteDetailsCard;
