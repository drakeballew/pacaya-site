import { type Metadata } from 'next'

import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { Offices } from '@/components/Offices'
import { PageIntro } from '@/components/PageIntro'
import { ContactForm } from '@/components/ContactForm'

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
