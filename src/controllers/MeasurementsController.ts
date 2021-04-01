import { Request, Response } from "express";
import ICreateMeasurementDTO from "dtos/ICreateMeasurementDTO";
import Measurement from "models/Measurement";
import { getRepository, Raw, Repository } from "typeorm";
import format from "date-fns/format";
import AppError from "errors/AppError";
class MeasurementsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const measurementRepository = getRepository(Measurement);
    const measurements = await measurementRepository.find();

    return response.status(200).json(measurements);
  }
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      temperature,
      arterial_frequency_max,
      arterial_frequency_min,
      blood_saturation,
      heart_rate,
      patient_id,
      time,
    }: ICreateMeasurementDTO = request.body;
    const date = new Date(time);
    const measurementRepository = getRepository(Measurement);
    const findMeasurements = await measurementRepository.find({
      where: {
        patient_id,
      },
    });

    const findTimeMeasurements = findMeasurements.find(measurement => {
      return measurement.time.toString() === date.toString();
    });

    if (findTimeMeasurements) {
      throw new AppError("Time already in use");
    }

    const measurement = measurementRepository.create({
      arterial_frequency_max,
      arterial_frequency_min,
      blood_saturation,
      patient_id,
      temperature,
      heart_rate,
      time,
    });

    await measurementRepository.save(measurement);

    return response.status(200).json(measurement);
  }
}

export default MeasurementsController;
