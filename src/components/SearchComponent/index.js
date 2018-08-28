import React, {Component} from 'react'
import styles from  './index.css'
import SearchInputComponent from '../SearchInputComponent'
import OptionListComponent from '../OptionListComponent'

export class SearchComponent extends Component {
  state = {
    queryText: '',
    indexOfSelected: 0,
    showOptions: false,
  };

  componentDidMount() {
    this.timer = null;
  }

  _handleChange = (e, options) => {
    const queryText = e.target.value;
    clearTimeout(this.timer);

    this.setState({
      queryText,
      indexOfSelected: 0,
      showOptions: true,
    });

    this.timer = setTimeout(this._triggerFetch, 200);
  };

  _handleClick = (e, option) => {
    this.setState({
      queryText: option.login,
      indexOfSelected: 0,
      showOptions: false,
    });
    return window.open(option.profile_url, '_blank');
  };

  _triggerFetch = async () => {
    const {queryText} = this.state
    const {fetchUsers} = this.props
    const searchRegex = /[a-z]{1}/i
    if (searchRegex.test(queryText)) {
      return await fetchUsers(queryText)
    }
    return null
  }

  _handleKeydown = (e, options, indexOfSelected) => {
    var optionsElement = document.getElementById(`element${indexOfSelected}`);
    if (e.keyCode === 13) {
      if (!options[indexOfSelected].profile_url) return null
      this.setState({
        queryText: options[indexOfSelected].login,
        indexOfSelected: 0,
        showOptions: false,
      });
      return window.open(options[indexOfSelected].profile_url, '_blank');
    } else if (e.keyCode === 38) {
      e.preventDefault()
      if (indexOfSelected === 0) {
        return;
      }
      if (optionsElement) {
        document.getElementById('optionList').scrollTop = (indexOfSelected-4)*50;
      }
      return this.setState({ indexOfSelected: indexOfSelected - 1 });
    } else if (e.keyCode === 40) {
      e.preventDefault()
      if (indexOfSelected >= options.length-1) {
        return;
      }
      if (optionsElement) {
        document.getElementById('optionList').scrollTop = (indexOfSelected-3)*50;
      }
      return this.setState({ indexOfSelected: indexOfSelected + 1 });
    }
  };

  render () {
    const {queryText, showOptions, indexOfSelected} = this.state
    const {users, loading, error} = this.props

    return (
      <div className={styles.inputContainer}>
        <SearchInputComponent
          onChange={(e) => this._handleChange(e, users)}
          onKeyDown={(e) => this._handleKeydown(e, users, indexOfSelected)}
          value={queryText}
          loading={loading}
        />
        {!error && <OptionListComponent
          queryText={queryText}
          showOptions={showOptions}
          indexOfSelected={indexOfSelected}
          handleClick={this._handleClick}
          options={users}
          loading={loading}
         />}
         {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  }
}

export default SearchComponent
