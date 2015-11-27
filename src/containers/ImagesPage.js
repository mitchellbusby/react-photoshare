import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import Radium from 'radium';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
import ImageCard from '../components/ImageCard';

function mapStateToProps() {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(logoutUser()),
  };
}

@Radium
@connect(mapStateToProps, mapDispatchToProps)
class ImagesPage extends Component {
  render() {
    return (
      <div>
        <AppBar
        title="TRVL"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        showMenuIconButton= { false } style={{ 'position': 'fixed' }} zDepth={ 1 } />
        <Card style={{ 'paddingTop': '70px' }}>
          <CardText>
            <p>Here's a few photos from my travels...</p>
          </CardText>
        </Card>
        <ImageCard/>
      </div>

    );
  }
}

export default ImagesPage;
