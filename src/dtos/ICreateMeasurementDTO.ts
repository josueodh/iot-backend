export default interface ICreateMeasurementDTO {
  temperature: number;
  heart_rate: number;
  arterial_frequency_min: number;
  arterial_frequency_max: number;
  blood_saturation: number;
  patient_id: string;
  time?: Date;
}
