import React, { Component } from 'react';

const withForm = mapPropsToFields => WrappedComponent => class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formValues: mapPropsToFields(props),
    };

    this.onChange = this.onChange.bind(this);
    this.getValues = this.getValues.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ formValues: mapPropsToFields(nextProps) });
  }

  reset() {
    this.setState({ formValues: mapPropsToFields(this.props) });
  }

  getValues() {
    return this.state.formValues;
  }

  onChange(fieldName, mapEventToValue, callback) {
    return (event) => {
      const formValues = {
        ...this.state.formValues,
        [fieldName]: mapEventToValue(event),
      };

      this.setState({ formValues }, () => {
        if (callback) { callback(); }
      });
    };
  }

  render() {
    return (
      <WrappedComponent
        {...this.props}
        resetForm={this.reset}
        getFormValues={this.getValues}
        onFieldChange={this.onChange}
        formValues={this.state.formValues}
      />
    );
  }
};

export default withForm;
