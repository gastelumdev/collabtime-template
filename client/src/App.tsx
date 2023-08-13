import { Routes, Route } from "react-router-dom";
import { Box, Center, VStack } from "@chakra-ui/react";

import { Login } from "./features/auth/Login";
import { PrivateOutlet } from "./utils/PrivateOutlet";
import { View as Events } from "./features/events/View";

const Participants = () => {
    return <h1>Participants</h1>;
};

function App() {
    return (
        <Box>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<PrivateOutlet />}>
                    <Route index element={<Events />} />
                    <Route path="events" element={<Events />}></Route>
                    <Route
                        path="events/:id/participants"
                        element={<Participants />}
                    />
                </Route>
            </Routes>
        </Box>
    );
}

export default App;
