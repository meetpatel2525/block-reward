import React from 'react'
import {
  Container,
  InnerContainer,
  LeftSide,
  RightSide,
  FooterMenu
} from './styles'

export const Footer = () => {
  const marketPlaceList = [
    { name: 'Trending', path: '' },
    { name: 'New Releases', path: '' },
    { name: 'Verified Artists', path: '' },
    { name: 'LimeWire Originals', path: '' }
  ]

  const resourceList = [
    { name: 'LMWR Token', path: '' },
    { name: 'Help Center', path: '' },
    { name: 'Blog', path: '' }
  ]

  const accountList = [
    { name: 'Sign Up', path: '' },
    { name: 'Log In', path: '' },
    { name: 'Dashboard', path: '' },
    { name: 'Your Library', path: '' },
  ]

  const companyList = [
    { name: 'About Us', path: '' },
    { name: 'Careers', path: '' },
    { name: 'Press', path: '' }
  ]

  return (
    <Container>
      <InnerContainer>
        <LeftSide>
          <span className="marker">BlockReward is back</span>
          <span className="marker">to bring digital collectibles</span>
          <span className="marker">to everybody.</span>
        </LeftSide>
        <RightSide>
          <FooterMenu>
            <span className='bold'>MarketPlace</span>
            {marketPlaceList.map((menu, i) => (
              <span key={i}>{menu.name}</span>
            ))}
          </FooterMenu>
          <FooterMenu>
            <span className='bold'>Resources</span>
            {resourceList.map((menu, i) => (
              <span key={i}>{menu.name}</span>
            ))}
          </FooterMenu>
          <FooterMenu>
            <span className='bold'>Account</span>
            {accountList.map((menu, i) => (
              <span key={i}>{menu.name}</span>
            ))}
          </FooterMenu>
          <FooterMenu>
            <span className='bold'>Company</span>
            {companyList.map((menu, i) => (
              <span key={i}>{menu.name}</span>
            ))}
          </FooterMenu>
        </RightSide>
      </InnerContainer>
    </Container>
  )
}
