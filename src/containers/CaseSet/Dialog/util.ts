export interface CaseSetForm {
  caseYmlFile: string;
  erYmlFile: string;
  type: string;
  title: string;
}

interface CaseSetFormFieldProps {
  label: string;
  name: keyof CaseSetForm;
  type: 'text' | 'number';
}

export const caseSetFormField: Array<CaseSetFormFieldProps> = [
  { label: 'Case YAML File', name: 'caseYmlFile', type: 'text' },
  { label: 'Expected result YAML File', name: 'erYmlFile', type: 'text' },
  { label: 'Type', name: 'type', type: 'text' },
  { label: 'Title', name: 'title', type: 'text' },
];
