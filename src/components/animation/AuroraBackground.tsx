"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
    children: ReactNode;
    showRadialGradient?: boolean;
}

export const AuroraBackground = ({
    className,
    children,
    showRadialGradient = true,
    ...props
}: AuroraBackgroundProps) => {
    return (
        <main>
            <div
                className={cn(
                    "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-black text-white",
                    className,
                )}
                {...props}
            >
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={
                        {
                            "--aurora":
                                "repeating-linear-gradient(100deg,#1f2937_10%,#374151_15%,#4b5563_20%,#6b7280_25%,#111827_30%)",
                            "--dark-gradient":
                                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
                            "--white-gradient":
                                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

                            "--gray-300": "#d1d5db",
                            "--gray-400": "#9ca3af",
                            "--gray-500": "#6b7280",
                            "--gray-600": "#4b5563",
                            "--gray-700": "#374151",
                            "--gray-800": "#1f2937",
                            "--black": "#000",
                            "--white": "#fff",
                            "--transparent": "transparent",
                        } as React.CSSProperties
                    }
                >
                    <div
                        className={cn(
                            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--dark-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--gray-700)_10%,var(--gray-600)_15%,var(--gray-500)_20%,var(--gray-600)_25%,var(--gray-800)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--dark-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""]`,

                            showRadialGradient &&
                            `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
                        )}
                    ></div>
                </div>
                {children}
            </div>
        </main>
    );
};
