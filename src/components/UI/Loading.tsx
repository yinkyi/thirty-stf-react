import { Spin } from 'antd';

const Loading = () => (
  <div className='full-screen-spin'>
    <Spin size='large' tip='Loading...' />
  </div>
);

export default Loading;
