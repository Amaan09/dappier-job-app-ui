import { User } from "../domain/entities";
import { client } from "./lib/api-client";

export const getCurrentUser = (): Promise<User> => {
    return client.get('user/get-loggedin-user');
}
