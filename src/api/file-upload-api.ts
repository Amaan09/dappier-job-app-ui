import { FileUploadResponse } from "../domain";
import { client } from "./lib/api-client";

export const uploadFile = (file: string | Blob): Promise<FileUploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const config = {
        headers: {
          'content-type': 'multipart/form-data',
        }
    };

    return client.post('file-upload/file', formData, config);
}
