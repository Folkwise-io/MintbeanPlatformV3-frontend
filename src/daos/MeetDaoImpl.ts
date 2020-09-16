import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { MeetDao } from "./MeetDao";

interface EventResponseRaw {
  meets: HackMeet[];
}

const testMeets: HackMeet[] = [
  {
    id: "1",
    meetType: "hackathon",
    coverImageUrl:
      "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    title: "test event",
    startTime: "1994-08-02T18:59",
    endTime: "1994-08-05T18:59",
    description: "test description",
    region: "America/Toronto",
    instructions: "make it happen",
    registerLink:
      "https://github.com/monarchwadia/MintbeanPlatformV2/blob/master/frontend/src/components/mb-banner.vue",
  },
  {
    id: "2",
    meetType: "hackathon",
    coverImageUrl:
      "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    title: "test event 2",
    startTime: "1994-08-02T18:59",
    endTime: "1994-08-05T18:59",
    description: "test description",
    region: "America/Toronto",
    instructions: "make it happen",
    registerLink:
      "https://github.com/monarchwadia/MintbeanPlatformV2/blob/master/frontend/src/components/mb-banner.vue",
  },
  {
    id: "3",
    meetType: "hackathon",
    coverImageUrl:
      "https://images.unsplash.com/photo-1593642634402-b0eb5e2eebc9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
    title: "test event 3",
    startTime: "1994-08-02T18:59",
    endTime: "1994-08-05T18:59",
    description: "test description",
    region: "America/Toronto",
    instructions: "make it happen",
    registerLink:
      "https://github.com/monarchwadia/MintbeanPlatformV2/blob/master/frontend/src/components/mb-banner.vue",
  },
];

export class MeetDaoImpl implements MeetDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchMeets(): Promise<HackMeet[]> {
    return new Promise((res) => res(testMeets));
    // return (
    //   this.api
    //     .query<ApiResponseRaw<EventResponseRaw>>(
    //       `
    //       query allEvents {
    //         meets {
    //           id
    //           meetType
    //           title
    //           description
    //           instructions
    //           registerLink
    //           coverImageUrl
    //           startTime
    //           endTime
    //           createdAt
    //           region
    //       }
    //     `,
    //     )
    //     .then((result) => {
    //       if (result.errors) throw result.errors;
    //       if (!result.errors && !result.data.meets) {
    //         throw [{ message: "Failed to get meets", extensions: { code: "UNEXPECTED" } }];
    //       }
    //       return result.data.meets;
    //     })
    //     // TODO: What potential Types of errors can invoke this catch?
    //     /* eslint-disable  @typescript-eslint/no-explicit-any */
    //     .catch((e: any) => {
    //       if (e.errors) {
    //         throw e.errors;
    //       } else {
    //         throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
    //       }
    //     })
    //   /* eslint-enable  @typescript-eslint/no-explicit-any */
    // );
  }
}
