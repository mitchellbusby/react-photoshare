import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/user';
import Radium from 'radium';
import AppBar from 'material-ui/lib/app-bar';
import Card from 'material-ui/lib/card/card';
import CardText from 'material-ui/lib/card/card-text';
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
        showMenuIconButton= { false } />
        <Card>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
        </Card>
      </div>

    );
  }
}

export default ImagesPage;
