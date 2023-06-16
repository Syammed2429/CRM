import { FC } from "react";
import { Navbar } from "../Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import { AddClient } from "../AddClient/AddClient";
import { GetAllClients } from "../GetAllClients/GetAllClients";
import { ClientDetails } from "../ClientDetails/ClientDetails";

export const Router: FC = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='' element={<AddClient />} />
                <Route path='/get-all-clients' element={<GetAllClients />} />
                <Route path="/client/:clientId" element={<ClientDetails />} />

            </Routes>
        </>
    );
}