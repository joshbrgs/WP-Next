/* eslint-disable react/no-danger */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { PopProps } from 'typings/global';
import Heading from '../Heading';

const PopOut = ({
  title,
  subTitle,
  headingLevel = 'h3',
  body,
  body2,
  body3,
  body4,
  id,
}: PopProps): JSX.Element => {
  return (
    <div
      {...(id && { id })}
      className="flex flex-col text-gray bg-white shadow-2xl p-8 z-40"
    >
      <div className="flex flex-col justify-center items-center py-8">
        <Heading
          className="uppercase font-rale text-lg cursor-default"
          level={headingLevel}
        >
          {title}
        </Heading>
        <Heading
          className="uppercase font-cochin text-3xl cursor-default"
          level={headingLevel}
        >
          {subTitle}
        </Heading>
      </div>
      <div className="space-y-4 px-24 cursor-default">
        <p
          className="space-y-6 leading-5"
          dangerouslySetInnerHTML={{
            __html: body ?? '',
          }}
        />
        <p>{body2}</p>
        <p>{body3}</p>
        <p>{body4}</p>
      </div>
    </div>
  );
};

export default PopOut;