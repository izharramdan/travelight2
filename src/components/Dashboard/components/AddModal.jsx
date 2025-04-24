import React from "react";
import { Dialog, Button, Input } from "@material-tailwind/react";

const AddModal = ({
  open,
  onClose,
  onSubmit,
  title = "Add Item",
  fields = [],
  formData,
  setFormData,
}) => {
  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog open={open} handler={onClose} size="sm" className="p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
        {/* Header */}
        <div className="text-xl font-semibold text-gray-800 border-b pb-2">
          {title}
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {fields.map((field) => (
            <Input
              key={field.name}
              label={field.label}
              color={field.color || "blue"}
              placeholder={field.placeholder || field.label}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
            />
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="text" color="gray" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="filled" color="blue" onClick={onSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddModal;
