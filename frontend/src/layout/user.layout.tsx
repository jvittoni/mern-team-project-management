import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div className="px-6 lg:px-20 py-6">
            <Outlet />
        </div>
    );
};

export default UserLayout;
