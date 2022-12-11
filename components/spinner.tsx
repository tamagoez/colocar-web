import { BarLoader, ScaleLoader } from "react-spinners";

export function BarSpinner() {
  return (
    <BarLoader
      color="#36d7b7"
      height={3}
      speedMultiplier={1}
      width={typeof window !== "undefined" ? window.innerWidth : 1080}
      cssOverride={{ zIndex: 9999, position: "fixed", top: 0 }}
    />
  );
}

export function ScaleSpinner() {
  return <ScaleLoader color="#36d7b7" />;
}
