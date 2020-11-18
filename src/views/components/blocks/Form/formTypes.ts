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
// export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
//   options: Option[];
// } & HTMLSelectElement;
export type SelectProps = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> &
  HTMLSelectElement;
