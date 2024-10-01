import { useForm, SubmitHandler } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { signUp } from "../../api/auth-api";
import { SignupRequest } from "../../domain";
import { useAuth } from "../../routes/provider";
import { useToast } from "../../hooks/useToast";
import { useState } from "react";

export const Signup = () => {
    const { setToken } = useAuth();
    const navigate = useNavigate();
    const openToast = useToast();

    const [disabled, setDisabled] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<SignupRequest>();

    const password = watch("password");

    const onSubmit: SubmitHandler<SignupRequest> = async (request) => {
        setDisabled(true);
        try {
            const response = await signUp(request);
            setToken(response.accessToken);
            setDisabled(false);
            navigate("/dashboard");
        } catch (error: any) {
            setDisabled(false);
            openToast(
                "error",
                `Error occured: ${error.response?.data?.message}`
            );
        }
    };

    return (
        <>
            <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <img
                        className="mx-auto h-12 w-auto"
                        src="https://dappier.com/wp-content/uploads/2023/12/logo-wht.png"
                        alt="Workflow"
                    />
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create your Account
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form
                            className="space-y-6"
                            onSubmit={handleSubmit(onSubmit)}
                        >
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        {...register("email", {
                                            required:
                                                "Email address is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message:
                                                    "Email address is invalid.",
                                            },
                                        })}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Name
                                </label>
                                <div className="mt-1">
                                    <input
                                        {...register("name", {
                                            required: "Name is required",
                                        })}
                                        type="text"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        {...register("password", {
                                            required: "Password is required.",
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                                message:
                                                    "Password must be at least 8 characters long, include an uppercase letter, a lowercase letter, a digit, and a special character (e.g., @, #, $).",
                                            },
                                        })}
                                        type="password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />

                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Confirm Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        {...register("confirmPassword", {
                                            required:
                                                "Confirm Password is required.",
                                            validate: (value) =>
                                                value === password ||
                                                "Passwords do not match.",
                                        })}
                                        type="password"
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {errors.confirmPassword && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.confirmPassword.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-center">
                                <div className="text-sm">
                                    Have an account?&nbsp;
                                    <NavLink
                                        to="/login"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Log in now
                                    </NavLink>
                                </div>
                            </div>

                            <div>
                                <button
                                    disabled={disabled}
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-20"
                                >
                                    Sign up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
