import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

import './TitleInput.css';

class TitleInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.initialText,
      inputError: false
    }
    this.updateText = this.updateText.bind(this);
    this.submitText = this.submitText.bind(this);
  }

  updateText(event) {
    this.setState({
      text: event.target.value,
      inputError: false
    });
  }

  submitText(event) {
    event.preventDefault();
    if (!this.state.text) {
      this.setState({
        inputError: true
      });
      return;
    }

    this.setState({
      text: this.props.initialText
    });
    this.props.handleSubmit(this.state.text);
  }

  render() {
    return (
      <form onSubmit={this.submitText}>
        <Input
          id={this.props.inputId}
          className={this.props.fullWidth ? 'full-width' : null}
          action={this.props.action}
          error={this.state.inputError}
          value={this.state.text}
          onChange={this.updateText}
          placeholder={this.props.placeholder}
        />
      </form>
    );
  }
}

export default TitleInput;
