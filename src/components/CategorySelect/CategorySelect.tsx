import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  categories: string[];
  onChange: (value: string) => void;
  initialCategory?: string;
}

const CategorySelect: React.FC<Props> = ({
  categories,
  onChange,
  initialCategory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || ""
  );

  useEffect(() => {
    setSelectedCategory(initialCategory || "");
  }, [initialCategory]);

  const handleValueChange = (value: string) => {
    setSelectedCategory(value);
    onChange(value);
  };
  return (
    <Select value={selectedCategory} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {categories?.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CategorySelect;
