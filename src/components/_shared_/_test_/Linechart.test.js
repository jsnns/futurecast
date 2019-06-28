import React from "react";
import { shallow } from 'enzyme';
import Linechart from "../Linechart";
import { Line } from "react-chartjs-2";


global.window= {
  addEventListener: jest.fn()
};

test('Linechart is rendered', () => {
  let component = shallow(
    <Linechart data={{}} />
  );

  expect(component.exists(Line)).toEqual(true);
});

test('Data is passed unmodified to Linechart', () => {
  let data = {
    sample: true,
    labels: [],
  };
  let component = shallow(
    <Linechart data={data} />
  );

  expect(component.find(Line).first().props().data).toBe(data);
  expect(component.find(Line).first().props().data).toEqual(data);
});