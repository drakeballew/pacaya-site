import { type Metadata } from 'next'
import Link from 'next/link'

import { Border } from '@/components/Border'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { SocialMedia } from '@/components/SocialMedia'
import { ContactForm } from '@/components/ContactForm'

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

function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-base font-semibold text-neutral-950">
        Physical Address.
      </h2>

      <Offices className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2" />
    </FadeIn>
  )
}

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Tell us about your project. We look forward to hearing from you.',
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact us" title="Tell us about your project">
        <p>We look forward to hearing from you.</p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  )
}
