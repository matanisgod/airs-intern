export interface CaseSetForm {
  caseYmlFile: File;
  erYmlFile: File;
  type: string;
  title: string;
}

interface CaseSetFormFieldProps {
  label: string;
  name: keyof CaseSetForm;
  type: 'text' | 'file';
}

export const caseSetFormField: Array<CaseSetFormFieldProps> = [
  { label: 'Case YAML File', name: 'caseYmlFile', type: 'file' },
  { label: 'Expected result YAML File', name: 'erYmlFile', type: 'file' },
  { label: 'Type', name: 'type', type: 'text' },
  { label: 'Title', name: 'title', type: 'text' },
];
