export interface caseSetForm {
  //TODO: yaml 파일 두 개
  type: string;
  title: string;
}

interface formFieldInterface {
  label: string;
  name: keyof caseSetForm;
  type: 'text' | 'number';
}

export const formField: formFieldInterface[] = [
  { label: 'Type', name: 'type', type: 'text' },
  { label: 'Title', name: 'title', type: 'text' },
];
