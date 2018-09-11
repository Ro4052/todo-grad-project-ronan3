import React from 'react';
import { Segment, Button } from 'semantic-ui-react';

import './TopRow.css';

const TopRow = (props) => (
  <Segment className='top-row'>
    <Button.Group className='filter-buttons'>
      <Button id='all' onClick={props.updateFilter}> All </Button>
      <Button id='active' onClick={props.updateFilter}> Active </Button>
      <Button id='completed' onClick={props.updateFilter}> Completed </Button>
    </Button.Group>
    <Button
      negative
      disabled={!props.numCompleted}
      className='delete-completed'
      onClick={props.deleteCompleted}> Delete Completed </Button>
  </Segment>
);

export default TopRow;
