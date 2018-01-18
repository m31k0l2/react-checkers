import React from "react"
import styled from 'styled-components'

const Field = styled.div`
  height: 32px;
  width: 32px;
  background-size: 32px;
  border: 1px solid #82501B;
  float: left;
`

export const WhiteField = Field.extend`
  background: #C6B798;
`
export const BlackField = Field.extend`
  background: #82501B;
`
