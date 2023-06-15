import { FC } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { AddClient } from "../AddClient/AddClient";
import { ViewClient } from "../ViewClient/ViewClient";

export const Router: FC = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='' element={<AddClient />} />
                <Route path='/viewClients' element={<ViewClient />} />
            </Routes>
        </>
    );
}