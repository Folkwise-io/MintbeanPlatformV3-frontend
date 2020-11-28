// Locally scoped typings to help with defining form-related blocks
// Typings supplied from react-hook-forms documentation
// https://react-hook-form.com/get-started#Integratinganexistingform

export type RefReturn<HTMLElementT> =
  | string
  | ((instance: HTMLElementT | null) => void)
  | React.RefObject<HTMLElementT>
  | null
  | undefined;

export interface Option {
  label: string;
  value: string | number | string[];
}

export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> &
  HTMLInputElement;

export type TextAreaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> &
  HTMLTextAreaElement;

export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> &
  HTMLSelectElement;
