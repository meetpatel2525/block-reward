import React from 'react'
import VscSearch from '@meronex/icons/vsc/VscSearch'
import BsFillStarFill from '@meronex/icons/bs/BsFillStarFill'
import { Button, Input } from '../../../../styles'
import { LayoutContainer } from '../../../shared'
import {
  Container,
  HeroContainer,
  InnerHeaderContent,
  SearchWrapper,
  SearchContentWrapper,
  PromotedArticalContainer,
  PromotedContent,
  PromotionItem,
  KnowledgeContainer,
  KnowledgeContent,
  KnowledgeItem
} from './styles'

export const Home = () => {
  const promotionList = [
    { title: 'What are digital collectibles?', content: 'Digital collectibles you can find on LimeWire are exclusive pieces of art cre...' },
    { title: 'I have 50 USD – Can I still get digital collectible on LimeWire? ', content: 'Of course, you can! LimeWire is the first truly mainstream platform for digit...' },
    { title: 'Problems with claiming my NFT', content: 'Currently we are experiencing issues with delivering claimed NFTs quickly - w...' },
    { title: 'How do I start using LimeWire?', content: 'LimeWire is relaunching as digital collectibles marketplace for art and enter...' }
  ]

  return (
    <>
      <Container>
        <HeroContainer>
          <InnerHeaderContent>
            <h2>What can we help you with?</h2>
            <SearchWrapper>
              <SearchContentWrapper>
                <VscSearch />
                <Input
                  placeholder='Type your question here...'
                />
              </SearchContentWrapper>
              <Button color='primary' borderRadius='2px'>Search</Button>
            </SearchWrapper>
          </InnerHeaderContent>
        </HeroContainer>
        <LayoutContainer>
          <PromotedArticalContainer>
            <h2>Promoted articles</h2>
            <PromotedContent>
              {promotionList.map((item, i) => (
                <PromotionItem key={i}>
                  <BsFillStarFill />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.content}</p>
                  </div>
                </PromotionItem>
              ))}
            </PromotedContent>
          </PromotedArticalContainer>
        </LayoutContainer>
        <LayoutContainer>
          <KnowledgeContainer>
            <h2>Knowledge base</h2>
            <KnowledgeContent>
              <KnowledgeItem>
                <div>
                  <h2>I am an artist.</h2>
                  <p>Learn how to get started on LimeWire, create an account, and list your NFT for sale.</p>
                </div>
              </KnowledgeItem>
              <KnowledgeItem>
                <div>
                  <h2>I am a collector.</h2>
                  <p>Learn more about LimeWire, how to buy digital collectibles, payments & secondary marketplace.</p>
                </div>
              </KnowledgeItem>
            </KnowledgeContent>
          </KnowledgeContainer>
        </LayoutContainer>
      </Container>
    </>
  )
}
