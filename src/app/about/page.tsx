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
<<<<<<< HEAD
import imageAngelaFisher from '@/images/team/angela-fisher.jpg'
import imageBenjaminRussel from '@/images/team/benjamin-russel.jpg'
import imageBlakeReid from '@/images/team/blake-reid.jpg'
import imageChelseaHagon from '@/images/team/chelsea-hagon.jpg'
import imageDriesVincent from '@/images/team/dries-vincent.jpg'
import imageEmmaDorsey from '@/images/team/emma-dorsey.jpg'
import imageJeffreyWebb from '@/images/team/jeffrey-webb.jpg'
import imageKathrynMurphy from '@/images/team/kathryn-murphy.jpg'
import imageLeonardKrasner from '@/images/team/leonard-krasner.jpg'
import imageLeslieAlexander from '@/images/team/leslie-alexander.jpg'
import imageMichaelFoster from '@/images/team/michael-foster.jpg'
import imageWhitneyFrancis from '@/images/team/whitney-francis.jpg'
=======
import imageDrakeBallew from '@/images/team/drake-ballew.jpg'
import imageAkira from '@/images/team/akira.jpg'
import imageLeeloo from '@/images/team/leeloo.jpg'

>>>>>>> Add status to project posts and blog articles
import { loadArticles } from '@/lib/mdx'

function Culture() {
  return (
    <div className="mt-24 rounded-4xl bg-neutral-950 py-24 sm:mt-32 lg:mt-40 lg:py-32">
      <SectionIntro
<<<<<<< HEAD
        eyebrow="Our culture"
        title="Balance your passion with your passion for life."
        invert
      >
        <p>
          We are a group of like-minded people who share the same core values.
=======
        eyebrow="Our beliefs"
        title="What good will you do today?"
        invert
      >
        <p>
        We see technology as an efficiency layer to improve meaningful relationships. Whether your product helps 
        keep businesses running, addresses loneliness in elderly pets, or draws carbon out of the atmosphere,
        we believe that technology is secondary to the problem you're solving, and the people and planet you're solving it for.
>>>>>>> Add status to project posts and blog articles
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Simplicity" invert>
<<<<<<< HEAD
            Our team has been with us since the beginning because none of them
            are allowed to have LinkedIn profiles.
          </GridListItem>
          <GridListItem title="Patience" invert>
            We don’t care when our team works just as long as they are working
            every waking second.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            You never know what someone is going through at home and we make
            sure to never find out.
=======
          We strive to deliver solutions that abstract away complexity and empowers the user to be creative.
          </GridListItem>
          <GridListItem title="Patience" invert>
            Solving problems with teamwork can be frustrating,
            and we aim to be a calm, positive presence as a partner.
          </GridListItem>
          <GridListItem title="Compassion" invert>
            Business is relationship. We listen, relate, and provide help for our clients and their customers.
>>>>>>> Add status to project posts and blog articles
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
<<<<<<< HEAD
        name: 'Leslie Alexander',
        role: 'Co-Founder / CEO',
        image: { src: imageLeslieAlexander },
      },
      {
        name: 'Michael Foster',
        role: 'Co-Founder / CTO',
        image: { src: imageMichaelFoster },
      },
      {
        name: 'Dries Vincent',
        role: 'Partner & Business Relations',
        image: { src: imageDriesVincent },
=======
        name: 'Drake Ballew',
        role: 'Founder / Operator',
        image: { src: imageDrakeBallew },
>>>>>>> Add status to project posts and blog articles
      },
    ],
  },
  {
    title: 'Team',
    people: [
      {
<<<<<<< HEAD
        name: 'Chelsea Hagon',
        role: 'Senior Developer',
        image: { src: imageChelseaHagon },
      },
      {
        name: 'Emma Dorsey',
        role: 'Senior Designer',
        image: { src: imageEmmaDorsey },
      },
      {
        name: 'Leonard Krasner',
        role: 'VP, User Experience',
        image: { src: imageLeonardKrasner },
      },
      {
        name: 'Blake Reid',
        role: 'Junior Copywriter',
        image: { src: imageBlakeReid },
      },
      {
        name: 'Kathryn Murphy',
        role: 'VP, Human Resources',
        image: { src: imageKathrynMurphy },
      },
      {
        name: 'Whitney Francis',
        role: 'Content Specialist',
        image: { src: imageWhitneyFrancis },
      },
      {
        name: 'Jeffrey Webb',
        role: 'Account Coordinator',
        image: { src: imageJeffreyWebb },
      },
      {
        name: 'Benjamin Russel',
        role: 'Senior Developer',
        image: { src: imageBenjaminRussel },
      },
      {
        name: 'Angela Fisher',
        role: 'Front-end Developer',
        image: { src: imageAngelaFisher },
=======
        name: 'Leeloo',
        role: 'Senior Hardware Inspector',
        image: { src: imageLeeloo },
      },
      {
        name: 'Akira',
        role: 'Quality Assurance Associate',
        image: { src: imageAkira },
>>>>>>> Add status to project posts and blog articles
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
<<<<<<< HEAD
    'We believe that our strength lies in our collaborative approach, which puts our clients at the center of everything we do.',
}

export default async function About() {
  let blogArticles = (await loadArticles()).slice(0, 2)

  return (
    <>
      <PageIntro eyebrow="About us" title="Our strength is collaboration">
        <p>
          We believe that our strength lies in our collaborative approach, which
          puts our clients at the center of everything we do.
        </p>
        <div className="mt-10 max-w-2xl space-y-6 text-base">
          <p>
            Studio was started by three friends who noticed that developer
            studios were charging clients double what an in-house team would
            cost. Since the beginning, we have been committed to doing things
            differently by charging triple instead.
          </p>
          <p>
            At Studio, we’re more than just colleagues — we’re a family. This
            means we pay very little and expect people to work late. We want our
            employees to bring their whole selves to work. In return, we just
            ask that they keep themselves there until at least 6:30pm.
=======
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
            While it hasn't always been the smoothest ride, in the 7+ years since, we've managed to help dozens of clients grow their businesses.
            From building out sales and marketing automations to designing and developing websites, we've done it all and are excited to help you next.
>>>>>>> Add status to project posts and blog articles
          </p>
        </div>
      </PageIntro>
      <Container className="mt-16">
        <StatList>
<<<<<<< HEAD
          <StatListItem value="35" label="Underpaid employees" />
          <StatListItem value="52" label="Placated clients" />
          <StatListItem value="$25M" label="Invoices billed" />
=======
          <StatListItem value="1" label="Underpaid employees" />
          <StatListItem value="2" label="Furballs" />
          <StatListItem value="0" label="Vacation days" />
>>>>>>> Add status to project posts and blog articles
        </StatList>
      </Container>

      <Culture />

      <Team />

      <PageLinks
        className="mt-24 sm:mt-32 lg:mt-40"
        title="From the blog"
<<<<<<< HEAD
        intro="Our team of experienced designers and developers has just one thing on their mind; working on your ideas to draw a smile on the face of your users worldwide. From conducting Brand Sprints to UX Design."
=======
        intro="We often write guides and articles to help you better understand a problem or solution, in case you can solve it yourself."
>>>>>>> Add status to project posts and blog articles
        pages={blogArticles}
      />

      <ContactSection />
    </>
  )
}
