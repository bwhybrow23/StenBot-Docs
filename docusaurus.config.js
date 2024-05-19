// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'StenBot',
  tagline: 'StenBot is a public multifunctional Discord bot that has features like moderation, ticketing and more!',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://stenbot.benwhybrow.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bwhybrow23', // Usually your GitHub org/user name.
  projectName: 'StenBot-Docs', // Usually your repo name.
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Plugins
  plugins: [
    'docusaurus-plugin-sass',
    // require.resolve('docusaurus-lunr-search'),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: ['./src/css/custom.scss'],
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'StenBot',
        logo: {
          alt: 'StenBot Icon',
          src: 'img/logo.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {to: '/blog', label: 'Blog', position: 'left'},
          {to: '/donate', label: 'Donate', position: 'left'},
          {to: '/changelog', label: 'Changelog', position: 'left'},
          {
            href: "https://github.com/bwhybrow23",
            position: "right",
            className: "github-link"
          },
          {
            href: "https://discord.benwhybrow.com",
            position: "right",
            className: "discord-link"
          },
        ],
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Useful Links',
            items: [
              {
                label: 'Documentation',
                to: '/docs/home',
              },
              {
                label: 'Privacy Policy',
                to: '/privacy',
              },
            ],
          },
          {
            title: 'Support',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.benwhybrow.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/bwhybrow23/StenBot',
              },
              {
                label: 'Website',
                href: 'https://benwhybrow.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Ben Whybrow. All rights reserved. | Powered by Docusaurus`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      metadata: [
        {name: 'og:site_name', content: 'StenBot'},
        {name: 'og:image', content: 'https://stenbot.benwhybrow.com/img/logo.png'},
        {name: 'og:type', content: 'website'},
      ]
    }),
};

export default config;
