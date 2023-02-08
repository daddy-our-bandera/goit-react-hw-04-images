import PropTypes from 'prop-types';
import { Component } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import 'react-toastify/dist/ReactToastify.css';

export class Searchbar extends Component {
  state = {
    searchImgs: '',
  };

  onSearch = event => {
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchImgs.trim() === '') {
      toast.info(' Please input something for search!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }

    this.props.onSubmit(this.state.searchImgs);
    this.setState({ searchImgs: '' });
  };

  render() {
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchForm_button}>
            <span className={css.searchForm_buttonlabel}></span>
          </button>
          <input
            className={css.searchForm_input}
            type="text"
            name="searchImgs"
            autoComplete="off"
            autoFocus
            value={this.state.searchImgs}
            onChange={this.onSearch}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
