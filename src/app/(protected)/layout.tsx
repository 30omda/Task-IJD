"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from 'react';
import { getItem } from "@/utils/Localstorage/storage";
import type { StorageUser } from "@/utils/Cookies/cookies";
import ReduduxProvider from "@/store/ReduxProvider";
import ClientToaster from "@/components/ClientToaster";

interface ProtectedLayoutProps {
    children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const [isMounted, setIsMounted] = useState<boolean>(false);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);

        const token = getItem<string>("token");
        const user = getItem<StorageUser>("user");
        const isEmployee = getItem<boolean>("isEmployee");

        const isAuth = Boolean(token && user && isEmployee === true);

        if (!isAuth) {
            router.push("/login");
        } else {
            setIsAuthenticated(true);
        }
    }, [router]); // Added router to dependency array

    if (!isMounted) {

        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <ReduduxProvider>
            <ClientToaster />
            <div className="flex flex-1 flex-col">
                <div className="@container/main flex flex-1 flex-col gap-2">
                    {children}
                </div>
            </div>
        </ReduduxProvider>
    );
}
