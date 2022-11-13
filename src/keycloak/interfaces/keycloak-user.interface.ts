export type credentialsType = { value: string };

export interface IKeycloakUser {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  enabled?: boolean;
  username?: string;
  groups?: string[];
  credentials?: credentialsType[];
}
