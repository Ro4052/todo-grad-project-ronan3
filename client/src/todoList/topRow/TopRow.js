import React, { Component } from 'react';
import { Segment, Button } from 'semantic-ui-react';

import './TopRow.css';

class TopRow extends Component {
  render() {
    return (
      <Segment className='top-row'>
        <Button.Group>
          <Button id='all' onClick={this.props.updateFilter}> All </Button>
          <Button id='active' onClick={this.props.updateFilter}> Active </Button>
          <Button id='completed' onClick={this.props.updateFilter}> Completed </Button>
        </Button.Group>
        <Button
          negative
          disabled={this.props.numCompleted === 0}
          className='delete-completed'
          onClick={this.props.deleteCompleted}> Delete Completed </Button>
      </Segment>
    );
  }
}

export default TopRow;
