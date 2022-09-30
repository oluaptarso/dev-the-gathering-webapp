export default interface IAuthenticatedUser {
  id: string;
  displayName: string;
}

export interface IHaveAuthenticationTokenProperty {
  token: string;
}

export interface IHaveEmailVerifiedProperty {
  emailVerified: boolean;
}