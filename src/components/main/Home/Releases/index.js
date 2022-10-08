import React from 'react'
import { IconButton } from '../../../../styles'
import EnChevronRight from '@meronex/icons/en/EnChevronRight'
import EnChevronLeft from '@meronex/icons/en/EnChevronLeft'
import { CreatorCard, LayoutContainer } from '../../../shared'
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'

// import required modules
import { Navigation } from 'swiper'

import {
  ContentHeader,
  ButtonGroup,
  SwiperWrapper
} from './styles'

export const Releases = () => {
  const creatorList = [
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'music', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'music', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'music', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'music', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'music', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'},
    { artist: 'Gramatik', title: 'Gramatik - Analog Droid', media_type: 'video', edition: 'Single Item (1-of-1)', release_type: 'Secondary Market', photo: 'https://limewire.com/hc_content_gramatik_cover.0de61d66.jpeg'}
  ]

  return (
    <>
    <LayoutContainer>
      <ContentHeader>
        <h2>Membership offered</h2>
        <ButtonGroup>
          <IconButton className='swiper-btn-prev'>
            <EnChevronLeft />
          </IconButton>
          <IconButton className='swiper-btn-next'>
            <EnChevronRight />
          </IconButton>
        </ButtonGroup>
      </ContentHeader>
    </LayoutContainer>
    <SwiperWrapper>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          loop
          autoplay
          modules={[Navigation]}
          className='mySwiper'
          breakpoints={{
            0: {
              slidesPerView: 1
            },
            300: {
              slidesPerView: 1
            },
            550: {
              slidesPerView: 2
            },
            769: {
              slidesPerView: 3
            },
            1000: {
              slidesPerView: 4
            },
            1400: {
              slidesPerView: 5,
              spaceBetween: 30
            }
          }}
          navigation={{
            nextEl: '.swiper-btn-next',
            prevEl: '.swiper-btn-prev',
          }}
        >
          {creatorList.map((creator, i) => (
            <SwiperSlide key={i}>
              <CreatorCard
                item={creator}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </SwiperWrapper>
    </>

  )
}
