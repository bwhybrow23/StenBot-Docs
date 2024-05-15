import React from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { Icon } from '@iconify/react/dist/iconify.js';
import Link from "@docusaurus/Link";

const FeatureList = [
  {
    title: 'Open Source',
    icon: 'tabler:brand-github',
    description: (
      <>
        StenBot is open source and all of the code is available on GitHub.
      </>
    ),
  },
  {
    title: 'Free to Use',
    icon: 'tabler:currency-pound-off',
    description: (
      <>
        StenBot is and always will be 100% free to use forever.
      </>
    )
  },
  {
    title: 'Customisable',
    icon: 'tabler:settings',
    description: (
      <>
        StenBot is highly customisable and allows you to change almost every aspect of the bot to suit your needs.
      </>
    ),
  },
  {
    title: 'Powered by Docker',
    icon: 'tabler:brand-docker',
    description: (
      <>
        StenBot is powered by Docker, meaning it's easy to install and run on any system. (if you choose to self-host)
      </>
    ),
  },
  {
    title: 'Feature Packed',
    icon: 'tabler:star',
    description: (
      <>
        StenBot is feature packed with moderation, ticketing, and more!
      </>
    )
  },
  {
    title: 'Small User Base',
    icon: 'tabler:users',
    description: (
      <>
        StenBot has a small user base, meaning you can get support quickly and easily.
      </>
    )
  },
];

function Feature({ title, icon, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Icon icon={icon} height="188px" width="188px"/>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageWhy() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>Why use StenBot?</h1>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
