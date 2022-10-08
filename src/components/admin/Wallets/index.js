import React from 'react'
import { Select } from '../../../styles'
import { DashboardHeading } from '../../shared/DashboardHeading'
import CrUsdc from '@meronex/icons/cr/CrUsdc'
import GrBitcoin from '@meronex/icons/gr/GrBitcoin'
import MdcEthereum from '@meronex/icons/mdc/MdcEthereum'
import { AlgorandIcon } from '../../shared/SvgIcons'
import { WalletItem } from './WalletItem'
import {
  Container,
  Option,
  WalletList
} from './styles'
import { Transaction } from './Transaction'

export const Wallets = () => {
  const creatorOptions = [
    { value: 'usd', content: <Option><span className='name'>USD</span></Option> },
    { value: 'usdc', content: <Option><span className='name'>USDC</span></Option> },
    { value: 'algo', content: <Option><span className='name'>ALGO</span></Option> },
    { value: 'btc', content: <Option><span className='name'>BTC</span></Option> },
    { value: 'eth', content: <Option><span className='name'>ETH</span></Option> },
    { value: 'eur', content: <Option><span className='name'>EUR</span></Option> },
    { value: 'gbp', content: <Option><span className='name'>GBP</span></Option> },
  ]

  const walletList = [
    { icon: <CrUsdc />, name: 'USDC', price: 0.00 },
    { icon: <GrBitcoin />, name: 'BTC', price: 0.00 },
    { icon: <MdcEthereum />, name: 'ETH', price: 0.00 },
    { icon: <AlgorandIcon />, name: 'ALGO', price: 0.00 },

  ]

  return (
    <Container>
      <DashboardHeading title='Wallets'>
        <Select
          notReload
          placeholder='Select creator'
          options={creatorOptions}
          defaultValue='usd'
          onChange={val => console.log(val)}
        />
      </DashboardHeading>
      <WalletList>
        {walletList.map((wallet, i) => (
          <WalletItem
            wallet={wallet}
            key={i}
          />
        ))}
      </WalletList>
      <Transaction />
    </Container>
  )
}
