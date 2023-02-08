import PropTypes from 'prop-types';

const URL =
  'https://pixabay.com/api/?key=31928578-c01e00a5ffcaa51fc02f8762c&image_type=photo&orientation=horizontal&safesearch=true';

export const perPage = 12;

export const imagesRequest = async (name, page) => {
  return fetch(`${URL}&q=${name}&page=${page}&per_page=${perPage}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
};

imagesRequest.propTypes = {
  name: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};
