import { useEffect, useState } from "react";
import { Layout } from "../../shared/layout";
import { Resume, User } from "../../domain/entities";
import { getCurrentUser } from "../../api/user-api";
import { getAllResumes } from "../../api/resume-api";

export const Home = () => {
    const [user, setUser] = useState<User | null>(null);
    const [resumes, setResumes] = useState<Resume[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getCurrentUser();
                const allResumes = await getAllResumes();
                setUser(response);
                setResumes(allResumes);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout title="Dashboard">
            {user && <h1>Hello, {user.name} 👋. Welcome to the dashboard. </h1>}

            <div className="overflow-x-auto mt-4">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700">
                            <th className="py-2 px-4 border-b">File Name</th>
                            <th className="py-2 px-4 border-b">File URL</th>
                            <th className="py-2 px-4 border-b">User ID</th>
                            <th className="py-2 px-4 border-b">
                                Job Description
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {resumes.map((resume, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">
                                    {resume.fileName}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <a
                                        href={resume.fileUrl}
                                        className="font-medium text-indigo-600 hover:text-indigo-500 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        View File
                                    </a>
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {resume.userId}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    {resume.jobDescription}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};
