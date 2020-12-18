import React, { FC, useState } from "react";
import { H2 } from "./blocks/H2";
import { PartnerContactForm } from "./forms/PartnersContactForm";

export const PartnerContactFormEmailComponent: FC = () => {
  const [isSending, setIsSending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleData = async (data: PartnerContactFormInput) => {
    setIsSending(true);
    console.log(data);
    await new Promise((res) => setTimeout(() => res("Done"), 3000));
    setIsSending(false);
    setSuccess(true);
    // TODO: set success to true on succesfuly api call
  };

  const FormView = (
    <>
      <H2>Tell us why your organization is a good fit for Mintbean</H2>
      <PartnerContactForm handleData={handleData} disabled={isSending} />
    </>
  );
  const SuccessView = (
    <div className="flex items-center justify-center ">
      <H2>Message Sent!</H2>
      <p>
        Hey, thanks for reaching out to us. We&apos;re looking forward to connecting. Keep an eye out for an email from
        us.
      </p>
    </div>
  );
  return <div className="bg-mb-blue-600 rounded-md md:px-24  px-2 py-10">{success ? SuccessView : FormView}</div>;
};
