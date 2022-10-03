// import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Input from '../../components/Input';
import CustomButton from '../../components/Button';

export const Form = styled.View`
  align-self: stretch;
  margin-top: 30px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(CustomButton)`
  margin-top: 5px;
`;


export const SignLinkText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  margin-top: 20px;
`;