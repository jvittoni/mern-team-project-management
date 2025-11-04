import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./auth.route";
import {
    authenticationRoutePaths,
    baseRoutePaths,
} from "./common/routes";
import BaseLayout from "@/layout/base.layout";
import NotFound from "@/page/errors/NotFound";

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

                {/* Catch-all for undefined routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;