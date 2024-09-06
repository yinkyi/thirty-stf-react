import React, { useRef, useState } from 'react';
import {
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import SearchResult from './SearchResult';
import { tripTypeValues } from '../assets/mock';
import { disabledEndDate, disabledStartDate } from '../utils/helper';
import { useDispatch } from 'react-redux';
import { Airport } from '../libs/apiResponseInterface';
import styles from './Booking.module.scss';
import SubmitButton from './UI/SubmitButton';
import { useQuery } from 'react-query';
import { getAirPort } from '../libs/fetcher';
import { bookingActions } from '../store/booking';
import Loading from './UI/Loading';

interface FormValues {
  flightFrom: string;
  flightTo: string;
  departureDate: Dayjs | null; // Ensure Dayjs or null
  returnDate?: Dayjs | null; // Optional and type Dayjs or null
  passenger: number;
}

const Search: React.FC = () => {
  const passengerRef = useRef(null);
  const [flightTypeValue, setFlightTypeValue] = useState('domestic');
  const [tripType, setTripType] = useState(tripTypeValues[0].value);
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<Date>();
  const dispatch = useDispatch();
  const { isLoading, isError, error, data } = useQuery(['airports', flightTypeValue], async () => {
    return await getAirPort(flightTypeValue);
  });
  const initialValues = {
    departureDate: dayjs(),
    returnDate: dayjs().add(1, 'day'),
    passenger: 1,
    flightType: 'domestic',
    tripType: tripTypeValues[0].value,
  };

  const tripTypehandleChange = (value: string) => {
    setTripType(value);
  };

  const onFlightTypeChange = (e: RadioChangeEvent) => {
    setFlightTypeValue(e.target.value);
  };

  const onFinish = (values: FormValues) => {
    dispatch(
      bookingActions.setFlightFliter({
        noOfPassenger: values?.passenger,
      }),
    );
    setFormValues(new Date());
  };

  return (
    <>
      {isLoading && <Loading />}
      <Divider orientation='left'>Search</Divider>

      <Form layout='inline' form={form} initialValues={initialValues} onFinish={onFinish}>
        <Card className={styles.boxStyle}>
          <Row gutter={[8, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
            >
              <Form.Item name='flightType' rules={[{ required: true, message: 'Please input!' }]}>
                <Radio.Group
                  onChange={onFlightTypeChange}
                  value={form.getFieldsValue()?.flightType}
                  style={{ padding: '4px' }}
                >
                  <Radio value={'domestic'}>Domestic</Radio>
                  <Radio value={'international'}>International</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                label='No. of Passanger'
                name='passenger'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <InputNumber ref={passengerRef} min={1} max={10} defaultValue={1} />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                label='Flight From'
                name='tripType'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <Select
                  defaultValue={tripType}
                  style={{ width: '50%' }}
                  onChange={tripTypehandleChange}
                  options={tripTypeValues}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation='left'></Divider>

          <Row gutter={[8, 8]}>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                label='Flight From'
                name='flightFrom'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <Select
                  style={{ width: '300px' }}
                  showSearch
                  placeholder='Flight From'
                  optionFilterProp='label'
                  options={data?.map((item: Airport) => {
                    return {
                      value: item.id,
                      label: item.name,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 8 }}
              xl={{ span: 8 }}
            >
              <Form.Item
                label='Flight To'
                name='flightTo'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <Select
                  style={{ width: '300px' }}
                  showSearch
                  placeholder='Flight To'
                  optionFilterProp='label'
                  options={data?.map((item: Airport) => {
                    return {
                      value: item.id,
                      label: item.name,
                    };
                  })}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              <Form.Item
                label='Departure Date'
                name='departureDate'
                rules={[{ required: true, message: 'Please input!' }]}
              >
                <DatePicker
                  format={'DD/MMM/YYYY'}
                  disabledDate={(current) =>
                    disabledStartDate(current, form.getFieldsValue()?.returnDate)
                  }
                  showNow={false}
                />
              </Form.Item>
            </Col>
            <Col
              xs={{ span: 24 }}
              sm={{ span: 24 }}
              md={{ span: 12 }}
              lg={{ span: 4 }}
              xl={{ span: 4 }}
            >
              {tripTypeValues[+tripType].value === tripTypeValues[1].value && (
                <Form.Item
                  label='Return Date'
                  name='returnDate'
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <DatePicker
                    format={'DD/MMM/YYYY'}
                    disabledDate={(current) =>
                      disabledEndDate(current, form.getFieldsValue()?.departureDate)
                    }
                    showNow={false}
                  />
                </Form.Item>
              )}
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Form.Item>
                <SubmitButton form={form}>Search</SubmitButton>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
      {formValues && (
        <SearchResult
          refreshSearch={formValues}
          flightType={form.getFieldsValue()?.flightType}
          depatureAirportId={form.getFieldsValue()?.flightFrom}
          arrivalAirportId={form.getFieldsValue()?.flightTo}
          depatureDate={form.getFieldsValue()?.departureDate}
          returnDate={form.getFieldsValue()?.returnDate}
        />
      )}
    </>
  );
};

export default Search;
