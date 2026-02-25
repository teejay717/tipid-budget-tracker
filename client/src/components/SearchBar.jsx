import React from 'react'
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from "lucide-react"

const SearchBar = ({value, onChange}) => {
    return (
        <Field className="max-w-sm text-white">
            <InputGroup>
                <InputGroupInput id="inline-start-input" 
                placeholder="Search..." 
                value={value}
                onChange={(e) => onChange(e.target.value)}
                />
                <InputGroupAddon align="inline-start">
                <SearchIcon className="text-muted-foreground" />
                </InputGroupAddon>
            </InputGroup>
        </Field>
    )
}

export default SearchBar