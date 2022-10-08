import React from 'react'
import MdcCheckDecagram from '@meronex/icons/mdc/MdcCheckDecagram'
import BisCopy from '@meronex/icons/bi/BisCopy'
import BsMusicNoteBeamed from '@meronex/icons/bs/BsMusicNoteBeamed'
import GoDeviceCameraVideo from '@meronex/icons/go/GoDeviceCameraVideo'
import BsFillXDiamondFill from '@meronex/icons/bs/BsFillXDiamondFill'
import BsStar from '@meronex/icons/bs/BsStar'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  ImageWrapper,
  ArtistWrapper,
  TitleWrapper,
  EditionWrapper,
  CommercialsWrapper,
  MediaTypeWrapper,
  Algorand,
  ReleaseWrapper,
  DateWrapper,
  StarWrapper
} from './styles'
import { AlgorandIcon } from '../SvgIcons'

export const CreatorCard = (props) => {
  const {
    item,
    type,
    isCreator,
    isItem
  } = props

  const navigate = useNavigate()

  const handleClickCard = () => {
    if (isCreator) navigate(`/item/${item.artist.toLowerCase()}`)
    else navigate(`/creator/${item.artist.toLowerCase()}`)
  }

  return (
    <Container onClick={() => handleClickCard()}>
      <ImageWrapper>
        <img src={item.photo} alt='' />
        <MediaTypeWrapper className='hover-view'>
          {isItem ? (
            <>
              <BsFillXDiamondFill />
              <span>Collectibles</span>
            </>
          ) : (
            <>
              {item?.media_type === 'music' ? <BsMusicNoteBeamed /> : <GoDeviceCameraVideo />}
              <span>{item?.media_type}</span>
            </>
          )}
        </MediaTypeWrapper>
        {isItem && (
          <StarWrapper className='hover-view'>
            <BsStar />
            <span>0</span>
          </StarWrapper>
        )}
        <Algorand className='hover-view'>
          <div>
            <AlgorandIcon />
            <span>Algorand</span>
          </div>
        </Algorand>
      </ImageWrapper>
      <ArtistWrapper>
        <span>{item?.artist}</span>
        <MdcCheckDecagram />
      </ArtistWrapper>
      <TitleWrapper>{item?.title}</TitleWrapper>
      <EditionWrapper>
        <BisCopy />
        <span>{item?.edition}</span>
      </EditionWrapper>
      <CommercialsWrapper>
        <ReleaseWrapper>
          <span className='title'>Release</span>
          <span>{item.release_type}</span>
        </ReleaseWrapper>
        {type === 1 && (
          <DateWrapper>
            <span className='title'>Last sale</span>
            <span>USDC ${item.price}</span>
          </DateWrapper>
        )}
      </CommercialsWrapper>
    </Container>
  )
}
