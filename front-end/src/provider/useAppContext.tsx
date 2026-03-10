import { Context } from ".";
import React from "react";

export function useAppContext(): ContextType {
    return React.useContext(Context);
}
