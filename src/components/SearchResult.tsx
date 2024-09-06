import React, { useState } from 'react';
import { Button, Col, Divider, RadioChangeEvent, Row, theme } from 'antd';
import FlightCard from './FlightCard';
import { tripTypeValues } from '../assets/mock';
import { useNavigate } from 'react-router-dom';
import { bookingActions } from '../store/booking';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { getFlightSchedule } from '../libs/fetcher';
import dayjs from 'dayjs';
import { FlightSchedule } from '../libs/apiResponseInterface';
import Loading from './UI/Loading';

export interface FlightScheduleFilters {
  refreshSearch?: Date;
  flightType: string;
  depatureAirportId: string;
  arrivalAirportId: string;
  depatureDate: string;
  returnDate?: string;
}

const SearchResult: React.FC<FlightScheduleFilters> = ({
  refreshSearch,
  flightType,
  depatureAirportId,
  arrivalAirportId,
  depatureDate,
  returnDate,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedForwardFlight, setSelectedForwardFlight] = useState<string | null>(null);
  const [selectedBackwardFlight, setSelectedBackwardFlight] = useState<string | null>(null);
  const tripTypeName = returnDate ? tripTypeValues[1].label : tripTypeValues[0].label;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { isLoading, isError, error, data } = useQuery(
    ['flightSchedules', refreshSearch],
    async () => {
      return await getFlightSchedule({
        flightType,
        depatureAirportId,
        arrivalAirportId,
        depatureDate: dayjs(depatureDate).format('YYYY-MM-DD'),
        returnDate: returnDate ? dayjs(returnDate).format('YYYY-MM-DD') : undefined,
      });
    },
  );
  const handleDepatureRadioChange = (e: RadioChangeEvent) => {
    setSelectedForwardFlight(e.target.value);
    const flightData: FlightSchedule = data?.depature.find(
      (f: FlightSchedule) => f.id == e.target.value,
    );
    dispatch(
      bookingActions.setDepatureFlightChoose({
        depatureFlight: flightData,
      }),
    );
  };

  const handleReturnRadioChange = (e: RadioChangeEvent) => {
    setSelectedBackwardFlight(e.target.value);
    const flightData: FlightSchedule = data?.return.find(
      (f: FlightSchedule) => f.id == e.target.value,
    );
    dispatch(
      bookingActions.setReturnFlightChoose({
        returnFlight: flightData,
      }),
    );
  };

  const handleChoose = () => {
    navigate('/contact-detail');
  };

  return (
    <>
      {isLoading && <Loading />}
      <div
        style={{
          background: colorBgContainer,
          minHeight: 280,
          padding: 24,
          borderRadius: borderRadiusLG,
          marginTop: 5,
        }}
      >
        <Row>
          <Col span={24} style={{ textAlign: 'right' }}>
            <Button
              type='primary'
              htmlType='button'
              style={{ fontSize: '24px', padding: '24px' }}
              onClick={handleChoose}
              disabled={selectedForwardFlight || selectedBackwardFlight ? false : true}
            >
              Choose
            </Button>
          </Col>
        </Row>

        <Divider orientation='left'>Choose {tripTypeName}</Divider>
        <Row gutter={[16, 16]}>
          <Col span={returnDate ? 12 : 24}>
            <Row gutter={[16, 16]}>
              {data?.depature.map((flight: FlightSchedule, index: number) => (
                <Col span={24} key={index}>
                  <FlightCard
                    flight={flight}
                    value={selectedForwardFlight}
                    onChange={handleDepatureRadioChange}
                  />
                </Col>
              ))}
            </Row>
          </Col>
          {returnDate && (
            <Col span={12}>
              <Row gutter={[16, 16]}>
                {data?.return.map((flight: FlightSchedule, index: number) => (
                  <Col span={24} key={index}>
                    <FlightCard
                      flight={flight}
                      value={selectedBackwardFlight}
                      onChange={handleReturnRadioChange}
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          )}
        </Row>
      </div>
    </>
  );
};

export default SearchResult;
