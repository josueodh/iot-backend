import { Request, Response } from "express";
import Measurement from "../models/Measurement";
import { getRepository, Raw } from "typeorm";
import { uniqueDay } from "../utils/helper";
class ChartMeasurementsPatientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { patient_id } = request.params;
    const date = request.query.date as String;
    const breakDate = date.split("-");
    const measurementsRepository = getRepository(Measurement);
    const measurements = await measurementsRepository.find({
      where: {
        patient_id,
        time: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${breakDate[2]}-${breakDate[1]}-${breakDate[0]}'`,
        ),
      },
      order: {
        time: "ASC",
      },
    });
    const measurementsDay = await measurementsRepository.find({
      where: { patient_id },
    });
    const days = uniqueDay(measurementsDay);
    return response.json({ measurements, days });
  }
}

export default ChartMeasurementsPatientController;
