import React from 'react'
import {
  Container,
  InnerContainer
} from './styles'

export const LayoutContainer = (props) => {
  const { children } = props

  return (
    <Container>
      <InnerContainer>
        {children}
      </InnerContainer>
    </Container>
  )
}