import { Input } from "@/components/ui/input";

interface CustomInputProps extends React.ComponentPropsWithoutRef<"input"> {
  icon?: React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = ({
  icon,
  className,
  ...props
}) => {
  return (
    <div className="relative">
      {icon && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          {icon}
        </div>
      )}
      <Input {...props} className={`pl-10 ${className}`} />
    </div>
  );
};

export default CustomInput;
