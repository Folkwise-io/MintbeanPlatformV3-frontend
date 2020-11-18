type RefReturn<TargetFieldT> =
  | string
  | ((instance: TargetFieldT | null) => void)
  | React.RefObject<TargetFieldT>
  | null
  | undefined;

export type Option = {
  label: React.ReactNode;
  value: string | number | string[];
};
export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
  options: Option[];
} & HTMLSelectElement;

// Typings supplied from react-hook-forms documentation
// https://react-hook-form.com/get-started#Integratinganexistingform
