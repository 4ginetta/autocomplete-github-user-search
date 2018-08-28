import React, {Component} from 'react'
import styles from  './index.css'
import OptionComponent from '../OptionComponent'

class OptionListComponent extends Component {
  state = {
    allowedKeyboardActivation: true
  }

  _handleHover = (bool) => {
    return this.setState({allowedKeyboardActivation: bool})
  }

  _renderOptions = () => {
    const {handleClick, indexOfSelected, options, queryText} = this.props
    const {allowedKeyboardActivation} = this.state
    return options.map((option, i) => {
      return (
        <OptionComponent
           key={i}
           index={i}
           onClick={handleClick}
           indexOfSelected={indexOfSelected}
           option={option}
           queryText={queryText}
           allowedKeyboardActivation={allowedKeyboardActivation}
           handleHover={this._handleHover}
         />
      );
    })
  }

  render() {
    const {options, queryText, showOptions} = this.props
    if (options.length === 0 || !showOptions || !queryText) {
      return null
    }
    return (
      <div className={styles.optionsWrapper}>
        <p className={styles.resultsTitle}>Github users</p>
        <div id="optionList" className={styles.options}>
          {this._renderOptions()}
        </div>
      </div>
    )
  }
}

export default OptionListComponent
