import React from 'react'
import { DashboardHeading } from '../../../shared/DashboardHeading'
import { useWindowSize } from '../../../../hooks/useWindowSize'
import { Button } from '../../../../styles';
import BisUserX from '@meronex/icons/bi/BisUserX';
import BsChevronRight from '@meronex/icons/bs/BsChevronRight';
import AiOutlineClose from '@meronex/icons/ai/AiOutlineClose';
import { useNavigate } from 'react-router-dom';

import {
  AccountBalance,
  StatusBar,
  Billing,
  VerifyStatus,
  Collecting,
  AddBilling,
  Veryfied
} from './styles'

export const Details = () => {
  const { width } = useWindowSize()
  const navigate = useNavigate()

  return (
    <>
      <StatusBar>
        <Billing>
          <Collecting>
            <BisUserX />
            Complete your account to start collecting
          </Collecting>
          <AddBilling onClick={()=>navigate('/u/account')}>
            Add Billing Address
            <BsChevronRight />
          </AddBilling>
        </Billing>
        <VerifyStatus>
          <Veryfied>
            <AiOutlineClose/>
            Identity not verified
          </Veryfied>
          <Button color='primary' onClick={()=>navigate('/u/account')}>
            Verify Identify
            <BsChevronRight />
          </Button>
        </VerifyStatus>
      </StatusBar>

      <DashboardHeading
        title='Dashboard'
      >
        <AccountBalance>
          {width > 768 && (
            <span>Account Value</span>
          )}
          <span className='amount'>USD $0.00</span>
        </AccountBalance>
      </DashboardHeading>
    </>
  )
}