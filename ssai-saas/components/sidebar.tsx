"use client";

import Link from "next/link";
import Image from "next/image";

import {cn} from "@/lib/utils";
import {Montserrat} from "next/font/google";
import {Code, Cog, ImagePlus, LayoutDashboard, MessageSquarePlus, Music, Video} from "lucide-react";

const montserrat = Montserrat({
    weight:"600",
    subsets: ["latin"]
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Conversation",
        icon: MessageSquarePlus,
        href: "/conversation",
        color: "text-violet-500",
    },
    {
        label: "Image Generation",
        icon: ImagePlus,
        href: "/image",
        color: "text-pink-700",
    },
    {
        label: "Video Generation",
        icon: Video,
        href: "/video",
        color: "text-orange-700",
    },
    {
        label: "Music Generation",
        icon: Music,
        href: "/music",
        color: "text-green-500",
    },
    {
        label: "Code Generation",
        icon: Code,
        href: "/code",
        color: "text-purple-700",
    },
    {
        label: "Settings",
        icon: Cog,
        href: "/settings",
        color: "text-white-500",
    }
]

const Sidebar = () => {
    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-12 h-12 mr-4">
                        <Image fill alt="Logo" src="/logo-next.png" />
                    </div>
                    <h1 className={cn("text-1xl font-bold", montserrat.className)}>Samokhval Stefan AI</h1>
                </Link>

                <div className="space-y-1">
                    {routes.map(route => (
                        <Link
                            href={route.href}
                            key={route.href}
                            className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer
                            hover:text-white hover:bg-white/10 rounded-lg transition">
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
