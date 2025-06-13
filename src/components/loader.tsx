import { DotPulse } from "ldrs/react";
import "ldrs/react/DotPulse.css";

export default function Loader() {
  return (
    <div className="flex items-center justify-center h-140">
      <DotPulse size="43" speed="1.3" color="darkGreen" />
    </div>
  );
}
