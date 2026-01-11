"use client";

import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { useId, useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type SelectOption = {
  label: string;
  value: string;
};

type SelectWithSearchProps = {
  options: SelectOption[];
  value: string | null | undefined;
  onValueChange: (value: string | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  label?: string;
  hasNotSpecified?: boolean;
  notSpecifiedLabel?: string;
  emptyMessage?: string;
  disabled?: boolean;
  className?: string;
};

const NOT_SPECIFIED_VALUE = "__NOT_SPECIFIED__";

export function SelectWithSearch(props: SelectWithSearchProps) {
  const {
    options,
    value,
    onValueChange,
    placeholder = "Select...",
    searchPlaceholder = "Search...",
    label,
    hasNotSpecified = false,
    notSpecifiedLabel = "Pas spécifié",
    emptyMessage = "No results found.",
    disabled = false,
    className,
  } = props;

  const id = useId();
  const [open, setOpen] = useState<boolean>(false);

  const displayOptions = hasNotSpecified
    ? [{ label: notSpecifiedLabel, value: NOT_SPECIFIED_VALUE }, ...options]
    : options;

  const selectedOption = displayOptions.find(
    (option) => option.value === value
  );

  const handleSelect = (selectedValue: string) => {
    if (selectedValue === NOT_SPECIFIED_VALUE) {
      onValueChange(null);
    } else {
      onValueChange(selectedValue);
    }
    setOpen(false);
  };

  return (
    <div className={cn("*:not-first:mt-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Popover onOpenChange={setOpen} open={open}>
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
              {value
                ? selectedOption?.label
                : hasNotSpecified
                ? notSpecifiedLabel
                : placeholder}
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
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {displayOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    value={option.label}
                    keywords={[option.value]}
                  >
                    {option.label}
                    {value === option.value && (
                      <CheckIcon className="ml-auto" size={16} />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
