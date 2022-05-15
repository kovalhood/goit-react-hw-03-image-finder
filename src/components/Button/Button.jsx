import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({text, buttonClick}) => {
    return <button className={s.button} type='button' onClick ={buttonClick}>{text}</button>
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Button;