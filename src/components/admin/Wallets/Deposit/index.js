import React from 'react'
import MdContentCopy from '@meronex/icons/md/MdContentCopy'
import {
  Container,
  Heading,
  Body,
  Description,
  DepositAddressWrapper,
  DepositAddressBox,
  WraningMessage
} from './styles'
import { Button } from '../../../../styles'

export const Deposit = (props) => {
  const { wallet, onClose } = props

  return (
    <Container>
      <Heading>
        <span>Deposit {wallet.name}</span>
      </Heading>
      <Body>
        <Description>To make a deposit, please transfer {wallet.name} to the deposit address below. Once the transfer is received, you will receive an email.</Description>
        <DepositAddressWrapper>
          <label>Deposit Address</label>
          <DepositAddressBox>
            <span>0xD2AaaF5c4033Bd2cD2cfe3777eC46Aa9DE4d827C</span>
            <MdContentCopy />
          </DepositAddressBox>
        </DepositAddressWrapper>
        <WraningMessage>
        Please do not send any digital assets other than USDC to the deposit address shown above, otherwise these assets will be lost.
        </WraningMessage>
        <Button color='primary' naked onClick={() => onClose()}>Done</Button>
      </Body>
    </Container>
  )
}
