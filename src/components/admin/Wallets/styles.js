import styled from 'styled-components'

export const Container = styled.div`
  padding: 20px 0px;

  @media (min-width: 1200px) {
    padding: 20px 0px 20px 30px;
  }
`

export const Option = styled.div`
  display: flex;
  align-items: center;
  padding: 5px;

  > span {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
  }
`

export const WalletList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`
