import React, { FC } from "react";

const domReady = !!(typeof window !== "undefined" && window.document);

type Props = {
  isActive: boolean;
  appId: string;
  user?: User;
};
/* eslint-disable  @typescript-eslint/no-explicit-any */

export const IntercomClient: FC<Props> = ({ isActive, appId, user }) => {
  // if (domReady) {
  //   ((w, d, id, s, x): void => {
  //     function i(): void {
  //       i.c(arguments);
  //     }
  //     i.q = [] as any;
  //     i.c = function (args: any) {
  //       i.q.push(args);
  //     };
  //     (w as any).Intercom = i;
  //     s = d.createElement("script") as any;
  //     s.async = 1;
  //     s.src = "https://widget.intercom.io/widget/" + id;
  //     d.head.appendChild(s);
  //   })(window, document, appId);
  // }
  return <div></div>;
};
/* eslint-enable  @typescript-eslint/no-explicit-any */
