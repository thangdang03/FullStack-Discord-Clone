import { ThemeProvider } from "@/components/common/dark";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

const UserLayout = ({children}: {children: ReactNode}) => {
        return (
        <div className={cn("bg-white dark:bg-[#313338]  w-full h-screen")}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false} 
                    storageKey="discord-theme"
                >
                    {children}
                </ThemeProvider>
            </div>
        );
}
export default UserLayout;