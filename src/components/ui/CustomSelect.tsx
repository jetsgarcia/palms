import React, { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<CustomSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select...",
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Filter options by search
  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        className="w-full px-2 py-2 border rounded text-sm bg-white text-left"
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedLabel || (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
      </button>
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
          <input
            type="text"
            className="w-full px-2 py-1 border-b text-sm outline-none"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />
          {filteredOptions.length === 0 ? (
            <div className="px-2 py-2 text-muted-foreground text-sm">
              No options found
            </div>
          ) : (
            <ul tabIndex={-1} role="listbox">
              {filteredOptions.map((option) => (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={option.value === value}
                  className={`px-2 py-2 cursor-pointer hover:bg-gray-100 ${
                    option.value === value ? "bg-gray-100" : ""
                  }`}
                  onClick={() => {
                    onChange(option.value);
                    setOpen(false);
                    setSearch("");
                  }}
                >
                  {option.label}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
