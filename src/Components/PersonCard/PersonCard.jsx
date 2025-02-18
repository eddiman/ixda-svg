import React from 'react';
import styles from './PersonCard.module.scss';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../../api/sanityClient'; ;

const builder = imageUrlBuilder(sanityClient);
const urlFor = (source) => builder.image(source);

const PersonCard = ({ person }) => {
  const { name, title, businessName, photo } = person;

  return (
    <div className={styles.personCard}>
      <img src={urlFor(photo).width(500).height(500).url()} alt={name} className={styles.photo} />
      <div className={styles.textContainer}>

      <h2 className={styles.name}>{name}</h2>
      <p className={styles.title}>{title}</p>
      <p className={styles.business}>{businessName}</p>
      </div>
    </div>
  );
};

export default PersonCard;