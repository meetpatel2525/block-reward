import React from 'react'
import { LandingLayout } from '../../../shared/LandingLayout'
import { Accordion } from '../Accordion'

import {
  Container,
  Heading,
  AccordionContainer
} from './styles'

export const Questions = () => {
  const data = [
    {
      title: "How can I purchase a digital collectible from a drop on BlockReward?",
      description: "Buying a digital collectible on BlockReward is very simple. You can choose between paying with your credit card or with crypto. Just follow the instructions after clicking on “Buy Now” once the collection is live for purchase.",
      customeContent: false,
      list: []
    },
    {
      title: "What does the Close To Home Mystery Box collection contain?",
      description: "The Close To Home Mystery Box is a 600 item collection that not only gets you one of 16 unique digital trading cards & art pieces each related to a different track on the Close To Home album but also gives a chance to win a range of different experiences, merch, physical signed artwork and more.",
      customeContent: false,
      list: []
    },
    {
      title: "What does the Close To Home Limited Edition Album collection contain?",
      description: "The Close To Home Limited Edition Album is a 250 item limited edition of Aitch’s new album that comes with a unique album cover only available on BlockReward and the bundle counts towards official charts position so you're helping Aitch get to #1. You also get a physical limited edition CD or vinyl shipped home to you by the official release date (19th August 2022), if you buy your collectible bundle on BlockReward by 12pm BST on the 15th August 2022.",
      customeContent: false,
      list: []
    },
    {
      title: "What is the full list of utilities that can be won from the Close To Home Mystery Box collection?",
      description: "The Close To Home Mystery Box includes the following utilities that can be won by holders:",
      customeContent: true,
      list: [
        "5 x Unlimited VIP access to Aitch shows for life for yourself and a friend",
        "10 x Unlimited pass for Aitch shows next year for you and a friend",
        "1 x FaceTime with Aitch",
        "1 x Shopping trip with Aitch treating you",
        "1 x Aitch music video behind-the-scenes experience",
        "16 x signed physical artworks on canvas",
        "1 x artwork of fan done by artist of Aitch’s collection",
        "10 x Aitch merch bundle",
        "1 x Personal message from Aitch",
      ]
    },
    {
      title: "How do I know if I’ve won any of the utilities in the Close To Home Mystery Box collection?",
      description: "The utility / prizes will be revealed when the collection is sold out. You will get notified via email in advance and be able to see if you won on the individual digital collectible in your account Library.",
      customeContent: false,
      list: []
    }
  ]

  return (
    <Container>
      <LandingLayout>
        <Heading data-aos='fade-up' data-aos-delay="200">
          <h2>Frequently Asked Questions</h2>
          <p>We provide information about the drop and general FAQs</p>
        </Heading>
        <AccordionContainer data-aos='fade-up' data-aos-delay="100">
          {data.map((item, i) => 
            <Accordion key={i} item={item}/>
          )}
        </AccordionContainer>
      </LandingLayout>
    </Container>
  );
}