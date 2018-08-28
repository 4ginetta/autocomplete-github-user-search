import React from 'react'
import styles from  './index.css'
import {highlightMatchedText} from '../../utility/HighlightMatchedText'

const OptionComponent = ({index, onClick, option, queryText, indexOfSelected, handleHover, allowedKeyboardActivation}) => {
    let className = styles.option
    let isUser = option.profile_url ? true : false
    if (index === indexOfSelected) {
      className = `${styles.option} ${styles.activeOption}`
    }
    const _handleClick = (e) => {
      onClick(e, option)
      return handleHover(true)
    }
    return(
      <div
        id={`element${index}`}
        className={allowedKeyboardActivation && isUser ? className : styles.option}
        onClick={isUser ? (e) => _handleClick(e) : () => null}
        onMouseEnter={isUser ? () => handleHover(false) : () => null}
        onMouseLeave={isUser ? () => handleHover(true) : () => null}
      >
        <img src={option.avatar_url} className={styles.optionImg} alt="github avatar"/>
        <p className={styles.optionText}>{highlightMatchedText(option.login, queryText)}</p>
      </div>
    )
};

export default OptionComponent
