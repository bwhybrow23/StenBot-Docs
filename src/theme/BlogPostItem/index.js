import React from 'react';
import clsx from 'clsx';
import BlogPostItemHeader from '@theme/BlogPostItem/Header';
import BlogPostItemContent from '@theme/BlogPostItem/Content';
import BlogPostItemFooter from '@theme/BlogPostItem/Footer';

export default function BlogPostItem(props) {
  const {isBlogPostPage} = props;
  if (isBlogPostPage) {
    return (
      <article>
        <BlogPostItemHeader {...props} />
        <BlogPostItemContent {...props} />
        <BlogPostItemFooter {...props} />
      </article>
    );
  }

  return (
    <article className={clsx('card', 'blogCard')}>
      <div className="card__body">
        <BlogPostItemHeader {...props} />
        <BlogPostItemContent {...props} />
      </div>
      <div className="card__footer">
        <BlogPostItemFooter {...props} />
      </div>
    </article>
  );
}

