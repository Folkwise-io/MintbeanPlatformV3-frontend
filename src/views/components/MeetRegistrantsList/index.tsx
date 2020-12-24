import React, { FC, useState } from "react";
import { MeetListUser } from "./MeetListUser";

interface Props {
  meetRegistrants: RegistrantsForMeet[];
}

export const MeetRegistrantsList: FC<Props> = ({ meetRegistrants }) => {
  const [expanded, setExpanded] = useState<boolean>(true);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const renderPreviewAvatars = () => {
    // TODO: overlapping avatar logic
    return null;
  };

  const isSingular = meetRegistrants.length == 1;

  const renderSummaryHeader = () => (
    <div className={`flex justify-between items-center bg-black p-4 ${expanded ? "rounded-t-lg" : "rounded-lg"}`}>
      <div className="flex items-center h-auto">
        {renderPreviewAvatars()}
        <span className="flex items-center flex-grow text-white font-semibold">
          {meetRegistrants.length} Attendee{isSingular ? "" : "s"}
        </span>
      </div>
      <button onClick={toggleExpanded} className="text-mb-green-200 cursor-pointer hover:underline font-semibold">
        {expanded ? "Hide all" : "Show all"}
      </button>
    </div>
  );

  // render hr bar under all users except last
  const renderMeetListUsers = (registrant: RegistrantsForMeet, index: number) => (
    <>
      <MeetListUser key={registrant.id} meetRegistrant={registrant} />
      {index != meetRegistrants.length - 1 && <hr className="border-t-1 border-mb-gray-300" />}
    </>
  );

  const renderExpandedView = () => (
    <div>
      {renderSummaryHeader()}
      <div className="flex flex-col justify-between bg-black rounded-b-lg max-h-32 px-4 pt-4">
        <div className="overflow-y-scroll scrollbar h-96 pr-4">{meetRegistrants.map(renderMeetListUsers)}</div>
      </div>
    </div>
  );

  if (expanded) {
    return renderExpandedView();
  } else {
    return renderSummaryHeader();
  }
};

//  const [expanded, setExpanded] = useState<boolean>(true);

//   let containerView;

//   const switchExpansion = () => {
//     if (expanded) {
//       setExpanded(false);
//     } else {
//       setExpanded(true);
//     }
//   };

//   if (expanded) {
//     containerView = (
//       <div className="flex flex-col justify-between bg-black min-w-lg rounded-lg max-h-32 p-4">
//         <div className="flex justify-between mb-6">
//           <div className="flex justify-between items-center w-2/5 h-auto">
//             <div className="flex h-8">
//               {meetRegistrants.slice(0, 3).map((registrant: RegistrantsForMeet, i: number) => {
//                 return (
//                   <div key={`${registrant.id} avatar`} className="w-6 overflow-visible">
//                     <img src={greyProfilePic} className="w-8 absolute" />
//                   </div>
//                 );
//               })}
//               )
//             </div>
//             <p className="text-white font-bold">{meetRegistrants.length} Attendees</p>
//           </div>
//           <p onClick={switchExpansion} className="text-mb-green-200 cursor-pointer hover:underline">
//             Hide All
//           </p>
//         </div>
//         <div className="overflow-y-scroll scrollbar h-96">
//           {meetRegistrants.map((r: RegistrantsForMeet) => {
//             return <MeetListUser key={r.id} meetRegistrant={r} />;
//           })}
//         </div>
//       </div>
//     );
//   } else {
//     containerView = (
//       <div className="flex flex-col justify-between bg-black min-w-lg rounded-lg max-h-32 p-4">
//         <div className="flex justify-between">
//           <div className="flex justify-between items-center w-2/5 h-auto">
//             <div className="flex h-8">
//               {meetRegistrants.slice(0, 3).map((registrant: RegistrantsForMeet, i: number) => {
//                 return (
//                   <div key={`${registrant.id} avatar`} className="w-6 overflow-visible">
//                     <img src={greyProfilePic} className="w-8 absolute" />
//                   </div>
//                 );
//               })}
//               )
//             </div>
//             <p className="text-white font-bold">{meetRegistrants.length} Attendees</p>
//           </div>
//           <p onClick={switchExpansion} className="text-mb-green-200 cursor-pointer hover:underline">
//             Show All
//           </p>
//         </div>
//       </div>
//     );

// return containerView;
