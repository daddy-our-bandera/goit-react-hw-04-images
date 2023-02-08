import { Component } from 'react';

import { imagesRequest } from 'api/api';
import { Toast } from './Notify/ToastContainer';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ErrorMessage } from './ErrorMassage/ErrorMessage';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';

export default class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalFound: 0,
    status: 'idle',
    error: null,
    scroll: 0,
  };

  componentDidUpdate(_, prevState) {
    const { query, page, scroll } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      this.setState({ status: 'pending' });

      imagesRequest(query, page)
        .then(data => {
          if (!data.hits.length) {
            throw new Error(`This search "${query}" is not found`);
          } else {
            this.setState(prevState => ({
              status: 'resolved',
              showStartTitle: false,
              images: [...prevState.images, ...data.hits],
              totalFound: data.totalHits,
              scroll: document.documentElement.scrollHeight,
            }));
          }
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }

    if (prevState.scroll !== scroll && page > 1) {
      window.scrollTo({
        top: scroll - 240,
        behavior: 'smooth',
      });
    }
  }

  searchQuery = data => {
    if (data.trim() !== this.state.query) {
      this.setState({
        page: 1,
        query: data.trim(),
        images: [],
      });
    }
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, error, totalFound } = this.state;
    if (status === 'idle') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.searchQuery}></Searchbar>
          <Toast rtl />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.searchQuery} />
          <ImageGallery images={images} />
          <Loader />
          <Toast rtl />
          {totalFound > 12 && <Button onClick={this.loadMore} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.searchQuery} />
          <ErrorMessage message={error.message} />
          <Toast rtl />
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.searchQuery} />
          <ImageGallery images={images} />
          <Toast rtl />
          {totalFound > 12 && totalFound > images.length && (
            <Button loadMore={this.loadMore} />
          )}
        </div>
      );
    }
  }
}
