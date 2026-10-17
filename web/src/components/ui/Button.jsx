import { Link } from 'react-router-dom'

/**
 * Button-styled link or button. Internal paths render a router <Link>,
 * external/tel/mailto URLs an <a>, and no `to`/`href` a <button>.
 */
export default function Button({ to, href, variant = 'primary', size, icon: Icon, iconEnd: IconEnd, children, className = '', ...rest }) {
  const classes = ['btn', `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(' ')
  const content = (
    <>
      {Icon && <Icon aria-hidden="true" size={18} strokeWidth={2.2} />}
      <span>{children}</span>
      {IconEnd && <IconEnd aria-hidden="true" size={18} strokeWidth={2.2} className="btn__end" />}
    </>
  )

  if (to) return <Link to={to} className={classes} {...rest}>{content}</Link>
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    )
  }
  return <button type="button" className={classes} {...rest}>{content}</button>
}
