import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

export default function Searchbar({ onSubmit }) {
  const [searchImgs, setSearchImgs] = useState('');

  const onSearch = event => {
    setSearchImgs(event.currentTarget.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    if (searchImgs.trim() === '') {
      return toast.info(' Please input something for search!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }

    onSubmit(searchImgs);
  };

  return (
    <header className={css.searchBar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.searchForm_button}>
          <span className={css.searchForm_buttonlabel}></span>
        </button>
        <input
          className={css.searchForm_input}
          type="text"
          name="searchImgs"
          autoComplete="off"
          autoFocus
          value={searchImgs}
          onChange={onSearch}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
