import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type ComboboxProps = {
  type: string;
  data: { label: string; value: string }[]; 
  onChange?: (value: string) => void; 
};

export function Combobox({ type = "One", data = [{label: "Add", value: "add"}], onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    const newValue = currentValue === value ? "" : currentValue;
    setValue(newValue);
    setOpen(false);
    if (onChange) onChange(newValue);
  };


  return (
    <Popover open={open} onOpenChange={setOpen}>
    <PopoverTrigger asChild>
        <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-[200px] justify-between"
        >
        {value ? data.find((item) => item.value === value)?.label : `Select ${type}`}
        <ChevronsUpDown className="ml-2 opacity-50" />
        </Button>
    </PopoverTrigger>
    <PopoverContent className="w-[200px] p-0">
        <Command>
        <CommandInput placeholder={`Select ${type}`} />
        <CommandList>
            <CommandEmpty>No options found.</CommandEmpty>
            <CommandGroup>
            <CommandItem
                key={"Add"}
                value={"Add"}
                onSelect={handleSelect}
                >
                {"Add"}
                <Check
                    className={cn(
                    "ml-auto",
                    value === "Add" ? "opacity-100" : "opacity-0"
                    )}
                />
                </CommandItem>
            {data.map((item) => (
                <CommandItem
                key={item.value}
                value={item.value}
                onSelect={handleSelect}
                >
                {item.label}
                <Check
                    className={cn(
                    "ml-auto",
                    value === item.value ? "opacity-100" : "opacity-0"
                    )}
                />
                </CommandItem>
            ))}
            </CommandGroup>
        </CommandList>
        </Command>
    </PopoverContent>
    </Popover>
  );
}