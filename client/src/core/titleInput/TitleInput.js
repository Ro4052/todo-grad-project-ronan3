import React, { Component } from 'react';
import { Input, Button } from 'semantic-ui-react';

import './TitleInput.css';

class TitleInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: this.props.initialText,
      inputError: false
    }
    this.updateText = this.updateText.bind(this);
    this.submitText = this.submitText.bind(this);
  }

  updateText(event) {
    this.setState({
      inputText: event.target.value,
      inputError: false
    });
  }

  submitText(event) {
    event.preventDefault();
    if (!this.state.inputText) {
      this.setState({
        inputError: true
      });
      return;
    }

    this.setState({
      inputText: this.props.initialText
    });
    this.props.handleSubmit(this.state.inputText);
  }

  render() {
    return (
      <form className='input-form' onSubmit={this.submitText}>
        <Input
          id={this.props.inputId}
          className={this.props.fullWidth ? 'full-width' : null}
          action={this.props.action ? <Button> {this.props.action} </Button> : null}
          error={this.state.inputError}
          value={this.state.inputText}
          onChange={this.updateText}
          placeholder={this.props.placeholder}
        />
      </form>
    );
  }
}

export default TitleInput;
