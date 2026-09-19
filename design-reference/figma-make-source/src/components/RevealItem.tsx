import { useReveal } from '../hooks/useReveal'

interface RevealItemProps {
  children: React.ReactNode
  delay?: 0 | 1 | 2 | 3 | 4 | 5
  style?: React.CSSProperties
  className?: string
  onClick?: () => void
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  'data-cursor'?: string
}

export default function RevealItem({ children, delay, style, className = '', onClick, onMouseEnter, onMouseLeave, 'data-cursor': dataCursor }: RevealItemProps) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className={`reveal${delay !== undefined ? ` reveal-delay-${delay}` : ''} ${className}`}
      style={style}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data-cursor={dataCursor}
    >
      {children}
    </div>
  )
}
