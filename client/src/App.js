import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SignUpLogin from '../src/pages/SignUpLogin'
import Dashboard from '../src/pages/Dashboard'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignUpLogin} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Router>
  );
}
