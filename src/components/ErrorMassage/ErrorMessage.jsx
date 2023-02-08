import PropTypes from 'prop-types';
import imgError from './imgError.jpg';
import css from './ErrorMessage.module.css';
export const ErrorMessage = ({ message }) => {
  return (
    <div className={css.errorBox}>
      <span className={css.errorText}>{message}</span>
      <img src={imgError} alt="" width="1000px" />
    </div>
  );
};
ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
