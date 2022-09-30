import React from "react";
import { ICentralizedApplication, IDecentralizedApplication } from "src/interfaces/application";

export const ApplicationContext = React.createContext<ICentralizedApplication | IDecentralizedApplication | null>(null);