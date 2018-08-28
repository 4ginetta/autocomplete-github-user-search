import React from 'react'
import styles from  './index.css'
import img from './assets/search.png'
import spinner from '../../assets/loading.gif'
const SearchInputComponent = ({value, onChange, onKeyDown, placeholder, loading, setShowOptions}) => (
  <div className={styles.inputWrapper}>
    <input placeholder={placeholder || 'Type a github username'} className={styles.searchInput} type="text" value={value || ''} onChange={(e) => onChange(e)} onKeyDown={onKeyDown} />
    <img className={styles.magnifying} src={img} width='30' alt='magnifying glass' />
    {loading && <img className={styles.loading} src={spinner} width='25' alt='loading' />}
  </div>
);

export default SearchInputComponent
