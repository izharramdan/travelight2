import React from "react";
import { Menu, Button, Checkbox } from "@material-tailwind/react";
import { ArrowDown } from "iconoir-react";

const DropdownFilter = ({
  options,
  selectedOptions,
  onChange,
  placeholder = "Filter",
}) => {
  const handleCheckboxChange = (value) => {
    if (selectedOptions.includes(value)) {
      onChange(selectedOptions.filter((option) => option !== value));
    } else {
      onChange([...selectedOptions, value]);
    }
  };

  return (
    <Menu>
      <Menu.Trigger as={Button} color="secondary" className="text-gray-500">
        <span className="mr-2">{placeholder}</span>
        <ArrowDown className="h-3 w-3 text-gray-500" />
      </Menu.Trigger>
      <Menu.Content className="p-2 bg-white shadow-lg rounded-lg">
        {options.map((option) => (
          <Menu.Item
            key={option.value}
            as="label"
            htmlFor={option.value}
            className="flex items-center gap-2 pl-2"
            closeOnClick={false} // Prevent menu from closing on checkbox click
          >
            <Checkbox
              id={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="cursor-pointer"
            >
              <Checkbox.Indicator />
            </Checkbox>
            <span className="cursor-pointer">{option.label}</span>
          </Menu.Item>
        ))}
      </Menu.Content>
    </Menu>
  );
};

export default DropdownFilter;
