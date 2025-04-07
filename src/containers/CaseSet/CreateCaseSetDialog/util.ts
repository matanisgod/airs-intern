export interface CaseSetForm {
  caseYamlFile: File;
  expectedResultYamlFile: File;
  type: string;
  title: string;
}

interface CaseSetFormFieldProps {
  label: string;
  name: keyof CaseSetForm;
  type: 'text' | 'file';
}

export const caseSetFormField: Array<CaseSetFormFieldProps> = [
  { label: 'Case YAML File', name: 'caseYamlFile', type: 'file' },
  { label: 'Expected result YAML File', name: 'expectedResultYamlFile', type: 'file' },
  { label: 'Type', name: 'type', type: 'text' },
  { label: 'Title', name: 'title', type: 'text' },
];
