import React, { FC } from "react";

type Footer = {
  footerNav: string[];
  links: string[];
};

type Props = {
  footer: Footer;
};

export const Footer: FC<Props> = ({ footer }) => {
  const { footerNav, links } = footer;
  return (
    <footer className="w-full font-body text-xs grid grid-cols-2 items-stretch">
      <article>
        <button>meow</button>
      </article>
      <article className="">
        <ul className={`grid grid-cols-${footerNav.length} items-stretch w-full`}>
          {footerNav.map((item, index) => (
            <li key={index}>
              <a className="whitespace-no-wrap flex justify-center hover:text-mb-green-200" href={links[index]}>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <p className="text-right mr-6">© Made by Mintbean 2020, All Rights Reserved</p>
      </article>
    </footer>
  );
};
