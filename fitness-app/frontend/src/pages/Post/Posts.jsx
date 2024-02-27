// Post.jsx
import React from 'react';

const Post = ({ post }) => {
  // Destructure post details
  const {
    title,
    description,
    date,
    location,
    categories,
    participantCount,
    images,
    tags,
  } = post;

  // Format the date
  const eventDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="post">
      <h2>{title}</h2>
      {images && images.length > 0 && (
        <div className="post-images">
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Event ${title}`} />
          ))}
        </div>
      )}
      <p>{description}</p>
      <p><strong>Date:</strong> {eventDate}</p>
      <p><strong>Location:</strong> {location}</p>
      <p><strong>Categories:</strong> {categories.join(', ')}</p>
      <p><strong>Participants:</strong> {participantCount}</p>
      {tags && tags.length > 0 && (
        <div className="post-tags">
          <strong>Tags:</strong> {tags.join(', ')}
        </div>
      )}
    </div>
  );
};

export default Post;
