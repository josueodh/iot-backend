export default interface IUpdatePatientDTO {
  name: string;
  cpf: string;
  cep: string;
  street: string;
  phone: string;
  number: string;
  complement?: string;
  neighborhood: string;
  pathology: string;
  city: string;
  state: string;
  born_date: Date;
  smartband: string;
  start: Date;
  observation: string;
  email: string;
}
