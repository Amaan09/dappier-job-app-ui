import { AppChildrenProps } from "../../domain"

export const Dashboard = ({ children } : AppChildrenProps) => {
    return (
        <>
            <h1>This is the dashboard page.</h1>

            <div>{children}</div>
        </>
    )
}
