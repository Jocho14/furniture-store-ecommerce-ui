import React from 'react';
import styles from './styles.module.scss';

import { ArrowDown, ArrowUp } from 'iconoir-react';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownButtonProps {
    setSortOrder: (order: "asc" | "desc") => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ setSortOrder }) => {
    const [sortOrderLabel, setSortOrderLabel] = React.useState<"Price Asc." | "Price Desc." | "Sort by price">("Sort by price");

    return (
        <div className={cn("flex items-center space-x-2")}>
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        {sortOrderLabel}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => { setSortOrder("asc"); setSortOrderLabel("Price Asc.") }}>
                        <ArrowUp className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Price Asc.
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => { setSortOrder("desc"); setSortOrderLabel("Price Desc.") }}>
                        <ArrowDown className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Price Desc.
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DropdownButton;