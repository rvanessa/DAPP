import React from 'react'
import { StyledTable, StyledHeadCell, StyledBodyCell } from 'baseui/table-grid'
import { Spinner } from 'baseui/spinner'
import { useQuery } from 'react-query'

import api from '../services/api'
import { logout } from '../services/auth'

async function eventsFetcher() {
  const { data } = await api.get('/events')
  return data.data.events.chain
}

function Events() {
  const { data, status, error } = useQuery('todos', eventsFetcher)

  if (status === 'loading') {
    return <Spinner />
  }

  if (status === 'error') {
    logout()
    return <span>Error: {error.message}</span>
  }

  return (
    <StyledTable $gridTemplateColumns="minmax(600px, max-content) 200px 200px">
      <StyledHeadCell>Hash</StyledHeadCell>
      <StyledHeadCell>Type</StyledHeadCell>
      <StyledHeadCell>Info</StyledHeadCell>
      {data &&
        data.map((row, index) => {
          console.log(row)
          return (
            <React.Fragment key={index}>
              <StyledBodyCell>{row?.hash ?? ''}</StyledBodyCell>
              <StyledBodyCell>{row?.data?.event ?? ''}</StyledBodyCell>
              <StyledBodyCell>
                {row?.data?.data?.log ?? row?.data?.data?.todo?.id ?? ''}
              </StyledBodyCell>
            </React.Fragment>
          )
        })}
    </StyledTable>
  )
}

export default Events
