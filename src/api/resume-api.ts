import { CreateResumeRequest } from "../domain";
import { Resume } from "../domain/entities";
import { client } from "./lib/api-client";

export const createResume = (request: CreateResumeRequest): Promise<Resume> => {
    return client.post('resume/create', request);
}
