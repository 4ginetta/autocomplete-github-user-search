import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'
import {
  fetchUsers
} from '../../actions'
import SearchComponent from '../../components/SearchComponent'
import styles from './index.css'
import HOC from '../../components/HOC'
import bg from '../../assets/bg.svg'

export class SearchContainer extends Component {
  render () {
    const {SearchReducer: {loading, users, error}, fetchUsers} = this.props
    return(
      <HOC>
        <SearchComponent
          fetchUsers={fetchUsers}
          users={users}
          loading={loading}
          error={error}
        />
        <img src={bg} className={styles.bg} alt="background"/>
      </HOC>
    )
  }
}

const ms = ({SearchReducer}) => {
  return {
    SearchReducer
  }
}

const md = (dispatch) => {
  return {
    fetchUsers: bindActionCreators(fetchUsers, dispatch),
  }
}

export default connect(ms, md)(SearchContainer)
