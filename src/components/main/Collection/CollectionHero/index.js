import React from 'react'
import { LayoutContainer } from '../../../shared'
import MdcCheckDecagram from '@meronex/icons/mdc/MdcCheckDecagram'
import {
  Container,
  Toolbar,
  LeftToolbar,
  RightToolbar
} from './styles'

export const CollectionHero = () => {
  return (
    <LayoutContainer>
      <Container>
        <img src='https://d2tg7hjmtin7hh.cloudfront.net/thumbs/collection_hero/6315/6315d423-5532-47a0-8953-7c336abe503f_large.png' alt='' />
        <Toolbar>
          <LeftToolbar>
            <span>BlockReward</span>
            <MdcCheckDecagram />
          </LeftToolbar>
          <RightToolbar>
            <a href='https://twitter.com/limewire' rel="noreferrer" target='_blank'>
              <img src='https://limewire.com/colored_logo_twitter.c72b619d.svg' alt='' />
              <span>BlockReward</span>
            </a>
            <a href='https://instagram.com/limewire' rel="noreferrer" target='_blank'>
              <img src='https://limewire.com/colored_logo_instagram.cc727337.svg' alt='' />
              <span>BlockReward</span>
            </a>
          </RightToolbar>
        </Toolbar>
      </Container>
    </LayoutContainer>

  )
}
