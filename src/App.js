import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { userRoutes } from "./routes/userRoutes";
function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {userRoutes.map((route, index) => {
                        return (
                            <Route
                                key={index}
                                exact={route?.exact}
                                path={route.path}
                                element={route.component}
                            />
                        );
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
