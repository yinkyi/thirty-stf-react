import React from 'react';
import TravelerDetailsForm from './TravellerDetailForm';
import { Collapse, CollapseProps } from 'antd';
interface Passenger {
  numberOfPassenger: number;
}

const TravellerDetails: React.FC<Passenger> = ({ numberOfPassenger }) => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const travelers: CollapseProps['items'] = Array.from(
    { length: numberOfPassenger },
    (_, index) => ({
      key: `${index + 1}`,
      label: `Adult ${index + 1}`,
      children: <TravelerDetailsForm key={index} index={index} />,
    }),
  );
  const defaultActiveKey: string[] = travelers
    .map((traveler) => traveler.key!)
    .filter((key): key is string => key !== undefined);

  return <Collapse items={travelers} defaultActiveKey={defaultActiveKey} onChange={onChange} />;
};

export default TravellerDetails;
