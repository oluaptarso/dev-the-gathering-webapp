import React from "react";
import IAuthenticatedUser, { ICentralizedAuthenticatedUser } from "src/interfaces/user";

export const AuthContext = React.createContext<IAuthenticatedUser| ICentralizedAuthenticatedUser | null>(null);