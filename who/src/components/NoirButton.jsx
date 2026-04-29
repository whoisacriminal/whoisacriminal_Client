import './NoirButton.css'

export default function NoirButton({ variant, className = '', children, ...props }) {
  const cls = ['noir-btn', variant ? `noir-btn--${variant}` : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  )
}
