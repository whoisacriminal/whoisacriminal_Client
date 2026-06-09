import './EnterHint.css'

export default function EnterHint({ children = 'Enter 키를 눌러 다음으로' }) {
  return (
    <p className="enter-hint" aria-label={children}>
      {children}
    </p>
  )
}
