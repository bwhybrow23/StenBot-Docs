import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageWhy from '@site/src/components/HomepageFeatures/why';
import HomepageWhat from '@site/src/components/HomepageFeatures/what';
import Heading from '@theme/Heading';
import { Icon } from '@iconify/react/dist/iconify.js';

import styles from './index.module.css';

function Hero() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx(styles.hero)}>
      <div className={clsx('container', styles.heroGrid)}>
        <div>
          {/* <div className={styles.eyebrow}>
            <Icon icon="tabler:sparkles" height="18" />
            New: Modernized docs with quick start
          </div> */}
          <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
          <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
          <div className={styles.ctaRow}>
            <Link className="button button--primary button--lg" to="/docs/home">
              Get Started
            </Link>
            <Link className="button button--secondary button--lg" to="https://sbinvite.benwhybrow.com">
              Invite StenBot
            </Link>
            <Link className={styles.secondaryLink} to="/changelog">
              <Icon icon="tabler:timeline" />
              Changelog
            </Link>
          </div>
        </div>
        <div className={styles.shotGrid}>
          {/* <div className={styles.shotFrame}>
            <img src="/img/auth-select-server.png" alt="Select server screenshot" loading="lazy" />
          </div> */}
          <div className={styles.shotFrame}>
            <img src="/img/auth-check-perms.png" alt="Check permissions screenshot" loading="lazy" />
          </div>
        </div>
      </div>
      <div className={styles.bgBlobA} />
      <div className={styles.bgBlobB} />
    </header>
  );
}

function QuickStart() {
  return (
    <section className={clsx('container', styles.section)}>
      <div className="row">
        <div className="col col--12" style={{textAlign: 'center'}}>
          <Heading as="h2">Quick Start</Heading>
          <p className="text-muted">Invite, configure, and explore modules in minutes.</p>
        </div>
      </div>
      <div className={styles.stepsGrid}>
        <div className={clsx('card', styles.stepCard)}>
          <div className="card__body">
            <div className={styles.stepNum}>1</div>
            <Heading as="h3">Invite StenBot</Heading>
            <p className="text-muted">Add StenBot to your server with the right permissions.</p>
            <Link to="https://sbinvite.benwhybrow.com">Invite →</Link>
          </div>
        </div>
        <div className={clsx('card', styles.stepCard)}>
          <div className="card__body">
            <div className={styles.stepNum}>2</div>
            <Heading as="h3">Configure Basics</Heading>
            <p className="text-muted">Set up moderation, ticketing and core preferences.</p>
            <Link to="/docs/setup/configuration">Configuration →</Link>
          </div>
        </div>
        <div className={clsx('card', styles.stepCard)}>
          <div className="card__body">
            <div className={styles.stepNum}>3</div>
            <Heading as="h3">Explore Modules</Heading>
            <p className="text-muted">Discover advanced features tailored to your server.</p>
            <Link to="/docs/home">Browse docs →</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout title="Home" description="StenBot is a public multifunctional Discord bot that has features like moderation, ticketing and more!">
      <Hero />
      <main>
        <QuickStart />
        <HomepageWhat />
        <HomepageWhy />
      </main>
    </Layout>
  );
}
