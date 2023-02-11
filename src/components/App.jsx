import { useEffect, useState } from 'react';

import { imagesRequest } from 'api/api';
import { Toast } from './Notify/ToastContainer';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ErrorMessage } from './ErrorMassage/ErrorMessage';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import css from './App.module.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    if (!query) {
      return;
    }
    setStatus('pending');

    imagesRequest(query, page)
      .then(data => {
        if (!data.hits.length) {
          throw new Error(`This search "${query}" is not found`);
        } else {
          setStatus('resolved');
          setImages(images => [...images, ...data.hits]);
          setTotal(data.totalHits);
          setScroll(document.documentElement.scrollHeight);
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [query, page]);

  useEffect(() => {
    if (!scroll || page === 1) {
      return;
    }
    window.scrollBy({
      top: window.innerHeight - 240,
      behavior: 'smooth',
    });
  }, [scroll, page]);

  const searchQuery = data => {
    if (data.trim() !== query) {
      setQuery(data);
      setImages([]);
      setPage(1);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  if (status === 'idle') {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchQuery}></Searchbar>
        <Toast rtl />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchQuery} />
        <ImageGallery images={images} />
        <Loader />
        <Toast rtl />
        {total > 12 && <Button onClick={loadMore} />}
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchQuery} />
        <ErrorMessage message={error.message} />
        <Toast rtl />
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={searchQuery} />
        <ImageGallery images={images} />
        <Toast rtl />
        {total > 12 && total > images.length && <Button loadMore={loadMore} />}
      </div>
    );
  }
}
export { App };
