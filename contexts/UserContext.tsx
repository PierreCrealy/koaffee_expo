import {createContext, useState} from "react";
import {User} from "@/entities/User";


// @ts-ignore
export const UserContext = createContext();

export const UserProvider = ({ children }: { children: any }) => {
    const [user, setUser] = useState<User | null | undefined>();
    const [token, setToken] = useState<string | null | undefined>();


    const connectUser = ({user, token}: {user: User, token: string}) => {
        setUser(user);
        setToken(token);
    }

    const disconnectUser = () => {
        setUser(null);
        setToken(null);
    }

    return (
        <UserContext.Provider value={{user, token, connectUser, disconnectUser}}>
            {children}
        </UserContext.Provider>
    )
}
