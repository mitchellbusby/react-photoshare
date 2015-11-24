import React from 'react';
import { Router, Route } from 'react-router';
import CounterPage from '../containers/CounterPage';
import LoginPage from '../containers/LoginPage';
import ImagesPage from '../containers/ImagesPage';

export default (
  <Router>
  <Route path="/" component={ CounterPage } />
  <Route path="/login" component={ LoginPage }/>
  <Route path="/help" component={ CounterPage }/>
  <Route path="/public" component={ ImagesPage } />
  </Router>
  );
export function SanitisedRoutes() {
  return [
    '/login',
    '/help',
    '/public',
  ];
}
