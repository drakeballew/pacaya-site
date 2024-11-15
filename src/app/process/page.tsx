import { type Metadata } from 'next'

import { Blockquote } from '@/components/Blockquote'
import { ContactSection } from '@/components/ContactSection'
import { Container } from '@/components/Container'
import { FadeIn } from '@/components/FadeIn'
import { GridList, GridListItem } from '@/components/GridList'
import { GridPattern } from '@/components/GridPattern'
import { List, ListItem } from '@/components/List'
import { PageIntro } from '@/components/PageIntro'
import { SectionIntro } from '@/components/SectionIntro'
import { StylizedImage } from '@/components/StylizedImage'
import { TagList, TagListItem } from '@/components/TagList'
import imageLaptop from '@/images/laptop.jpg'
import imageMeeting from '@/images/meeting.jpg'
import imageWhiteboard from '@/images/whiteboard.jpg'

function Section({
  title,
  image,
  children,
}: {
  title: string
  image: React.ComponentPropsWithoutRef<typeof StylizedImage>
  children: React.ReactNode
}) {
  return (
    <Container className="group/section [counter-increment:section]">
      <div className="lg:flex lg:items-center lg:justify-end lg:gap-x-8 lg:group-even/section:justify-start xl:gap-x-20">
        <div className="flex justify-center">
          <FadeIn className="w-[33.75rem] flex-none lg:w-[45rem]">
            <StylizedImage
              {...image}
              sizes="(min-width: 1024px) 41rem, 31rem"
              className="justify-center lg:justify-end lg:group-even/section:justify-start"
            />
          </FadeIn>
        </div>
        <div className="mt-12 lg:mt-0 lg:w-[37rem] lg:flex-none lg:group-even/section:order-first">
          <FadeIn>
            <div
              className="font-display text-base font-semibold before:text-neutral-300 before:content-['/_'] after:text-neutral-950 after:content-[counter(section,decimal-leading-zero)]"
              aria-hidden="true"
            />
            <h2 className="mt-2 font-display text-3xl font-medium tracking-tight text-neutral-950 sm:text-4xl">
              {title}
            </h2>
            <div className="mt-6">{children}</div>
          </FadeIn>
        </div>
      </div>
    </Container>
  )
}

function Discover() {
  return (
    <Section title="Discover" image={{ src: imageWhiteboard }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          We typically embed ourselves in clients' everyday operations in order to understand their{' '}
          <strong className="font-semibold text-neutral-950">needs</strong> and
          goals, and what it will take to achieve them.
        </p>
        <p>
          Once we have a sense of an engagement's scope, we report back with an {' '}
          <strong className="font-semibold text-neutral-950">action plan</strong> and proposed budget.
        </p>
        <p>
        Importantly, if we find we are not the best fit for your project, we will tell you and provide an alternative recommendation.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Systems review</TagListItem>
        <TagListItem>Project scope</TagListItem>
        <TagListItem>Budget proposal</TagListItem>
      </TagList>
    </Section>
  )
}

function Build() {
  return (
    <Section title="Build" image={{ src: imageLaptop, shape: 1 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          From the Discovery phase, we develop a <strong className="font-semibold text-neutral-950">project roadmap</strong> and start working towards delivery. The roadmap is a living document that we update as we progress.
        </p>
        <p>
          Each client is provided a <strong className="font-semibold text-neutral-950">private Slack channel</strong> where they can ask questions and provide feedback. We generally respond to messages within a few minutes, but it can be up to 24 hours depending on when they are received.
        </p>
        <p>
          We also have  <strong className="font-semibold text-neutral-950">weekly check-ins</strong> to ensure we are on track and to discuss any changes that may have come up.
        </p>
      </div>

      <Blockquote
        author={{ name: 'Patrick Waldo', role: 'CEO of UnicornForms' }}
        className="mt-12"
      >
        Pacaya was so regular with their progress updates we almost began to
        think they were automated!
      </Blockquote>
      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <TagList className="mt-4">
        <TagListItem>Project roadmap</TagListItem>
        <TagListItem>Slack channel</TagListItem>
        <TagListItem>Weekly check-in</TagListItem>
      </TagList>
    </Section>
  )
}

function Deliver() {
  return (
    <Section title="Deliver" image={{ src: imageMeeting, shape: 2 }}>
      <div className="space-y-6 text-base text-neutral-600">
        <p>
          As the end of the Build phase approaches, we begin to prepare for {' '}<strong className="font-semibold text-neutral-950">Delivery</strong>{' '}. 
          In this phase, we conduct a final review of the project to ensure it meets the client's needs.
        </p>
        <p>
          Finally, we <strong className="font-semibold text-neutral-950">handoff</strong> of the project to the client, including all necessary files and documentation, and provide a limited support period to ensure the project is stable.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-neutral-950">
        Included in this phase
      </h3>
      <List className="mt-8">
        <ListItem title="Testing">
          We work with clients' stakeholders to ensure the project fulfills requirements and will not suffer from future edge cases.
        </ListItem>
        <ListItem title="Documentation">
          We provide detailed documentation of the project, including all code and design files, to ensure the client can maintain the project in the future.
        </ListItem>
        <ListItem title="Limited Support">
          After handoff, we provide two weeks of limited support for the project to ensure that we did not overlook any important details during the build phase.
        </ListItem>
      </List>
    </Section>
  )
}

function Values() {
  return (
    <div className="relative mt-24 pt-24 sm:mt-32 sm:pt-32 lg:mt-40 lg:pt-40">
      <div className="absolute inset-x-0 top-0 -z-10 h-[884px] overflow-hidden rounded-t-4xl bg-gradient-to-b from-neutral-50">
        <GridPattern
          className="absolute inset-0 h-full w-full fill-neutral-100 stroke-neutral-950/5 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)]"
          yOffset={-270}
        />
      </div>

      <SectionIntro
        eyebrow="Principles"
        title="Balancing reliability and curiosity"
      >
        <p>
          While experience is the best teacher, we believe in constantly learning and adapting to new technologies and methodologies. We strive to provide the best value to our clients by balancing our tried-and-true methods with a healthy dose of exploration.
        </p>
      </SectionIntro>

      <Container className="mt-24">
        <GridList>
          <GridListItem title="The score takes care of itself">
            Growth is a process. Do the little things right, and the result is inevitable.
          </GridListItem>
          <GridListItem title="Over-optimization is an enemy">
            Optimization is powerful, but can become a trap when applied incorrectly.
          </GridListItem>
          <GridListItem title="Be like water">
            Approach, emotions, and goals should be fluid and adaptable throughout the learning process.
          </GridListItem>
          <GridListItem title="Kindness wins">
            People rarely remember what you did, but always remember how you made them feel.
          </GridListItem>
          <GridListItem title="Actions > Words">
            Underpromise and overdeliver. Always.
          </GridListItem>
          <GridListItem title="Strive, seek, find, and not yield">
            Dedicated effort and enthusiasm are prerequisites of perseverance.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  )
}

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'We believe in efficiency and maximizing our resources to provide the best value to our clients.',
}

export default function Process() {
  return (
    <>
      <PageIntro eyebrow="Our process" title="How we work">
        <p>
          We leverage our experience to provide exceptional value to our clients, efficiently driving toward complete, maintainable solutions. 
          
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Discover />
        <Build />
        <Deliver />
      </div>

      <Values />

      <ContactSection />
    </>
  )
}
