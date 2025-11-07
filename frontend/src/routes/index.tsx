import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./auth.route";
import {
    authenticationRoutePaths,
    baseRoutePaths,
    protectedRoutePaths,
    userRoutePaths,
} from "./common/routes";
import BaseLayout from "@/layout/base.layout";
import NotFound from "@/page/errors/NotFound";
import ProtectedRoute from "./protected.route";
import AppLayout from "@/layout/app.layout";
import UserLayout from "@/layout/user.layout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<BaseLayout />}>
                    {baseRoutePaths.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Route>

                <Route path="/" element={<AuthRoute />}>
                    <Route element={<BaseLayout />}>
                        {authenticationRoutePaths.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Route>
                </Route>

                <Route path="/" element={<ProtectedRoute />}>
                    <Route element={<AppLayout />}>
                        {protectedRoutePaths.map((route) => (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Route>
                </Route>

                <Route element={<UserLayout />}>
                    {userRoutePaths.map((route) => (
                        <Route key={route.path} path={route.path} element={route.element} />
                    ))}
                </Route>

                {/* Catch-all for undefined routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;