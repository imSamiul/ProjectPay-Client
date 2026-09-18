import type { ReactNode } from "react";
import authenticationPageImage from "@/assets/authentication-page-image.jpg";

export function AuthenticationLayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center px-4 py-10">
        {children}
      </div>
      <div className="relative hidden overflow-hidden bg-sidebar lg:block">
        <img
          src={authenticationPageImage}
          alt=""
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-sidebar/55" />
        <div className="relative z-10 flex h-full flex-col justify-end gap-3 p-10 text-sidebar-foreground">
          <p className="text-sm uppercase tracking-[0.2em] text-sidebar-foreground/70">
            Project Pay
          </p>
          <h1 className="max-w-md text-4xl font-semibold text-sidebar-foreground">
            Track projects and payments with clarity.
          </h1>
        </div>
      </div>
    </div>
  );
}
