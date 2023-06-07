import { ReactNode } from "react";

type MainProps = {
  children: ReactNode;
};

export default function Main({ children }: MainProps) {
  return (
    <div className="flex flex-col max-w-7xl mx-auto px-4 py-6">{children}</div>
  );
}
