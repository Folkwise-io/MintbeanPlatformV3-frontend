import { ApiQueryExecutor } from "../api/ApiQueryExecutor";
import { MeetDao } from "./MeetDao";
import { handleServerError } from "../utils/handleServerError";

const KANBAN_CANON_RESPONSE_QUERY = `
  kanbanCanonId
  kanbanCanon {
    id
    title
    description
    kanbanCanonCards {
      id
      title
      body
      status
    }
  }`;
const KANBAN_RESPONSE_QUERY = `
  kanbanId
  kanban {
    id
    title
    description
    userId
    meetId
    kanbanCanonId
    kanbanCards {
      id
      title
      body
      status
    }
  } `;

export class MeetDaoImpl implements MeetDao {
  constructor(private api: ApiQueryExecutor) {}

  fetchMeets(): Promise<Meet[]> {
    return this.api
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
              registerLinkStatus
              coverImageUrl
              startTime
              endTime
              createdAt
              region
              ${KANBAN_CANON_RESPONSE_QUERY}
              registrants {
                id
              }
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
      .catch(handleServerError);
  }

  // get shallow projects, just enough data for project card
  fetchMeet(id: string): Promise<Meet> {
    return this.api
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
              registerLinkStatus
              coverImageUrl
              startTime
              endTime
              createdAt
              region
              projects {
                id
                title
                sourceCodeUrl
                liveUrl
                user {
                  firstName
                  lastName
                }
                mediaAssets {
                  cloudinaryPublicId
                }
              }
              registrants {
                id
                firstName
                lastName
              }
              ${KANBAN_CANON_RESPONSE_QUERY}
              ${KANBAN_RESPONSE_QUERY}
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
      .catch(handleServerError);
  }

  createMeet(params: CreateMeetInput): Promise<Meet> {
    return this.api
      .query<ApiResponseRaw<{ createMeet: Meet }>, { input: CreateMeetInput }>(
        `
          mutation createMeet($input: CreateMeetInput!) {
            createMeet(input: $input) {
              id
              meetType
              title
              description
              instructions
              registerLink
              registerLinkStatus
              coverImageUrl
              startTime
              endTime
              createdAt
              region
              ${KANBAN_CANON_RESPONSE_QUERY}
              ${KANBAN_RESPONSE_QUERY}
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
      .catch(handleServerError);
  }
  editMeet(id: string, params: EditMeetInput): Promise<Meet> {
    return this.api
      .query<ApiResponseRaw<{ editMeet: Meet }>, { id: string; input: EditMeetInput }>(
        `
          mutation editMeet($id: UUID!, $input: EditMeetInput!) {
            editMeet(id: $id, input: $input) {
              id
              meetType
              title
              description
              instructions
              registerLink
              registerLinkStatus
              coverImageUrl
              startTime
              endTime
              createdAt
              region
              ${KANBAN_CANON_RESPONSE_QUERY}
              ${KANBAN_RESPONSE_QUERY}
            }
          }
        `,
        { id, input: params },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.editMeet) {
          throw [{ message: "Something went wrong when creating meet.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.editMeet;
      })
      .catch(handleServerError);
  }
  deleteMeet(id: string): Promise<boolean> {
    return this.api
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
          throw [{ message: "Something went wrong when deleting the meet.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.deleteMeet;
      })
      .catch(handleServerError);
  }
  registerForMeet(meetId: string): Promise<boolean> {
    return this.api
      .query<ApiResponseRaw<{ registerForMeet: boolean }>, { meetId: string }>(
        `
        mutation registerForMeet($meetId: UUID!) {
          registerForMeet(meetId: $meetId)
        }
        `,
        { meetId },
      )
      .then((result) => {
        if (result.errors) throw result.errors;
        if (!result.errors && !result.data.registerForMeet) {
          throw [{ message: "Something went wrong when registering.", extensions: { code: "UNEXPECTED" } }];
        }
        return result.data.registerForMeet;
      })
      .catch(handleServerError);
  }
}
