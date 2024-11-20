import { type Metadata } from 'next'
import Image from 'next/image'

import { Border } from '@/components/Border'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn, FadeInStagger } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { PageIntro } from '@/components/PageIntro'
import { PageLinks } from '@/components/PageLinks'
import { SectionIntro } from '@/components/SectionIntro'
import { StatList, StatListItem } from '@/components/StatList'
import imageDrakeBallew from '@/images/team/drake-ballew.jpg'
import imageAkira from '@/images/team/akira.jpg'
import imageLeeloo from '@/images/team/leeloo.jpg'

import { loadArticles } from '@/lib/mdx'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
        eyebrow="Our beliefs"
        title="What good will you do today?"
        invert
      >
        <p>
        We see technology as an efficiency layer to improve meaningful relationships. Whether your product helps 
        keep businesses running, addresses loneliness in elderly pets, or draws carbon out of the atmosphere,
        we believe that technology is secondary to the problem you&apos;re solving, and the people and planet you&apos;re solving it for.
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Simplicity" invert>
          We strive to deliver solutions that abstract away complexity and empower user creativity.
          </GridListItem>
          <GridListItem title="Patience" invert>
            Solving problems with teamwork can be frustrating.
            We aim to be a calm, positive presence as a partner.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            Business is relationship. We listen, relate, and provide help for our clients and their customers.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

const team = [
  {
    title: 'Leadership',
    people: [
      {
        name: 'Drake Ballew',
        role: 'Founder / Operator',
        image: { src: imageDrakeBallew },
      },
    ],
  },
  {
    title: 'Team',
    people: [
      {
        name: 'Leeloo',
        role: 'Senior Hardware Inspector',
        image: { src: imageLeeloo },
      },
      {
        name: 'Akira',
        role: 'Quality Assurance Associate',
        image: { src: imageAkira },
      },
    ],
  },
]

function Team() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <div className="space-y-24">
        {team.map((group) => (
          <FadeInStagger key={group.title}>
            <Border as={FadeIn} />
            <div className="grid grid-cols-1 gap-6 pt-12 sm:pt-16 lg:grid-cols-4 xl:gap-8">
              <FadeIn>
                <h2 className="font-display text-2xl font-semibold text-neutral-950">
                  {group.title}
                </h2>
              </FadeIn>
              <div className="lg:col-span-3">
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8"
                >
                  {group.people.map((person) => (
                    <li key={person.name}>
                      <FadeIn>
                        <div className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                          <Image
                            alt=""
                            {...person.image}
                            className="h-96 w-full object-cover grayscale transition duration-500 motion-safe:group-hover:scale-105"
                          />
                          <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black to-black/0 to-40% p-6">
                            <p className="font-display text-base/6 font-semibold tracking-wide text-white">
                              {person.name}
                            </p>
                            <p className="mt-2 text-sm text-white">
                              {person.role}
                            </p>
                          </div>
                        </div>
                      </FadeIn>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeInStagger>
        ))}
      </div>
    </Container>
  )
}

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Experienced, curious operators.',
}

export default async function About() {
  let blogArticles = (await loadArticles("published")).slice(0, 2)

  return (
    <>
      <PageIntro eyebrow="About us" title="Experienced, curious operators">
        <p>
          Growth is the result of hundreds upon hundreds of compounded learnings.
          We help you learn efficiently and teach your team best practices along the way.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Pacaya Digital was started in desperation in May 2017 after a three month backpacking trip through Central America.
            Broke, unemployed, and living in a converted San Francisco mudroom, Drake decided the best thing to do was to start a business as his
            primary source of income. He had no experience, no clients, and only the vaguest idea of what he was doing.
          </p>
          <p>
            While it hasn&apos;t always been the smoothest ride, in the 7+ years since, we&apos;ve managed to help dozens of clients grow their businesses.
            From building out sales and marketing automations to designing and developing websites, we&apos;ve done it all and are excited to help you next.
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
          <StatListItem value="1" label="Underpaid employees" />
          <StatListItem value="2" label="Furballs" />
          <StatListItem value="0" label="Vacation days" />
        </StatList>
      </Container>

      <Culture />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
        intro="We often write guides and articles to help you better understand a problem or solution, in case you can solve it yourself."
        pages={blogArticles}
      />

      <ContactSection />
    </>
  )
}
