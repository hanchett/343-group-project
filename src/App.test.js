import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SignUpForm, { BirthdayInput, EmailInput, RequiredInput, PasswordConfirmationInput } from './TeamSignUp.js';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ReactTestUtils from 'react-addons-test-utils';


describe('Dom Test', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
//test the submit button
describe('Checks on Submit button', () => {
  it('should render the submit button', () => {
    const wrapper = mount(<SignUpForm />);
    expect(wrapper.find("#submitButton").props().disabled).toEqual(true);
  });

  it('should make the submit button active', () => {
    const wrapper = mount(<SignUpForm />);
    wrapper.find('#email').simulate('change', { target: { value: 'a@gmail.com' } })
    wrapper.find('#dob').simulate('change', { target: { value: '11/14/95' } })
    wrapper.find('#name').simulate('change', { target: { value: 'Ethan' } })
    wrapper.find('#password').simulate('change', { target: { value: '12345678' } })
    wrapper.find('PasswordConfirmationInput').simulate('change', {target: {value:'12345678' }})  
    wrapper.setState({passwordConf: {value: '12345678', valid: true}})
    expect(wrapper.find("#submitButton").props().disabled).toEqual(false);
  });

  it('should make the submit button inactive', () => {
    const wrapper = mount(<SignUpForm />);
    wrapper.find('#email').simulate('change', { target: { value: 'a@gmail.com' } })
    expect(wrapper.find("#submitButton").props().disabled).toEqual(true);
  });
});


describe('<RequiredInput> component', () => {
  it("should show an error when field blank", () => {
    const wrapper = shallow(<RequiredInput value={''} errorMessage="we need to know your name"/>);
    expect(wrapper.find('p').text()).toEqual("we need to know your name");
  });

  it("should show no error", () => {
    const wrapper = shallow(<RequiredInput value={'Rachel'} />);
    console.log(wrapper.find('p').length);
    expect(wrapper.find('p').length).toEqual(0);
  });
});
 
//to test if the error message doesn't display when two passwords are the same
describe('<PasswordConfirmationInput> component', () => {
  it('no mismatch message when password matches comfirm password', () => {
      const wrapper = shallow(<PasswordConfirmationInput />);
      const input = wrapper.find('input');
      const noMismatch = wrapper.find('#noMismatch');
      wrapper.find('currentValue').simulate('change', {target:{value:'123456'}});
      wrapper.find('wrapper.props.password').simulate('change', {target:{value:'123456'}});
      expect(noMismatch).toEqual(true);
  });
});

describe('<EmailInput> component', () => {
  it('should say need email', () => {
    const wrapper = shallow(<EmailInput value={''} />);
    expect(wrapper.find('p').text()).toEqual("we need to know your email address");
  });

  it('should say invalid email', () => {
    const wrapper = shallow(<EmailInput value={'myemail'} />);
    expect(wrapper.find('p').text()).toEqual("this is not a valid email address");
  });

  it('should not show an error message', () => {
    const wrapper = shallow(<EmailInput value={'myemail@msn.com'} />);
    expect(wrapper.find('p').length).toEqual(0);
  });
});

describe('<BirthdayInput> component', () => {
  it('should say need birthday', () => {
    const wrapper = shallow(<BirthdayInput value={''} />);
    expect(wrapper.find('p').text()).toEqual("we need to know your birthdate");
  });

  it('should say invalid date', () => {
    const wrapper = shallow(<BirthdayInput value={'what??'} />);
    expect(wrapper.find('p').text()).toEqual("that isn\'t a valid date");
  });

  it('should say not old enough', () => {
    const wrapper = shallow(<BirthdayInput value={'05/23/2005'} />);
    expect(wrapper.find('p').text()).toEqual("sorry, you must be at least 13 to sign up");
  });

  it('should not show an error message', () => {
    const wrapper = shallow(<BirthdayInput value={'05/23/1990'} />);
    expect(wrapper.find('p').length).toEqual(0);
  });
});

