import React, { FC } from 'react';

type HProps = {
    title: string;
    paragraph?: string;
};

const H: FC<HProps> = ({ title, paragraph }: HProps) => (
    <div>
        <h1>{title}</h1>
        <p>{paragraph}</p>
    </div>
);

export default H;
