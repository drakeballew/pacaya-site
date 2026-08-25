import clsx from 'clsx'

function WebIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.25" />
      <ellipse
        cx="12"
        cy="12"
        rx="3.5"
        ry="9"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M3 12h18"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IosIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zm3.378-3.066c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.56-1.702z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function AndroidIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 17v-3.5a7 7 0 0 1 14 0V17"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M8.2 7.4 6.6 4.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M15.8 7.4 17.4 4.8"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <circle cx="9" cy="13.75" r="0.85" fill="currentColor" />
      <circle cx="15" cy="13.75" r="0.85" fill="currentColor" />
    </svg>
  )
}

export const platformOptions = [
  { id: 'web' as const, name: 'Web', icon: WebIcon },
  { id: 'ios' as const, name: 'iOS', icon: IosIcon },
  { id: 'android' as const, name: 'Android', icon: AndroidIcon },
]

export function Platforms({
  className,
  invert = false,
}: {
  className?: string
  invert?: boolean
}) {
  return (
    <ul
      role="list"
      aria-label="Platforms"
      className={clsx(
        'flex items-center gap-x-5',
        invert ? 'text-white/40' : 'text-neutral-400',
        className,
      )}
    >
      {platformOptions.map(({ name, icon: Icon }) => (
        <li key={name}>
          <Icon className="h-5 w-5" />
          <span className="sr-only">{name}</span>
        </li>
      ))}
    </ul>
  )
}
