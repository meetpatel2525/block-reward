import React from 'react'
import { Button, Input } from '../../../../styles'
import {
  Container,
  Heading,
  Body,
  Description,
  FromWrapper,
  FromBox,
  WraningMessage,
  ButtonWrapper,
  FormGroup
} from './styles'

export const WithDraw = (props) => {
  const { wallet, onClose } = props

  return (
    <Container>
      <Heading>
        {wallet?.icon}
        <span>Withdraw {wallet.name}</span>
      </Heading>
      <Body>
        <Description>To make a withdrawal, please enter an amount and wallet address below. Once your withdrawal has been processed, you will receive an email.</Description>
        <FromWrapper>
          <label>From</label>
          <FromBox>
            <div>
              <span>Wallet balance</span>
              <span className='price'>{wallet?.name} 0.00</span>
            </div>
            <div>
              <span>Available for withdrawal</span>
              <span className='price'>{wallet?.name} 0.00</span>
            </div>
            <div>
              <span>Reserved Funds</span>
              <span className='price'>{wallet?.name} 0.00</span>
            </div>
          </FromBox>
        </FromWrapper>
        <FormGroup>
          <label>Amount (USDC)</label>
          <Input
            styleType='admin'
            placeholder={`${wallet.name} 0.00`}
          />
        </FormGroup>
        <FormGroup>
          <label>Wallet Address</label>
          <Input
            styleType='admin'
            placeholder={`Enter ${wallet.name} Wallet Address`}
          />
        </FormGroup>
        <WraningMessage>
        Please always double-check your wallet address before submitting a withdrawal request.
        </WraningMessage>
        <ButtonWrapper>
          <Button
            color='primary'
            type='submit'
            onClick={() => onClose()}
          >
            Withdraw {wallet?.name}
          </Button>
          <Button color='primary' type='button' naked onClick={() => onClose()}>Cancel</Button>
        </ButtonWrapper>
      </Body>
    </Container>
  )
}
