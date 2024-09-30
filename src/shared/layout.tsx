import { LayoutProps } from "../domain";

export const Layout = ({ children, title }: LayoutProps) => {
    return (
        <>
            <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-2xl font-semibold text-gray-900">
                    {title}
                </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
                <div className="py-4">{children}</div>
            </div>
        </>
    );
};
