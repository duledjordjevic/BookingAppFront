import { KeycloakTokenParsed } from "keycloak-js";

export interface UserProfile {
    username?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    tokenParsed?: KeycloakTokenParsed;
    role?: string;
}