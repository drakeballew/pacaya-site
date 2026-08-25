import { type Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { List, ListItem } from '@/components/List'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { Testimonial } from '@/components/Testimonial'
import logoUnicornFormsLight from '@/images/clients/unicornforms/logo-light.svg'
import logoUnicornFormsDark from '@/images/clients/unicornforms/logo-dark.svg'
import logoKaratLight from '@/images/clients/karat/logo-light.svg'
import logoKaratDark from '@/images/clients/karat/logo-dark.svg'
import logoFiverrLight from '@/images/clients/fiverr/logomark-dark.svg'
import logoFiverrDark from '@/images/clients/fiverr/logo-dark.svg'
import logoDeficitLight from '@/images/clients/deficit/deficit-logo-light.svg'
import logoDeficitDark from '@/images/clients/deficit/deficit-logo-dark.svg'
import logoOpenRecipeLight from '@/images/clients/openrecipe/openrecipe-dark.svg'
import logoOpenRecipeDark from '@/images/clients/openrecipe/openrecipe-dark.svg'
import logoKivaDark from '@/images/clients/kiva/logo-dark.svg'
import logoOutdoorsyDark from '@/images/clients/outdoorsy/logo-dark.svg'
import logoItalicDark from '@/images/clients/italic/logo-dark.svg'
import logoLeToteDark from '@/images/clients/letote/logo-dark.svg'
import logoOlarkDark from '@/images/clients/olark/logo-dark.svg'
import logoSpeakDark from '@/images/clients/speak/logo-dark.svg'
import imageLaptop from '@/images/laptop.jpg'
import { type CaseStudy, type MDXEntry, loadCaseStudies } from '@/lib/mdx'

const clients = [
  // ['Deficit', logoDeficitDark],
  // ['OpenRecipe', logoOpenRecipeDark],
  ['Fiverr', logoFiverrDark],
  ['UnicornForms', logoUnicornFormsDark],
  ['Karat', logoKaratDark],
  ['Kiva', logoKivaDark],
  ['Outdoorsy', logoOutdoorsyDark],
  ['Italic', logoItalicDark],
  ['LeTote', logoLeToteDark],
  ['Speak', logoSpeakDark],
]

function Clients() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-20 sm:mt-32 sm:py-32 lg:mt-56">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-sm font-semibold tracking-wider text-white sm:text-left">
            We’ve worked with dozeds of amazing clients:
          </h2>
          <div className="h-px flex-auto bg-neutral-800" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4"
          >
            {clients.map(([client, logo]) => (
              <li key={client}>
                <FadeIn>
                  <Image src={logo} alt={client} unoptimized />
                </FadeIn>
              </li>
            ))}
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  )
}

function CaseStudies({
  caseStudies,
}: {
  caseStudies: Array<MDXEntry<CaseStudy>>
}) {
  return (
    <>
      <SectionIntro
        title="Engineering & Marketing solutions"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          Bespoke digital growth solutions, from full-stack app development to Product solutions without the overhead.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <FadeInStagger className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {caseStudies.map((caseStudy) => (
            <FadeIn key={caseStudy.href} className="flex">
              <article className="relative flex w-full flex-col rounded-3xl p-6 ring-1 ring-neutral-950/5 transition hover:bg-neutral-50 sm:p-8">
                <h3>
                  <Link href={caseStudy.href}>
                    <span className="absolute inset-0 rounded-3xl" />
                    <Image
                      src={caseStudy.logo}
                      alt={caseStudy.client}
                      className="h-16 w-16"
                      unoptimized
                    />
                  </Link>
                </h3>
                <p className="mt-6 flex gap-x-2 text-sm text-neutral-950">
                  <time
                    dateTime={caseStudy.date.split('-')[0]}
                    className="font-semibold"
                  >
                    {caseStudy.date.split('-')[0]}
                  </time>
                  <span className="text-neutral-300" aria-hidden="true">
                    /
                  </span>
                  <span>{caseStudy.service}</span>
                </p>
                <p className="mt-6 font-display text-2xl font-semibold text-neutral-950">
                  {caseStudy.title}
                </p>
                <p className="mt-4 text-base text-neutral-600">
                  {caseStudy.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </>
  )
}

function Services() {
  return (
    <>
      <SectionIntro
        eyebrow="Services"
        title="Build your product, then scale the digital side of your business."
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p>
          From product development to growth strategies, we have the expertise and experience
          to help you build and grow your small business.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
              <StylizedImage
                src={imageLaptop}
                sizes="(min-width: 1024px) 41rem, 31rem"
                className="justify-center lg:justify-end"
              />
            </FadeIn>
          </div>
          <List className="mt-16 lg:mt-0 lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItem title="Full-Stack Product Development">
              Build fully-featured applications across iOS, Android, and web.
            </ListItem>
            <ListItem title="Growth & Marketing">
              Market your product to your target audience and drive revenue growth.
            </ListItem>
            <ListItem title="Data & Analytics">
              Craft solutions that ensure you are able 
              to answer your most pressing questions and uncover new opportunities.
            </ListItem>
          </List>
        </div>
      </Container>
    </>
  )
}

export const metadata: Metadata = {
  description:
    'Full-Stack Product Development for Small Business - Pacaya is a growth studio that helps small businesses build, test, market, and scale their apps across web and mobile.',
}

export default async function Home() {
  let caseStudies = (await loadCaseStudies("published")).slice(0, 3)

  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <FadeIn className="max-w-3xl">
          <h1 className="font-display text-5xl font-medium tracking-tight text-neutral-950 [text-wrap:balance] sm:text-7xl">
            Full-Stack Product Development for Small Business
          </h1>
          <p className="mt-6 text-xl text-neutral-600">
            Pacaya is a growth studio that helps small businesses build, test, market, and scale their apps across web and mobile.
          </p>
        </FadeIn>
      </Container>

      <Clients />

      <CaseStudies caseStudies={caseStudies} />

      <Testimonial
        className="mt-24 sm:mt-32 lg:mt-40"
        client={{ name: 'UnicornForms', logo: logoUnicornFormsLight }}
      >
        Pacaya truly understands zero, idea, and early-revenue small businesses and can help them progress with metrics and data that demonstrate product market fit.
      </Testimonial>

      <Services />

      <ContactSection />
    </>
  )
}
