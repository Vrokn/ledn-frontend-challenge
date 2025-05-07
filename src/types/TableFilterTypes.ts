export interface Option {
  id: number;
  name: string;
}

export interface TemplateFilter {
  searchQuery: string;
  [key: string]: any;
}

export interface TableFilterProps {
  name: keyof TemplateFilter;
  label: string;
  value: number[];
  options: Option[];
  handleChange: (name: keyof TemplateFilter, value: number[]) => void;
}

export interface TableSearchProps {
  label?: string;
  value: string;
  handleChange: (name: keyof TemplateFilter, value: string) => void;
  placeholder?: string;
}
