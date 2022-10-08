import React, { useState } from 'react'
import { LayoutContainer } from '../../shared'
import { useNavigate } from 'react-router-dom'
import GoVerified from '@meronex/icons/go/GoVerified'
import { Button, Input } from '../../../styles'
import AiFillEye from '@meronex/icons/ai/AiFillEye'
import { useForm } from 'react-hook-form'
import { useSession } from '../../../contexts/SessionContext'
import { useApi } from '../../../contexts/ApiContext'
import { toast } from 'react-toastify'
import axios from 'axios'

import {
  Container,
  LeftWrapper,
  RightWrapper,
  Details,
  DetailContent,
  Head,
  Heading,
  HeadDes,
  FormWraper,
  FormRow,
  FormLabel,
  InputWrapper,
  ErrorMessage
} from './styles'

export const SignUp = () => {
  const nagative = useNavigate()
  const [{ auth }, { login } ] = useSession()
  const [{ doPost }] = useApi()
  const { register, handleSubmit, formState: { errors }} = useForm()
  const [isLoading, setIsLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [showotpbox, setShowotpbox] = React.useState("");
    const [tokenemail, SetTokenemail] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const onSubmit = async (values) => {
    console.log(values, 'value');
    try {
      setIsLoading(true)
      const response = await doPost('/auth/signup', values)
      if (response.msg != null) {
        toast(response.msg, { type: 'error' })
        setShowotpbox(response.msg)
        setIsLoading(false)
      }
      if (response.user != null) {
        setIsLoading(false)
        // toast('Success', { type: 'success' })
        SetTokenemail(values.email)
      
      }
    } catch (error) {
      toast(error, { type: 'error' })
      setIsLoading(false)
    }
  }


  const resendOTP = async () => {
    console.log(tokenemail, 'value');
    try {
      setIsLoading(true)
      const response = await doPost('/auth/resendOTP', {email:tokenemail})
      if (response.msg != null) {
        toast(response.msg, { type: 'error' })
        setShowotpbox(response.msg)
        setIsLoading(false)
      }
      if (response.user != null) {
        setIsLoading(false)
        // toast('Success', { type: 'success' })
      }
    } catch (error) {
      toast(error, { type: 'error' })
      setIsLoading(false)
    }
  }

// check user is register or not and if not than send otp to the email

//   const signUp = () => {

//     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
//     //validation conditions htmlFor registration new user
//     if ( email ) {
//       if (regex.test(email)) {
//           const checkemail = {
//             email,value
//           };
//           axios
//             .post(`${API_SERVICE}/api/v1/main/sendemail`, checkemail)
//             .then((res) => {

//               setShowotpbox(res.data.message);
//               console.log("showotpbox",showotpbox);
//               setMessage(res.data.message);
//               handleClick();
//               SetTokenemail(email)

//               // for clear data from input 
     
//               // setEmail("")

//             });       
//       } else {
//         setMessage("Email is not valid !");
//         handleClick();
//       }
//     } else {
//       setMessage(" Enter the Email  ");
//       handleClick();
//     }
// };


  // for otp input
  const [token, setToken] = useState("");

  // for otp validate
  const validateOtp = async (e) => {
    e.preventDefault();
    try {
    const usertoken = {
      token,
      tokenemail,
    };
          const response = await doPost('/auth/otpvalidate', usertoken)

        console.log(response);
        // setMessage(res.data.message);
        if (response.message == "validate Successfull") {
          console.log("response.user0")
          setIsLoading(false)
          toast('Success', { type: 'success' })
          console.log("response.user1",
          )
          await login(response.logg.email)
            console.log("response.user2")
        nagative('/u/dashboard')
        }else{
          toast("OTP dose not match", { type: 'error' })
          setIsLoading(false)
        }

      } catch (error) {
        toast(error, { type: 'error' })
        setIsLoading(false)
      } 
  };

  return (
    <LayoutContainer>
      <Container>
        <LeftWrapper onClick={() => nagative('/landing/aitch/')}>
          <img src="https://limewire.com/hc_content_aitch_cover.92bbc219.jpg" alt='' />
          <Details>
            <div>
              <div>Close To Home</div>
              <DetailContent>
                <img src='https://d2tg7hjmtin7hh.cloudfront.net/thumbs/creator_page_avatar/2843/28433c6b-8efa-453f-bd4f-73b4314862fc_small.png' alt='' />
                <span>Aitch</span>
                <GoVerified />
              </DetailContent>
            </div>
            <div>
              Cooming Soon
            </div>
          </Details>
        </LeftWrapper>

        <RightWrapper>
          <Head>
            <Heading>Sign Up</Heading>
            <HeadDes>Join BlockReward to buy, sell and browse NFTs</HeadDes>
          </Head>

          {showotpbox != "PLEASE CHECK YOUR EMAIL FOR OTP PASSWORED" ? (

          <FormWraper onSubmit={handleSubmit(onSubmit)}>
            <FormRow error={errors?.email}>
              <FormLabel>EMAIL</FormLabel>
              <Input
                placeholder='Enter email address'
                autoComplete='off'
                {...register(
                  'email',
                  {
                    required: {
                      value: true,
                      message: 'The field is required*'
                    },
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  }
                )}
              />
              {errors?.email && <ErrorMessage>{errors?.email?.message}</ErrorMessage>}
            </FormRow>
            <FormRow error={errors?.password}>
              <FormLabel>
                <span>Password</span>
              </FormLabel>
              <InputWrapper>
                <Input
                  type={isShowPassword ? 'text' : 'password'}
                  autoComplete='off'
                  {...register(
                    'password',
                    {
                      required: {
                        value: true,
                        message: 'The field is required*'
                      },
                      maxLength: {
                        value: 30,
                        message: `The characters must be less than 30`
                      },
                      minLength: {
                        value: 8,
                        message: `The characters must be more than 8`
                      }
                    }
                  )}
                />
                <AiFillEye onClick={()=>{setIsShowPassword(!isShowPassword)}}/>
              </InputWrapper>
              {errors?.password && <ErrorMessage>{errors?.password?.message}</ErrorMessage>}
            </FormRow>
            <FormRow>
              By signing up, you agree to the <a href="./terms" target="_blank" rel="noreferrer">Terms and Conditions</a> and <a href="./privacy" target="_blank" rel="noreferrer">Privacy Policy</a> and to receive updates from BlockReward.
            </FormRow>
            <FormRow>
              <Button
                color="primary"
                type='submit'
                isLoading={isLoading}
              >
                Sign Up
              </Button>
            </FormRow>


            
          </FormWraper>

) : (
  ""
)}
     
          {showotpbox == "PLEASE CHECK YOUR EMAIL FOR OTP PASSWORED" ? (
   <FormWraper>

              <div class="container height-100 d-flex justify-content-center align-items-center">
                <div class="position-relative">
                  <div class="card p-2 text-center">
                    <h6>
                    </h6>{" "}
                    <FormRow>
                      <span>A code has been sent to your Email</span> 
               
                      </FormRow>
                    <div
                      id="otp"
                      class="inputs d-flex flex-row justify-content-center mt-2"
                    >
                      <Input
                        value={token}
                        onChange={(event) => setToken(event.target.value)}
                        //  onChange={}
                        name="token"
                        class="m-2 text-center form-control rounded"
                        type="text"
                        id="first"
                        maxlength="4"
                        placeholder='Enter verification code'
                      />
                    </div>
                    <div class="mt-4">
                    <FormRow>
              <Button
                color="primary"
                type='submit'
                isLoading={isLoading}
              onClick= {validateOtp}
              >
               verify your email
              </Button>
            </FormRow>
                    </div>
                  </div>
                  <div class="card-2">
                    <div class="content d-flex justify-content-center align-items-center">
                  
                      {/* <span>Didn't get the code</span>  */}
                      <a href="#" onClick={resendOTP} class="text-decoration-none ms-3">  Resend verification code </a>
                    </div>{" "}
                  </div>{" "}
                </div>
              </div>

              </FormWraper>     
            ) : (
              ""
            )}

        </RightWrapper>
      </Container>
    </LayoutContainer>
  )
}