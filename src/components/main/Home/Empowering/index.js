import React from 'react'
import { Button } from '../../../../styles'
import { LayoutContainer } from '../../../shared'
import {
  Container,
  Graphic,
  DetailsWrapper,
  ButtonGroup
} from './styles'
import Cards from '../../../../assets/images/cards.png';

export const Empowering = () => {
  return (
    <LayoutContainer>
      <Container>
        <Graphic>
          <img src={Cards} alt='' />
        </Graphic>
        <DetailsWrapper>
          <h3>Empowering Artists & Collectors</h3>
          <h4>Music has entered an on-demand era with ownership taking a back seat. We are on a mission to allow artists to go back to selling directly to fans and collectors.</h4>
          <ButtonGroup>
            <Button color='primary'>I want to buy NFTs</Button>
            <Button naked color='primary'>I am a Creator</Button>
          </ButtonGroup>
        </DetailsWrapper>
      </Container>
    </LayoutContainer>
  )
}