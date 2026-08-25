import Link from 'next/link'

import { Border } from '@/components/Border'
import { SocialMedia } from '@/components/SocialMedia'

/* Preserved for a future contact-page restore. */
export function EmailUs() {
  return (
    <Border className="mt-16 pt-16">
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Email us
      </h2>
      <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
        {[
          ['Careers', 'careers@pacaya.io'],
          ['Press', 'press@pacaya.io'],
        ].map(([label, email]) => (
          <div key={email}>
            <dt className="font-semibold text-neutral-950">{label}</dt>
            <dd>
              <Link
                href={`mailto:${email}`}
                className="text-neutral-600 hover:text-neutral-950"
              >
                {email}
              </Link>
            </dd>
          </div>
        ))}
      </dl>
    </Border>
  )
}

/* Preserved for a future contact-page restore. */
export function FollowUs() {
  return (
    <Border className="mt-16 pt-16">
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Follow us
      </h2>
      <SocialMedia className="mt-6" />
    </Border>
  )
}
