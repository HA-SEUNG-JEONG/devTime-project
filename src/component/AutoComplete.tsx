import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface CustomAutocompleteProps {
  label?: string;
  placeholder?: string;
  items: { id: number; name: string }[];
  onSelect?: (value: string) => void;
  handleAddNewItem?: (value: string) => void;
  maxSuggestions?: number;
}

const AutoComplete = ({
  label = "Autocomplete Label",
  placeholder = "Placeholder",
  items,
  onSelect,
  handleAddNewItem
}: CustomAutocompleteProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredItems = inputValue
    ? items.filter((item: { id: number; name: string }) =>
        item.name.toLowerCase().startsWith(inputValue.toLowerCase())
      )
    : [];

  const showAddNewItem = inputValue.length > 0 && filteredItems.length === 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(value.length > 0);
  };

  const handleSelect = (value: string) => {
    setInputValue(value);
    setIsOpen(false);
    onSelect?.(value);
  };

  const highlightMatch = (text: string, query: string) => {
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return <>{text}</>;

    return (
      <>
        <span className="typography-body-b">
          {text.substring(0, index + query.length)}
        </span>
        <span className="text-muted-foreground typography-body-r">
          {text.substring(index + query.length)}
        </span>
      </>
    );
  };

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-sm font-medium text-foreground mb-2">
        {label}
      </label>
      <Input
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => {
          if (inputValue) setIsOpen(true);
        }}
        className="bg-background border-input focus-visible:ring-ring"
      />

      {isOpen && (filteredItems.length > 0 || showAddNewItem) && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-border bg-white shadow-lg">
          {filteredItems.length > 0 && (
            <div className="max-h-[300px] overflow-y-auto p-1">
              {filteredItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.name)}
                  className="w-full text-left px-3 py-2 text-base hover:bg-accent rounded-md transition-colors"
                >
                  {highlightMatch(item.name, inputValue)}
                </button>
              ))}
            </div>
          )}

          {showAddNewItem && (
            <>
              {filteredItems.length > 0 && (
                <div className="border-t border-border" />
              )}
              <div className="p-1">
                <Button
                  variant="ghost"
                  onClick={() => handleAddNewItem?.(inputValue)}
                  className="w-full justify-start text-[#3B5CF8] hover:bg-accent hover:text-[#3B5CF8] font-semibold"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Item
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AutoComplete;
