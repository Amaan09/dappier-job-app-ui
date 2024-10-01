import { NavLink, useNavigate } from "react-router-dom";
import { Layout } from "../../shared/layout";
import { CreateResumeRequest, FileUploadResponse } from "../../domain";
import { SubmitHandler, useForm } from "react-hook-form";
import { DocumentTextIcon } from "@heroicons/react/24/outline";
import { ChangeEvent, useState } from "react";
import { uploadFile } from "../../api/file-upload-api";
import { createResume } from "../../api/resume-api";
import { useToast } from "../../hooks/useToast";
import { Loader } from "../../shared/loader";

interface ResumeForm extends CreateResumeRequest {
    file: Blob | string | undefined;
}

export const ResumeUpload = () => {
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
        trigger,
    } = useForm<ResumeForm>({
        defaultValues: {
            fileName: undefined,
            fileUrl: undefined,
            jobDescription: undefined,
            file: undefined,
        },
    });

    const openToast = useToast();

    const [fileResponse, setFileResponse] = useState<FileUploadResponse | null>(
        null
    );
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<ResumeForm> = async (data) => {
        if (!data.fileName || !data.fileUrl) {
            return;
        }
        setDisabled(true);
        try {
            await createResume({
                fileName: data.fileName,
                jobDescription: data.jobDescription,
                fileUrl: data.fileUrl,
            });
            openToast("success", "Data saved successfully.");
            navigate("/dashboard");
        } catch (error) {
            setDisabled(false);
            openToast("error", "Error in saving data.");
        }
    };

    const handleUploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
        setDisabled(true);
        setLoading(true);
        setFileResponse(null);
        try {
            const response = await uploadFile(event.target.files?.[0] ?? "");
            setValue("fileName", response.fileName);
            setValue("fileUrl", response.path);
            trigger("file");
            setLoading(false);
            setDisabled(false);
            setFileResponse(response);
            openToast("success", "File uploaded sucessfully.");
        } catch (error) {
            setDisabled(false);
            openToast("error", "Error in uploading the file.");
        }
    };

    const handleClear = () => {
        reset();
        setFileResponse(null);
    };

    return (
        <Layout title="Upload Resume">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-8 divide-y divide-gray-200"
            >
                <div className="space-y-8 divide-y divide-gray-200">
                    <div>
                        <p className="mt-1 text-sm text-gray-500">
                            Please upload the resume of the candidate and enter
                            the job description to train the model. Once you
                            save the changes, the data is sent is sent to the
                            model for training, which can be tracked&nbsp;
                            <NavLink
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                to="/dashboard/resume-chatbot-jobs"
                            >
                                here.
                            </NavLink>
                        </p>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="cover-photo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Resume
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <DocumentTextIcon className="mb-1.5 mx-auto h-8 w-8 text-gray-400" />
                                        <div className="flex text-sm text-gray-600">
                                            <label
                                                htmlFor="file-upload"
                                                className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                            >
                                                <span>Upload a file</span>
                                                <input
                                                    {...register("file", {
                                                        required:
                                                            "File is required.",
                                                    })}
                                                    id="file-upload"
                                                    type="file"
                                                    className="sr-only"
                                                    accept=".pdf, .docx, .doc"
                                                    onChange={handleUploadFile}
                                                />
                                            </label>
                                            <p className="pl-1">
                                                or drag and drop
                                            </p>
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            pdf, docx, doc
                                        </p>
                                    </div>
                                </div>
                                {fileResponse && (
                                    <p className="font-medium text-xs mt-2">
                                        Uploaded File:{" "}
                                        <a
                                            href={fileResponse.path}
                                            className="font-xs text-indigo-600 hover:text-indigo-500"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {fileResponse.fileName}
                                        </a>
                                    </p>
                                )}
                                {loading && <Loader />}
                                {errors.file && (
                                    <p className="mt-1 text-xs text-red-600">
                                        {errors.file.message}
                                    </p>
                                )}
                            </div>

                            <div className="sm:col-span-6">
                                <label
                                    htmlFor="about"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Job Description
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        {...register("jobDescription", {
                                            required:
                                                "Job description is required.",
                                        })}
                                        id="jobDescription"
                                        name="jobDescription"
                                        rows={5}
                                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                    />
                                    {errors.jobDescription && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.jobDescription.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            onClick={handleClear}
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Clear
                        </button>
                        <button
                            disabled={disabled}
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-20"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    );
};
