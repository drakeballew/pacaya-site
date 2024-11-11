import { useId } from 'react'
import clsx from 'clsx'

export function Logomark({
  invert = false,
  filled = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
}) {
  let id = useId()

  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" shapeRendering="crispEdges" {...props}>
      <rect
        clipPath={`url(#${id}-clip)`}
        className={clsx(
          'h-8 transition-all duration-300',
          invert ? 'fill-white' : 'fill-neutral-950',
          filled ? 'w-8' : 'w-0 group-hover/logo:w-8',
        )}
      />
      <use
        href={`#${id}-path`}
        className={invert ? 'stroke-white' : 'stroke-neutral-950'}
        fill="none"
        strokeWidth="1.2"
      />
      <defs>
        <path
          id={`${id}-path`}
          d="M4.5,18.2h0c2,0,3.5,1.5,3.5,3.4v6.2c0,1.9-1.6,3.4-3.5,3.4h0c-2,0-3.5-1.5-3.5-3.4v-6.2c0-1.9,1.6-3.4,3.5-3.4Z
          M16,.8h0c2,0,3.5,1.5,3.5,3.4v23.7c0,1.9-1.6,3.4-3.5,3.4h0c-2,0-3.5-1.5-3.5-3.4V4.1c0-1.9,1.6-3.4,3.5-3.4Z
          M27.5,7.7h0c2,0,3.5,1.5,3.5,3.4v16.6c0,1.9-1.6,3.4-3.5,3.4h0c-2,0-3.5-1.5-3.5-3.4V11.2c0-1.9,1.6-3.4,3.5-3.4Z"
        />
        <clipPath id={`${id}-clip`}>
          <use href={`#${id}-path`} />
        </clipPath>
      </defs>
    </svg>
  )
}

export function Logo({
  className,
  invert = false,
  filled = false,
  fillOnHover = false,
  ...props
}: React.ComponentPropsWithoutRef<'svg'> & {
  invert?: boolean
  filled?: boolean
  fillOnHover?: boolean
}) {
  return (
    <svg
      viewBox="0 0 130 32"
      aria-hidden="true"
      className={clsx(fillOnHover && 'group/logo', className)}
      {...props}
    >
      <Logomark
        preserveAspectRatio="xMinYMid meet"
        invert={invert}
        filled={filled}
      />
      <path
        className={invert ? 'fill-white' : 'fill-neutral-950'}
        d="
    M44.93,10.48h6.97c3.59,0,5.93,1.98,5.93,5.4s-2.21,5.47-5.93,5.47l-3.93-.02v5.91h-3.04V10.48ZM47.97,13.07v5.86l3.43.02c1.89,0,3.33-.85,3.33-2.97s-1.45-2.92-3.33-2.92h-3.43Z
    M59.05,21.12c0-4.16,1.98-6.35,4.92-6.35,1.98,0,3.45.99,4.05,2.48h.16l.12-2.25h2.76v12.23h-2.88v-2.28h-.16c-.6,1.49-2.07,2.48-4.05,2.48-2.94,0-4.92-2.18-4.92-6.32ZM68.14,21.74v-1.27c0-1.75-1.04-3.36-3.08-3.36-1.84,0-3.08,1.31-3.08,4s1.24,3.98,3.08,3.98c2.05,0,3.08-1.63,3.08-3.36Z
    M73.25,21.12c0-3.82,2.39-6.35,6.09-6.35,3.08,0,5.29,1.86,5.45,4.55h-2.81c-.25-1.43-1.33-2.18-2.71-2.18-2.02,0-3.13,1.59-3.13,3.98,0,2.6,1.24,3.96,3.1,3.96,1.59,0,2.62-.92,2.78-2.28h2.8c-.18,2.83-2.46,4.65-5.59,4.65-3.63,0-6-2.51-6-6.32Z
    M86.31,21.12c0-4.16,1.98-6.35,4.92-6.35,1.98,0,3.45.99,4.05,2.48h.16l.11-2.25h2.76v12.23h-2.87v-2.28h-.16c-.6,1.49-2.07,2.48-4.05,2.48-2.94,0-4.92-2.18-4.92-6.32ZM95.39,21.74v-1.27c0-1.75-1.04-3.36-3.08-3.36-1.84,0-3.08,1.31-3.08,4s1.24,3.98,3.08,3.98c2.05,0,3.08-1.63,3.08-3.36Z
    M100.82,28.71h1.36c1.06,0,1.61-.41,1.96-1.33l.41-1.06-4.74-11.31h3.15l2.51,6.99.46,1.38h.12l.41-1.38,2.37-6.99h3.06l-4.94,13.04c-.85,2.35-2.21,3.04-4.23,3.04h-1.89v-2.37Z
    M112.35,21.12c0-4.16,1.98-6.35,4.92-6.35,1.98,0,3.45.99,4.05,2.48h.16l.11-2.25h2.76v12.23h-2.87v-2.28h-.16c-.6,1.49-2.07,2.48-4.05,2.48-2.94,0-4.92-2.18-4.92-6.32ZM121.43,21.74v-1.27c0-1.75-1.04-3.36-3.08-3.36-1.84,0-3.08,1.31-3.08,4s1.24,3.98,3.08,3.98c2.05,0,3.08-1.63,3.08-3.36Z
    M127.11,24.48h2.78v2.76h-2.78v-2.76Z
  "
      />
    </svg>
  )
}
