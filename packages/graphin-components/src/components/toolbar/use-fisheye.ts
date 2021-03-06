import { useState } from 'react';
import { Fisheye } from '@antv/g6';

const delegateStyle = {
  fill: '#f00',
  lineDash: [5, 5],
  stroke: '#666',
};

let fisheye = new Fisheye({
  r: 200,
  showLabel: true,
  delegateStyle,
});

const useFishEye: (graph) => [boolean, () => void] = (graph) => {
  const [fishEyeState, setFishEyeState] = useState(false);
  const toggleFishEye = () => {
    if (fishEyeState === true) {
      setFishEyeState(false);
      graph.removePlugin(fisheye);
    } else {
      setFishEyeState(true);
      fisheye = new Fisheye({
        r: 200,
        showLabel: true,
        delegateStyle,
      });
      graph.addPlugin(fisheye);
    }
  };
  return [fishEyeState, toggleFishEye];
};

export default useFishEye;
