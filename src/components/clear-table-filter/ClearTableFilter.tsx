import { Button } from "@mantine/core";

interface ClearTableFilterProps {
  handleClick: () => void;
  fullWidth?: boolean;
}

function ClearTableFilter({ handleClick, fullWidth, ...props }: ClearTableFilterProps) {
  return (
    <Button
      variant='default'
      color="primary"
      onClick={handleClick}
      w={fullWidth ? "100%" : 'auto'}
      {...props}
    >
      Clear Filters
    </Button>
  );
}

export default ClearTableFilter;