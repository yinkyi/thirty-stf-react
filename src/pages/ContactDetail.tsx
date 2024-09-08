import ContactDetailsForm from '../components/ContactDetailForm';
import RouteDetailsCard from '../components/RouteDetailCard';
import { Card, Col, Form, Row } from 'antd';
import TravellerDetails from '../components/TravellerDetail';
import BookingRequest, { IinitialState } from '../utils/interface';
import { useDispatch, useSelector } from 'react-redux';
import SubmitButton from '../components/UI/SubmitButton';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { getProfile, saveBooking } from '../libs/fetcher';
import dayjs from 'dayjs';
import { User } from '../libs/apiResponseInterface';
import Loading from '../components/UI/Loading';
import { bookingActions } from '../store/booking';
const ContactDetail: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const booking = useSelector((state: IinitialState) => state.booking);
  const [form] = Form.useForm();

  useQuery<User>(
    ['profile'],
    async () => {
      return await getProfile();
    },
    {
      onSuccess: async (e) => {
        form.setFieldsValue({
          title: e?.title,
          firstName: e?.firstName,
          lastName: e?.lastName,
          email: e?.email,
          phone: e?.phone?.replace('+66', ''),
        });
      },
    },
  );

  const { mutate: createBooking, isLoading } = useMutation(
    (bookingReq: BookingRequest) => {
      return saveBooking(bookingReq);
    },
    {
      onSuccess: async (booking) => {
        if (booking && booking.referenceNumber) {
          dispatch(bookingActions.reset());
          navigate(`/checkout/${booking.referenceNumber}`);
        }
      },
      onError: (error: unknown) => {
        console.log(error);
      },
    },
  );

  const onFinish = (values: any) => {
    /**contact detail prepare */
    const contactDetail = {
      title: values['title'],
      firstName: values['firstName'],
      lastName: values['lastName'],
      phone: `+66${values['phone']}`,
      email: values['email'],
    };
    /**prepare request */
    const passengers = Array.from({ length: booking?.noOfPassenger || 0 }, (_, index) => ({
      title: values[`title-${index}`],
      firstName: values[`firstName-${index}`],
      lastName: values[`lastName-${index}`],
      dateOfBirth: dayjs(values[`dateOfBirth-${index}`]).toISOString(),
      nationality: values[`nationality-${index}`],
      passportNumber: values[`passport-${index}`],
      passportExpireDate: dayjs(values[`expirationDate-${index}`]).toISOString(),
    }));
    /**prepare flight */
    const flights = [
      {
        date: dayjs(booking?.depatureFlight?.depatureDate).toISOString() || '',
        flightScheduleId: booking?.depatureFlight?.id || '',
        unitPrice: parseFloat(booking?.depatureFlight?.unitPrice || '0'),
      },
    ];
    if (booking?.returnFlight) {
      flights.push({
        date: dayjs(booking?.returnFlight?.depatureDate).toISOString() || '',
        flightScheduleId: booking?.returnFlight?.id || '',
        unitPrice: parseFloat(booking?.depatureFlight?.unitPrice || '0'),
      });
    }

    const bookingReq: BookingRequest = {
      paymentType: 'credit/debit',
      contactDetail: contactDetail,
      passengers: passengers,
      flights: flights,
    };
    createBooking(bookingReq);
  };
  return (
    <>
      {isLoading && <Loading />}
      <Form form={form} onFinish={onFinish} layout='vertical'>
        <Row gutter={[8, 8]}>
          <Col span={16}>
            <Card style={{ width: '100%' }}>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Card type='inner' title={`Contact Detail`}>
                    <ContactDetailsForm />
                  </Card>
                </Col>

                <Col span={24}>
                  <Card type='inner' title={`Traveller Detail`}>
                    <TravellerDetails numberOfPassenger={booking?.noOfPassenger || 0} />
                  </Card>
                </Col>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <SubmitButton form={form}>Reserve Seat</SubmitButton>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8}>
            <RouteDetailsCard />
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default ContactDetail;
