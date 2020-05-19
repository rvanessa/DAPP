import React from 'react'
import { styled } from 'baseui'
import { useStyletron } from 'baseui'
import {
  HeaderNavigation,
  ALIGN,
  StyledNavigationItem,
  StyledNavigationList,
} from 'baseui/header-navigation'
import { StyledLink as Link } from 'baseui/link'
import { Button } from 'baseui/button'
import { useHistory, useRouteMatch, Switch, Route } from 'react-router-dom'

import Todos from './Todos'
import Events from './Events'
import { logout } from '../services/auth'
import Logo from '../components/Logo'

const Centered = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

export default function Dashboard() {
  const [css] = useStyletron()
  const { path } = useRouteMatch()
  return (
    <div
      className={css({
        width: '100%',
      })}
    >
      <Header />
      <Centered>
        <div style={{ margin: '8rem 4rem' }}>
          <Switch>
            <Route exact path={path} component={Todos} />
            <Route exact path={`${path}/events`} component={Events} />
          </Switch>
        </div>
      </Centered>
    </div>
  )
}

function Header() {
  const [css] = useStyletron()
  const history = useHistory()

  const containerStyles = css({
    boxSizing: 'border-box',
    width: '100%',
    position: 'fixed',
    top: '0',
    left: '0',
    background: '#fff',
    zIndex: 999999,
  })

  function handleNavClick(path) {
    history.push(path)
  }

  function handleLogout() {
    logout()
    history.push('/')
  }

  return (
    <div className={containerStyles}>
      <HeaderNavigation>
        <StyledNavigationList $align={ALIGN.left}>
          <StyledNavigationItem>
            <Logo />
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.center} />
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem style={{ cursor: 'pointer' }}>
            <Link onClick={() => handleNavClick('/dashboard')}>Todos</Link>
          </StyledNavigationItem>
          <StyledNavigationItem style={{ cursor: 'pointer' }}>
            <Link onClick={() => handleNavClick('/dashboard/events')}>
              Events
            </Link>
          </StyledNavigationItem>
        </StyledNavigationList>
        <StyledNavigationList $align={ALIGN.right}>
          <StyledNavigationItem>
            <Button onClick={handleLogout}>Logout</Button>
          </StyledNavigationItem>
        </StyledNavigationList>
      </HeaderNavigation>
    </div>
  )
}
