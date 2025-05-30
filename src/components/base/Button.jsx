import styles from './Button.module.css';
import PropTypes from 'prop-types';
import clsx from 'clsx';

const Button = ({ text, backgroundColor, type = 'button', rounded = false , onClick }) => {
  return (
    <button
      type={type}
      className={clsx(styles.button, rounded && styles.rounded)}
      style={{ backgroundColor }}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
Button.propTypes = {
  text: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  rounded: PropTypes.bool,
};
export default Button;