import React from 'react';
import styles from './styles.module.css';

export default function HomepageWhat() {
  return (
    <section className={styles.features}>
      <div className="container">
        <h1 style={{ textAlign: 'center' }}>What is StenBot?</h1>
        <p style={{ textAlign: 'center', fontSize: '26px' }}>
          StenBot is a public multifunctional Discord bot that has features such as moderation, ticketing, and more! StenBot allows for you to have control over your server and customise it to how you'd like it to work for you.
        </p>
      </div>
    </section>
  );
}