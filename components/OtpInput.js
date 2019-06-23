import React, { Component, PureComponent } from 'react'

// keyCode constants
const BACKSPACE = 8
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const DELETE = 46

// Doesn't really check if it's a style Object
// Basic implemenetation to check if it's not a string
// of classNames and is an Object
// TODO: Better implementation
const isStyleObject = obj => typeof obj === 'object'

class SingleOtpInput extends PureComponent {
  input;

  // Focus on first render
  // Only when shouldAutoFocus is true
  componentDidMount () {
    const {
      input,
      props: { focus }
    } = this

    if (input && focus) {
      input.focus()
    }
  }

  componentDidUpdate (prevProps) {
    const {
      input,
      props: { focus }
    } = this

    // Check if focusedInput changed
    // Prevent calling function if input already in focus
    if (prevProps.focus !== focus && (input && focus)) {
      input.focus()
      input.select()
    }
  }

  getClasses = (...classes) => classes.filter(c => !isStyleObject(c) && c !== false).join(' ');

  render () {
    const {
      separator,
      isLastChild,
      inputStyle,
      focus,
      isDisabled,
      hasErrored,
      errorStyle,
      focusStyle,
      disabledStyle,
      ...rest
    } = this.props

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <input
          style={Object.assign(
            {
              width: '1em',
              textAlign: 'center',
              fontSize: '20px',
              color: '#5e07a0',
              fontWeight: 'bold',
              border: 0,
              outline: 0,
              background: 'transparent',
              borderBottom: '2px solid #5e07a0' },
            inputStyle,
            focus && isStyleObject(focusStyle) && focusStyle,
            isDisabled && isStyleObject(disabledStyle) && disabledStyle,
            hasErrored && isStyleObject(errorStyle) && errorStyle
          )}
          className={this.getClasses(
            focus && focusStyle,
            isDisabled && disabledStyle,
            hasErrored && errorStyle
          )}
          type='tel'
          maxLength='1'
          ref={input => {
            this.input = input
          }}
          disabled={isDisabled}
          {...rest}
        />
        {!isLastChild && separator}
      </div>
    )
  }
}

class OtpInput extends Component {
  static defaultProps = {
    numInputs: 6,
    onChange: (otp) => console.log(otp),
    isDisabled: false,
  };

  state = {
    activeInput: 0,
    otp: []
  };

  // Helper to return OTP from input
  getOtp = () => {
    this.props.onChange(this.state.otp.join(''))
  };

  // Focus on input by index
  focusInput = (input) => {
    const { numInputs } = this.props

    this.setState({
      activeInput: Math.max(Math.min(numInputs - 1, input), 0)
    })
  };

  // Focus on next input
  focusNextInput = () => {
    const { activeInput } = this.state
    this.focusInput(activeInput + 1)
  };

  // Focus on previous input
  focusPrevInput = () => {
    const { activeInput } = this.state
    this.focusInput(activeInput - 1)
  };

  // Change OTP value at focused input
  changeCodeAtFocus = (value) => {
    const { activeInput, otp } = this.state
    otp[activeInput] = value

    this.setState({
      otp: otp
    })
    this.getOtp()
  };

  // Handle pasted OTP
  handleOnPaste = (e) => {
    e.preventDefault()
    const { numInputs } = this.props
    const { activeInput, otp } = this.state

    // Get pastedData in an array of max size (num of inputs - current position)
    const pastedData = e.clipboardData
      .getData('text/plain')
      .slice(0, numInputs - activeInput)
      .split('')

    // Paste data from focused input onwards
    for (let pos = 0; pos < numInputs; ++pos) {
      if (pos >= activeInput && pastedData.length > 0) {
        otp[pos] = pastedData.shift()
      }
    }

    this.setState({
      otp: otp
    })

    this.getOtp()
  };

  handleOnChange = (e) => {
    if (this._isValidInput(e)) {
      this.changeCodeAtFocus(e.target.value)
      this.focusNextInput()
    }
  };

  // Handle cases of backspace, delete, left arrow, right arrow
  handleOnKeyDown = (e) => {
    switch (e.keyCode) {
      case BACKSPACE:
        e.preventDefault()
        this.changeCodeAtFocus('')
        this.focusPrevInput()
        break
      case DELETE:
        e.preventDefault()
        this.changeCodeAtFocus('')
        break
      case LEFT_ARROW:
        e.preventDefault()
        this.focusPrevInput()
        break
      case RIGHT_ARROW:
        if (e.target.value === null || e.target.value === '') {
          return;
        }
        e.preventDefault()
        this.focusNextInput()
        break
      default:
        break
    }
  };

  renderInputs = () => {
    const { activeInput, otp } = this.state
    const {
      numInputs,
      inputStyle,
      focusStyle,
      separator,
      isDisabled,
      disabledStyle,
      hasErrored,
      errorStyle
    } = this.props
    const inputs = []

    for (let i = 0; i < numInputs; i++) {
      inputs.push(
        <SingleOtpInput
          key={i}
          focus={activeInput === i}
          value={otp && otp[i]}
          onChange={this.handleOnChange}
          onKeyDown={this.handleOnKeyDown}
          onPaste={this.handleOnPaste}
          onFocus={e => {
            this.setState({
              activeInput: i
            });

            let prevSibling = e.target.parentElement.previousElementSibling;
            
            if (!prevSibling) {
              e.target.select();
              return;
            }
            
            let prevInput = prevSibling.children[0];

            if (prevInput.value && prevInput.value !== '') {
              e.target.select();
            }
            else {
              e.target.blur();
            }
          }}
          onBlur={() => this.setState({ activeInput: -1 })}
          separator={separator}
          inputStyle={inputStyle}
          focusStyle={focusStyle}
          isLastChild={i === numInputs - 1}
          isDisabled={isDisabled}
          disabledStyle={disabledStyle}
          hasErrored={hasErrored}
          errorStyle={errorStyle}
        />
      )
    }

    return inputs
  };

  _isValidInput(evt) {
    const _event = evt || window.event;
    let key = evt.target.value;

    if (key.length >= 13) {
      _event.preventDefault()
      return
    }
 
    if (_event.type === 'paste') {
      key = event.clipboardData.getData('text/plain')
    }
   
    const regex = /[0-9]|\./
    if (!regex.test(key)) {
      return false;
    }

    return true;
  }

  render () {
    const { containerStyle } = this.props

    return (
      <div style={Object.assign({ display: 'flex' }, isStyleObject(containerStyle) && containerStyle)} className={!isStyleObject(containerStyle) && containerStyle}>
        {this.renderInputs()}
      </div>
    )
  }
}

export default OtpInput
