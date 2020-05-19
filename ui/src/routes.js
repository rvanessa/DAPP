import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import { isAuthenticated } from './services/auth'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}

function FreeRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Redirect
            to={{ pathname: '/dashboard', state: { from: props.location } }}
          />
        ) : (
          <Component {...props} />
        )
      }
    />
  )
}

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <FreeRoute exact path="/" component={Auth} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <Route path="*" component={() => <h1>Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  )
}
