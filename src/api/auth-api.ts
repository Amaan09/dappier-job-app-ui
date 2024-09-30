import { LoginRequest, SignupRequest } from "../domain";
import { UserAccessTokenResponse } from "../domain/response/user-access-token-response";
import { client } from "./lib/api-client";

export const login = (request: LoginRequest): Promise<UserAccessTokenResponse> => {
    return client.post('/login', request);
}

export const signUp = (request: SignupRequest): Promise<UserAccessTokenResponse> => {
    return client.post('/signup', request);
}
