export interface CalculatorLayoutProps {
  children?: React.ReactNode;
  calculatorTitle: string;
  template: any;
}

export interface FieldsI {
  label: string;
  type: string | any;
  id: string;
  placeholder: string;
  select: any;
}