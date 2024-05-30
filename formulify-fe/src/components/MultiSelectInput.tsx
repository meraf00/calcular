import { useState } from 'react';
import {
  PillsInput,
  Pill,
  Combobox,
  CheckIcon,
  Group,
  useCombobox,
} from '@mantine/core';

export interface MultiSelectProps {
  dataBuilder?: (value: string) => {
    value: string;
    label: string;
  }[];

  onChange?: (values: string[]) => void;
}

export const MultiSelectInput = ({
  dataBuilder,
  onChange,
}: MultiSelectProps) => {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex('active'),
  });

  const [search, setSearch] = useState('');
  const [value, setValue] = useState<string[]>([]);

  const handleValueSelect = (val: string) =>
    setValue((current) => {
      const newValue = [...current, val];
      onChange && onChange(newValue);
      return newValue;
    });

  const handleValueRemove = (valIndex: number) =>
    setValue((current) => {
      const newValue = [
        ...current.slice(0, valIndex),
        ...current.slice(valIndex + 1, current.length),
      ];
      onChange && onChange(newValue);
      return newValue;
    });

  const getLabel = (value: string) => {
    const item = dataBuilder
      ? dataBuilder(search).find(
          (item) => item.label.toLowerCase() === value.toLowerCase()
        )
      : undefined;
    return item ? item.label : value;
  };

  const values = value.map((item, i) => (
    <Pill
      key={i}
      onClick={() => handleValueRemove(i)}
      className="cursor-pointer"
    >
      {getLabel(item)}
    </Pill>
  ));

  const options =
    dataBuilder === undefined
      ? []
      : dataBuilder(search)
          .filter((item) =>
            item.value.toLowerCase().includes(search.trim().toLowerCase())
          )
          .map((item) => (
            <Combobox.Option
              value={item.value}
              key={item.value}
              active={value.includes(item.value)}
            >
              <Group gap="sm">
                {value.includes(item.value) ? <CheckIcon size={12} /> : null}
                <span>{item.label}</span>
              </Group>
            </Combobox.Option>
          ));

  return (
    <Combobox store={combobox} onOptionSubmit={handleValueSelect}>
      <Combobox.DropdownTarget>
        <PillsInput onClick={() => combobox.openDropdown()}>
          <Pill.Group>
            {values}

            <Combobox.EventsTarget>
              <PillsInput.Field
                onFocus={() => combobox.openDropdown()}
                onBlur={() => combobox.closeDropdown()}
                value={search}
                placeholder="Search values"
                onChange={(event) => {
                  combobox.updateSelectedOptionIndex();
                  setSearch(event.currentTarget.value);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Backspace' && search.length === 0) {
                    event.preventDefault();
                    handleValueRemove(value.length - 1);
                  }
                }}
              />
            </Combobox.EventsTarget>
          </Pill.Group>
        </PillsInput>
      </Combobox.DropdownTarget>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length > 0 ? (
            options
          ) : (
            <Combobox.Empty>Nothing found...</Combobox.Empty>
          )}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
};
