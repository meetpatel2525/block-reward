import React from 'react'
import { CollectionBrowse } from './CollectionBrowse'
import { CollectionHero } from './CollectionHero'
import { CollectionInfo } from './CollectionInfo'
import { InfoBar } from './InfoBar'

export const Collection = () => {
  return (
    <>
      <CollectionHero />
      <CollectionInfo />
      <InfoBar />
      <CollectionBrowse />
    </>
  )
}
