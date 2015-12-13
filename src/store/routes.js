import React from 'react';
import { Router, Route } from 'react-router';
import CounterPage from '../containers/CounterPage';
import LoginPage from '../containers/LoginPage';
import ImagesPage from '../containers/ImagesPage';
import ImageForm from '../containers/AddAnImagePage';

export default (
  <Router>
  <Route path="/" component={ CounterPage } />
  <Route path="/login" component={ LoginPage }/>
  <Route path="/help" component={ CounterPage }/>
  <Route path="/public" component={ ImagesPage } />
  <Route path="/addImage" component={ ImageForm } />
  </Router>
  );
export function SanitisedRoutes() {
  return [
    '/login',
    '/help',
    '/public',
  ];
}
