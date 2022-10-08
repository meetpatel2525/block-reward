import React from 'react'
import { Featured } from './Featured'
import { HomeHero } from './HomeHero'
import { Releases } from './Releases'
import { LimeLight } from './LimeLight'
import { StayOfCurve } from './StayOfCurve'
import { TrendingCollections } from './TrendingCollections'
import { Empowering } from './Empowering'

export const Home = () => {
  return (
    <>
      <HomeHero />
      <Featured />
      <Releases />
      <LimeLight />
      <StayOfCurve />
      <TrendingCollections />
      <Empowering />
    </>
  )
}
