import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { MeetDao } from "./MeetDao";
import { isServerErrorArray } from "../utils/typeGuards";

export class MeetDaoImpl implements MeetDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchMeets(): Promise<Meet[]> {
    return (
      this.api
        .query<ApiResponseRaw<{ meets: Meet[] }>>(
          `
          query meets {
            meets {
              id
              meetType
              title
              description
              instructions
              registerLink
              coverImageUrl
              startTime
              endTime
              createdAt
              region
          }
        }
        `,
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.meets) {
            throw [{ message: "Failed to get meets", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.meets;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }

  fetchMeet(id: string): Promise<Meet> {
    return (
      this.api
        .query<ApiResponseRaw<{ meet: Meet }>, { id: string }>(
          `
          query meet($id: UUID!) {
            meet(id: $id) {
              id
              meetType
              title
              description
              instructions
              registerLink
              coverImageUrl
              startTime
              endTime
              createdAt
              region
          }
        }
        `,
          { id: id },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.meet) {
            throw [{ message: "Failed to get meet", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.meet;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }

  createMeet(params: CreateMeetParams): Promise<Meet> {
    return (
      this.api
        .query<ApiResponseRaw<{ createMeet: Meet }>, { input: CreateMeetParams }>(
          `
          mutation createMeet($input: CreateMeetInput!) {
            createMeet(input: $input) {
              id
              meetType
              title
              description
              instructions
              registerLink
              coverImageUrl
              startTime
              endTime
              createdAt
              region
            }
          }
        `,
          { input: params },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.createMeet) {
            throw [{ message: "Something went wrong when creating meet.", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.createMeet;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
  deleteMeet(id: string): Promise<boolean> {
    return (
      this.api
        .query<ApiResponseRaw<{ deleteMeet: boolean }>, { id: string }>(
          `
            mutation deleteMeet($id: UUID!) {
              deleteMeet(id: $id)
            }
          `,
          { id },
        )
        .then((result) => {
          if (result.errors) throw result.errors;
          if (!result.errors && !result.data.deleteMeet) {
            throw [{ message: "Something went wrong when creating meet.", extensions: { code: "UNEXPECTED" } }];
          }
          return result.data.deleteMeet;
        })
        // TODO: What potential Types of errors can invoke this catch?
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        .catch((e: any) => {
          if (isServerErrorArray(e)) throw e;
          throw [{ message: e.message, extensions: { code: "UNEXPECTED" } }];
        })
      /* eslint-enable  @typescript-eslint/no-explicit-any */
    );
  }
}
