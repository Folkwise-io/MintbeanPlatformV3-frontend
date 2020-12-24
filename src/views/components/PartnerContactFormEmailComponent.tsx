import React, { FC, useContext, useState } from "react";
import { Context } from "../../context/contextBuilder";
import { MbContext } from "../../context/MbContext";
import { EmailResponseStatus } from "../../daos/EmailDao";
import { H2 } from "./blocks/H2";
import { PartnerContactForm } from "./forms/PartnersContactForm";

export const PartnerContactFormEmailComponent: FC = () => {
  const context = useContext<Context>(MbContext);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleData = async (data: PartnerContactFormInput) => {
    setIsSending(true);
    try {
      const response = await context.emailService.sendPartnerContactFormEmail(data);
      setIsSending(false);
      if (response && response.status === EmailResponseStatus.SUCCESS) {
        setSuccess(true);
      }
    } catch (e) {
      // do nothing if error caught because service will log it
    }
    setIsSending(false);
  };

  const FormView = (
    <>
      <H2 className="text-center">Tell us why your organization is a good fit for Mintbean</H2>
      <PartnerContactForm handleData={handleData} disabled={isSending} />
    </>
  );
  const SuccessView = (
    <div className="flex flex-col items-center justify-center text-center">
      <H2>Message Sent!</H2>
      <p>
        Hey, thanks for reaching out to us. We&apos;re looking forward to connecting. Keep an eye out for an email from
        us.
      </p>
    </div>
  );
  return (
    <div className="bg-mb-blue-600 rounded-md md:px-24 sm:px-6 px-4 py-10 shadow-lg">
      {success ? SuccessView : FormView}
    </div>
  );
};
