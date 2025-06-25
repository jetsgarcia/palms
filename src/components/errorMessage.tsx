import { CircleAlert } from "lucide-react";

interface ErrorMessageProps {
  error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="my-4 flex items-center justify-center h-140">
      <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg shadow-md flex items-center gap-2 animate-fade-in">
        <CircleAlert />
        <span className="font-medium">{error}</span>
      </div>
    </div>
  );
}
