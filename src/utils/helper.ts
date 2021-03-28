import { format } from "date-fns";
import ExcelMeasurementDTO from "dtos/ExcelMeasurementDTO";
import Measurement from "models/Measurement";

interface daysProps {
  created_at: Date;
}
interface arrayOfDiariesDay {
  date: Date;
}
export const uniqueDay = (arrayOfDays: daysProps[]) => {
  const days = arrayOfDays.map(day => format(day.created_at, "dd/MM/yyyy"));

  const uniqueDays = Array.from(new Set(days));

  return uniqueDays;
};

export const uniqueDiariesDay = (arrayOfDays: any[]) => {
  const days = arrayOfDays.map(day => format(day.date, "dd/MM/yyyy"));

  const uniqueDays = Array.from(new Set(days));

  return uniqueDays;
};

const getAVGHeart = (measurements: ExcelMeasurementDTO[]) => {
  return (
    measurements.reduce(
      (total, measurementHeart) => total + measurementHeart.heart_rate,
      0,
    ) / measurements.length
  );
};
const getAVGTemperature = (measurements: ExcelMeasurementDTO[]) => {
  return (
    measurements.reduce(
      (total, measurementTemperature) =>
        total + measurementTemperature.temperature,
      0,
    ) / measurements.length
  );
};
const getAVGSaturation = (measurements: ExcelMeasurementDTO[]) => {
  return (
    measurements.reduce(
      (total, measurementSaturation) =>
        total + measurementSaturation.blood_saturation,
      0,
    ) / measurements.length
  );
};

const getAVGArterialMax = (measurements: ExcelMeasurementDTO[]) => {
  return (
    measurements.reduce(
      (total, measurementArterialMax) =>
        total + measurementArterialMax.arterial_frequency_max,
      0,
    ) / measurements.length
  );
};

const getAVGArterialMin = (measurements: ExcelMeasurementDTO[]) => {
  return (
    measurements.reduce(
      (total, measurementArterialMin) =>
        total + measurementArterialMin.arterial_frequency_min,
      0,
    ) / measurements.length
  );
};
export const excelMeasurementsColumns = (
  measurements: Measurement[],
  days: string[],
) => {
  const measurementsForDays = days.map(day => {
    return measurements.filter(measurement => {
      return format(measurement.created_at, "dd/MM/yyyy") === day;
    });
  });

  return measurementsForDays.map(measurement => {
    return {
      temperature: getAVGTemperature(measurement),
      heart_rate: getAVGHeart(measurement),
      blood_saturation: getAVGSaturation(measurement),
      arterial_frequency_max: getAVGArterialMax(measurement),
      arterial_frequency_min: getAVGArterialMin(measurement),
    };
  });
};

export const weekRowsMeasurements = (measurements: ExcelMeasurementDTO[]) => {
  return {
    temperature: getAVGTemperature(measurements),
    heart_rate: getAVGHeart(measurements),
    blood_saturation: getAVGSaturation(measurements),
    arterial_frequency_max: getAVGArterialMax(measurements),
    arterial_frequency_min: getAVGArterialMin(measurements),
  };
};
