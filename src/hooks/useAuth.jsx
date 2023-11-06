import UserContext from "../context/UserContext";
import { useContext } from "react";

export default function useAuth() {
    return useContext(UserContext);
}