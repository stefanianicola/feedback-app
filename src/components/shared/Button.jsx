import PropTypes from 'prop-types'

const Button = ({type, version, isDisabled, children}) => {
  return (
    <button className={`btn btn-${version}`} disabled={isDisabled} type={type}>
        {children}
        </button>
  )
}

Button.defaultProps = {
    type: 'button',
     version: 'secondary', 
     isDisabled: false
}

Button.propTypes = {
children: PropTypes.node.isRequired,
type: PropTypes.string,
version: PropTypes.string, 
isDisabled: PropTypes.bool
}

export default Button