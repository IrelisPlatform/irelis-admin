"use client";

import {
  CheckIcon,
  ChevronDownIcon,
  PlusIcon,
  PencilIcon,
  SearchIcon,
  CheckCircleIcon,
} from "lucide-react";
import { useId, useState, useRef, useEffect } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

type SelectOption = {
  label: string;
  value: string;
};

type SelectWithSearchAndButtonProps = {
  options: SelectOption[];
  value: string | null | undefined;
  onValueChange: (value: string) => void;
  onAddItem: (newItem: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  addItemPlaceholder?: string;
  buttonLabel?: string;
  label?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
};

export function SelectWithSearchAndButton(
  props: SelectWithSearchAndButtonProps
) {
  const {
    options,
    value,
    onValueChange,
    onAddItem,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    addItemPlaceholder = "Enter new item...",
    buttonLabel = "Add new",
    label,
    emptyMessage = "No results found.",
    disabled = false,
    className,
  } = props;

  const id = useId();
  const [open, setOpen] = useState<boolean>(false);
  const [isAddingMode, setIsAddingMode] = useState<boolean>(false);
  const [newItemValue, setNewItemValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    if (isAddingMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAddingMode]);

  const handleSelect = (selectedValue: string) => {
    onValueChange(selectedValue);
    setOpen(false);
    setIsAddingMode(false);
    setNewItemValue("");
  };

  const handleAddButtonClick = () => {
    setIsAddingMode(true);
    setNewItemValue("");
  };

  const handleCancelAdd = () => {
    setIsAddingMode(false);
    setNewItemValue("");
  };

  const handleValidateAdd = () => {
    const trimmedValue = newItemValue.trim();
    if (trimmedValue) {
      onAddItem(trimmedValue);
      handleSelect(trimmedValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleValidateAdd();
    } else if (e.key === "Escape") {
      e.preventDefault();
      handleCancelAdd();
    }
  };

  return (
    <div className={cn("*:not-first:mt-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover
        onOpenChange={(newOpen) => {
          setOpen(newOpen);
          if (!newOpen) {
            setIsAddingMode(false);
            setNewItemValue("");
          }
        }}
        open={open}
      >
        <PopoverTrigger asChild>
          <Button
            aria-expanded={open}
            className="w-full justify-between border-input bg-background px-3 font-normal outline-none outline-offset-0 hover:bg-background focus-visible:outline-[3px]"
            disabled={disabled}
            id={id}
            role="combobox"
            variant="outline"
          >
            <span className={cn("truncate", !value && "text-muted-foreground")}>
              {value ? selectedOption?.label : placeholder}
            </span>
            <ChevronDownIcon
              aria-hidden="true"
              className="shrink-0 text-muted-foreground/80"
              size={16}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
        >
          <Command shouldFilter={!isAddingMode}>
            {isAddingMode ? (
              <div className="flex items-center border-input border-b px-3 py-2 gap-2">
                <PencilIcon
                  className="text-muted-foreground/80 shrink-0"
                  size={16}
                />
                <Input
                  ref={inputRef}
                  className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 h-8"
                  placeholder={addItemPlaceholder}
                  value={newItemValue}
                  onChange={(e) => setNewItemValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelAdd}
                    className="h-7 px-2"
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={handleValidateAdd}
                    disabled={!newItemValue.trim()}
                    className="h-7 px-2"
                  >
                    <CheckCircleIcon size={14} className="mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            ) : (
              <CommandInput placeholder={searchPlaceholder} />
            )}
            <CommandList>
              {!isAddingMode && (
                <>
                  <CommandEmpty>{emptyMessage}</CommandEmpty>
                  <CommandGroup>
                    {options.map((option) => (
                      <CommandItem
                        key={option.value}
                        onSelect={() => handleSelect(option.value)}
                        value={option.value}
                      >
                        {option.label}
                        {value === option.value && (
                          <CheckIcon className="ml-auto" size={16} />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                  <CommandSeparator />
                  <CommandGroup>
                    <Button
                      className="w-full justify-start font-normal"
                      onClick={handleAddButtonClick}
                      variant="ghost"
                    >
                      <PlusIcon
                        aria-hidden="true"
                        className="-ms-2 opacity-60"
                        size={16}
                      />
                      {buttonLabel}
                    </Button>
                  </CommandGroup>
                </>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
