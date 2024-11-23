import React, { useEffect } from "react";
import styles from "./styles.module.scss";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Checkbox } from "@/components/ui/checkbox";

const DropdownFilterButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const categories = ["bedroom", "living-room", "kitchen", "bathroom"];
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    new URLSearchParams(location.search).get("categories")?.split(",") || []
  );

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log("params: ", params);
    if (selectedCategories.length > 0) {
      params.set("categories", selectedCategories.join(","));
    } else {
      params.delete("categories");
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }, [selectedCategories, navigate]);

  return (
    <div className={cn("flex items-center space-x-2")}>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            Filter
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuSeparator />
          {categories.map((category) => (
            <DropdownMenuItem key={category} asChild>
              <div className="flex items-center">
                <Checkbox
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                  id={category}
                />
                <label htmlFor={category} className="ml-2">
                  {category}
                </label>
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default DropdownFilterButton;
