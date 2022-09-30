import React from "react";
import IAuthenticatedUser from "src/interfaces/user";

export const AuthContext = React.createContext<IAuthenticatedUser| null>(null);