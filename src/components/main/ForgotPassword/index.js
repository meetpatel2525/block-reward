import React from 'react'
import { Button, Input } from '../../../styles'
import { LayoutContainer } from '../../shared'
import { useForm } from 'react-hook-form'

import {
  Container,
  InnerContainer,
  Head,
  Heading,
  HeadDes,
  FormWraper,
  FormRow,
  FormLabel
} from './styles'

export const ForgotPassword = () => {
  // const { handleSubmit, formState: { errors }} = useForm()
  // const onSubmit = async (values) => {
  //   try {
  //     setIsLoading(true)
  //     const response = await doPost('/auth/forgetPassword', values)
  //     if (response.msg != null) {
  //       toast(response.msg, { type: 'error' })
  //       setIsLoading(false)
  //     }
  //     if (response.user != null) {
  //       setIsLoading(false)
  //       toast('Success', { type: 'success' })
  //       await login(response.user)
  //       nagative('/u/dashboard')
  //     }
  //   } catch (error) {
  //     toast(error, { type: 'error' })
  //     setIsLoading(false)
  //   }
  // }
  return (
    <LayoutContainer>
      <Container>
        <InnerContainer>
          <Head>
            <Heading>Forgot Password</Heading>
            <HeadDes>To recover your BlockReward account, enter your email address below</HeadDes>
          </Head>
          <FormWraper>
            <FormRow>
              <FormLabel>EMAIL</FormLabel>
              <Input 
                placeholder='Enter email address' autoComplete='off'
                // {...register(
                //   'email',
                //   {
                //     required: {
                //       value: true,
                //       message: 'The field is required*'
                //     },
                //     pattern: {
                //       value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                //       message: 'Invalid email address'
                //     }
                //   }
               />
            </FormRow>
            <FormRow>
              <Button color="primary" type="submit">Continue</Button>
            </FormRow>
            <FormRow>
              BlockReward <a href="./terms" target="_blank" rel="noreferrer">Terms and Conditions</a> and <a href="./privacy" target="_blank" rel="noreferrer">Privacy Policy</a> apply. This site is protected by Google reCAPTCHA.
            </FormRow>
          </FormWraper>
        </InnerContainer>
      </Container>
    </LayoutContainer>
  )
}