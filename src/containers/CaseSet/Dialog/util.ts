export interface caseSetForm {
  caseYmlFile: string;
  erYmlFile: string;
  type: string;
  title: string;
}

interface formFieldInterface {
  label: string;
  name: keyof caseSetForm;
  type: 'text' | 'number';
}

export const formField: formFieldInterface[] = [
  { label: 'Case YAML File', name: 'caseYmlFile', type: 'text' },
  { label: 'Expected result YAML File', name: 'erYmlFile', type: 'text' },
  { label: 'Type', name: 'type', type: 'text' },
  { label: 'Title', name: 'title', type: 'text' },
];
