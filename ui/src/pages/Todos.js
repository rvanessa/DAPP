import React, { useState } from 'react'
import { useQuery, useMutation, queryCache } from 'react-query'
import { ListItem, ListItemLabel } from 'baseui/list'
import { Button } from 'baseui/button'
import { useStyletron } from 'styletron-react'
import { Checkbox } from 'baseui/checkbox'
import { Spinner } from 'baseui/spinner'
import { Input } from 'baseui/input'
import { styled } from 'baseui'

import api from '../services/api'
import { logout } from '../services/auth'
import { H1 } from 'baseui/typography'

async function todosFetcher() {
  const { data } = await api.get('/todos')
  return data.data.todos
}

const Form = styled('form', {
  width: '30em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'between',
})

function Todos() {
  const [css] = useStyletron()
  const [text, setText] = useState('')
  const { data, status, error } = useQuery('todos', todosFetcher)

  const [toggle] = useMutation((id) => api.post(`/todos/${id}`), {
    onSuccess: () => queryCache.refetchQueries('todos'),
    onError: () => logout(),
  })

  const [remove] = useMutation((id) => api.delete(`/todos/${id}`), {
    onSuccess: () => queryCache.refetchQueries('todos'),
    onError: () => logout(),
  })

  const [store] = useMutation((text) => api.post(`/todos`, { text }), {
    onSuccess: () => queryCache.refetchQueries('todos'),
    onError: () => logout(),
  })

  function handleSubmit(e) {
    e.preventDefault()
    store(text)
    setText('')
  }

  if (status === 'error') {
    return <span>Error: {error.message}</span>
  }

  return (
    <div
      className={css({
        width: '100%',
      })}
    >
      <Form onSubmit={handleSubmit}>
        <div style={{ width: '60%' }}>
          <Input
            value={text}
            type="text"
            onChange={(e) => setText(e.target.value)}
            placeholder="New todo text..."
          />
        </div>
        <div style={{ width: '40%' }}>
          <Button type="submit" disabled={!text}>
            Create new todo
          </Button>
        </div>
      </Form>
      {status === 'loading' ? (
        <Spinner />
      ) : (
        <ul
          className={css({
            width: '95%',
            paddingLeft: 0,
            paddingRight: 0,
          })}
        >
          {data && data.length === 0 && <H1>You do not have todos</H1>}
          {data &&
            data.map((todo) => (
              <ListItem
                key={todo.id}
                artwork={() => (
                  <Checkbox
                    checked={todo.completed}
                    onChange={() => toggle(todo.id)}
                  />
                )}
                endEnhancer={() => (
                  <Button
                    size="compact"
                    onClick={() => remove(todo.id)}
                    kind="secondary"
                    shape="pill"
                  >
                    Remove
                  </Button>
                )}
              >
                <ListItemLabel>{todo.text}</ListItemLabel>
              </ListItem>
            ))}
        </ul>
      )}
    </div>
  )
}

export default Todos
