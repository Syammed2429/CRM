import { FC } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { AddClient } from "../AddClient/AddClient";

export const Router: FC = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='' element={<AddClient />} />
            </Routes>
        </>
    );
}