import React from "react";
import { shallow } from 'enzyme';
import Currency from "../Currency";
import { Text } from "grommet";

test('has currency formatted children', () => {
  let component = shallow(
    <Currency value={100.0} />
  );

  expect(component.find(Text).props().children).toBe('$100.00');
});

test('has green color for positive value', () => {
  let component = shallow(
    <Currency value={100.0} />
  );

  expect(component.find(Text).props().color).toBe('status-ok');
});

test('has red color for negative value', () => {
  let component = shallow(
    <Currency value={-100.0} />
  );

  expect(component.find(Text).props().color).toBe('status-critical');
});

test('has green color for zero value', () => {
  let component = shallow(
    <Currency value={0} />
  );

  expect(component.find(Text).props().color).toBe('status-ok');
});