// import React, { useState } from 'react';
// import { UseFormRegister } from 'react-hook-form';
// import styled from 'styled-components';
// import { UserLoginData } from '../../types/UserLoginData';

// const EyeOpenIconURL = "https://img.icons8.com/ios-filled/50/FFFFFF/visible--v1.png";
// const EyeClosedIconURL = "https://img.icons8.com/ios-filled/50/FFFFFF/hide--v1.png";

// const InputWrapper = styled.div`

 
//   flex-direction: column;
//   position:relative;

// `;

// const Label = styled.label`
//   font-size: ${({ theme }) => theme.typography.sizes.body};
//   color: ${({ theme }) => theme.colors.text.white};
//   background : ${({ theme }) => theme.colors.primary.dark};
//   margin-bottom: 8px;
//   position: absolute;
//   top: -23%;
//   left: 8%;
// `;

// const StyledInput = styled.input`
//   padding: 12px;
//   background-color: ${({ theme }) => theme.colors.primary.dark};
//   color: ${({ theme }) => theme.colors.text.white};
//   border: none;
//   border-radius: 8px;
//   border: 1px solid ${({ theme }) => theme.colors.text.white};;
//   font-size: ${({ theme }) => theme.typography.sizes.body};
// width: 100%;
//   &:focus {
//     background-color: ${({ theme }) => theme.colors.primary.dark};
//     color: ${({ theme }) => theme.colors.text.white};
    
//   }
// `;

// const ToggleButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   position: absolute;
//   top: 20%;
//   right: 5%;
// `;

// const Icon = styled.img`
//   width: 24px;
//   height: 24px;
// `;

// interface InputProps {
//   label: string;
//   type?: string;
//   register: UseFormRegister<UserLoginData>;
//   name: keyof UserLoginData;
// }

// export const InputField: React.FC<InputProps> = ({ label, type = 'text', register, name }) => {
//   const [inputType, setInputType] = useState(type);

//   const togglePasswordVisibility = () => {
//     setInputType(inputType === 'password' ? 'text' : 'password');
//   };

//   return (
//     <InputWrapper>
//       <Label>{label}</Label>
//       <StyledInput
//         type={inputType}
//         {...register(name)}
//      />
//       {type === 'password' && (
//         <ToggleButton onClick={togglePasswordVisibility} type="button" aria-label={inputType === 'password' ? 'Show Password' : 'Hide Password'}>
//           <Icon src={inputType === 'password' ? EyeOpenIconURL : EyeClosedIconURL} alt={inputType === 'password' ? 'Show Password' : 'Hide Password'} />
//         </ToggleButton> 
//       )}
//     </InputWrapper>
//   );
// };

// export const Form= styled.form`
// padding: 0;
// width: 130%;

// display:flex;
// flex-direction: column;
// gap: 1.5rem;


// `

