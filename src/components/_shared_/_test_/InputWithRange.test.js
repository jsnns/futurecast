import React from "react";
import { shallow } from 'enzyme';
import InputWithRange from "../InputWithRange";
import { RangeInput, TextInput } from "grommet";

global.window= {
  addEventListener: jest.fn()
};

test('RangeInput gets updated value', () => {
  const mock = jest.fn();
  const component = shallow(
    <InputWithRange onChange={mock} />
  );

  let rangeInput = component.find(RangeInput);
  rangeInput.invoke('onChange')({target: {value: 100}});

  rangeInput = component.find(RangeInput);
  expect(rangeInput.props().value).toBe(100);
});

test('TextInput gets updated value', () => {
  const mock = jest.fn();
  const component = shallow(
    <InputWithRange onChange={mock} />
  );

  let textInput = component.find(TextInput);
  textInput.invoke('onChange')({target: {value: 150}});

  textInput = component.find(TextInput);
  expect(textInput.props().value).toBe(150);
});

test('TextInput and RangeInput get updated value from each other', () => {
  const mock = jest.fn();
  const component = shallow(
    <InputWithRange onChange={mock} />
  );

  // Test Range -> Text
  let rangeInput = component.find(RangeInput);
  rangeInput.invoke('onChange')({target: {value: 150}});

  let textInput = component.find(TextInput);
  expect(textInput.props().value).toBe(150);


  // Test Text -> Range
  textInput = component.find(TextInput);
  textInput.invoke('onChange')({target: {value: 200}});

  rangeInput = component.find(RangeInput);
  expect(rangeInput.props().value).toBe(200);
});

test('onChange gets updated value', () => {
  const mock = jest.fn();
  const component = shallow(
    <InputWithRange onChange={mock} />
  );

  let textInput = component.find(TextInput);
  textInput.invoke('onChange')({target: {value: 150}});

  expect(mock.mock.calls).toEqual([[150]])

});