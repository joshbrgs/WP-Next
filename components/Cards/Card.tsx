/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { CardProps } from 'typings/global';
import Heading from '../UI/Heading';

function Card({
  name = '',
  id,
  image,
  description,
  level = 'h4',
}: CardProps): JSX.Element {
  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(id && { id })}
      className="flex lg:justify-center items-center mt-8 z-40 flex-col mb-16 mx-12 lg:mx-32"
    >
      <img src={image} alt="profile" className="md:w-4/5 lg:w-3/5" />
      <Heading className="uppercase text-xl py-6" level={level}>
        {name}
      </Heading>
      <p className="leading-6">{description}</p>
    </div>
  );
}

export default Card;
