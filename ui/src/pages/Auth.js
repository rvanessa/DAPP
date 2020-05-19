/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { styled } from 'baseui'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import { Button } from 'baseui/button'
import { Label1 } from 'baseui/typography'
import { useMutation } from 'react-query'
import api from '../services/api'
import { login } from '../services/auth'
import LogoExtended from '../components/LogoExtended'

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  flexDirection: 'column',
})

const Form = styled('form', {
  marginTop: '2em',
  width: '30em',
})

const LabelContainer = styled('div', {
  marginTop: '1em',
})

export default function Auth() {
  const [up, setUp] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const history = useHistory()

  const url = up ? '/auth/register' : '/auth/authenticate'

  const [sign] = useMutation((body) => api.post(url, body), {
    onSuccess: ({ data }) => {
      if (data.error) {
        setError(data.error.message)
      } else {
        handleReset()
        login(data.data.token)
        history.push('/dashboard')
      }
    },
  })

  function handleReset(e) {
    setUsername('')
    setPassword('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    const body = {
      username,
      password,
    }
    sign(body)
  }

  function handleToggleMode() {
    setUp((state) => !state)
  }

  return (
    <Centered>
      <LogoExtended />
      <Form onSubmit={handleSubmit}>
        <FormControl error={error} label="Username">
          <Input
            value={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type your username..."
            error={!!error}
            onBlur={() => setError('')}
          />
        </FormControl>
        <FormControl label={() => 'Password'}>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Type your password..."
          />
        </FormControl>
        <Button
          $style={{ width: '100% ' }}
          size="large"
          type="submit"
          disabled={!username || !password || !!error}
        >
          {up ? 'Sign Up' : 'Sign In'}
        </Button>
      </Form>
      <LabelContainer>
        <Label1>
          {up ? 'Already have an account?' : 'Do not have an account?'}
          <Button kind="tertiary" onClick={handleToggleMode}>
            {up ? 'Sign In' : 'Sign Up'}
          </Button>
        </Label1>
      </LabelContainer>
    </Centered>
  )
}
