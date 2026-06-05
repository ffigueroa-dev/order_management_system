import { useMemo, useState } from 'react';

import { Controller } from 'react-hook-form';

import * as Popover from '@radix-ui/react-popover';

import { Command } from 'cmdk';

import { ChevronDown, Check } from 'lucide-react';

import { InputLabel } from './InputLabel';
import { InputError } from './InputError';

export const ComboboxField = ({
  control,
  name,
  label,
  options,
  error,
  placeholder = 'Select an option',
  getOptionValue,
  renderOption,
  searchBy,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filteredOptions = useMemo(() => {
    if (!search.trim()) {
      return options;
    }

    return options.filter((option) =>
      searchBy(option)
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [options, search, searchBy]);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <InputLabel htmlFor={name}>
          {label}
        </InputLabel>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => {
          const selected = options.find(
            (option) =>
              getOptionValue(option) === field.value,
          );

          return (
            <Popover.Root
              open={open}
              onOpenChange={setOpen}
            >
              <Popover.Trigger asChild>
                <button
                  type="button"
                  className="
                    flex h-11 w-full items-center justify-between
                    rounded-lg border border-zinc-200
                    bg-white px-3 text-left
                    hover:border-zinc-300
                  "
                >
                  <div className="truncate">
                    {selected ? (
                      renderOption(selected)
                    ) : (
                      <span className="text-zinc-400">
                        {placeholder}
                      </span>
                    )}
                  </div>

                  <ChevronDown size={16} />
                </button>
              </Popover.Trigger>

              <Popover.Portal>
                <Popover.Content
                  sideOffset={4}
                  className="
                    z-50 w-[var(--radix-popover-trigger-width)]
                    rounded-lg border border-zinc-200
                    bg-white shadow-lg
                  "
                >
                  <Command>
                    <Command.Input
                      value={search}
                      onValueChange={setSearch}
                      placeholder="Search..."
                      className="
                        h-10 w-full border-b
                        px-3 outline-none
                      "
                    />

                    <Command.List className="max-h-64 overflow-y-auto p-1">
                      {filteredOptions.length === 0 && (
                        <div className="p-3 text-sm text-zinc-500">
                          No results found.
                        </div>
                      )}

                      {filteredOptions.map((option) => {
                        const value =
                          getOptionValue(option);

                        const isSelected =
                          value === field.value;

                        return (
                          <Command.Item
                            key={value}
                            value={searchBy(option)}
                            onSelect={() => {
                              field.onChange(value);
                              setOpen(false);
                            }}
                            className="
                              flex cursor-pointer
                              items-center justify-between
                              rounded-md p-2
                              hover:bg-zinc-100
                            "
                          >
                            {renderOption(option)}

                            {isSelected && (
                              <Check size={16} />
                            )}
                          </Command.Item>
                        );
                      })}
                    </Command.List>
                  </Command>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          );
        }}
      />

      {error && (
        <InputError>
          {error.message}
        </InputError>
      )}
    </div>
  );
};