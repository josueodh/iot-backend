import AppError from "errors/AppError";
import { Request, Response } from "express";
import Measurement from "models/Measurement";
import { Between, Equal, getRepository, MoreThan, Not, Raw } from "typeorm";
class ChartMeasurementsPatientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { patient_id } = request.params;
    const date = request.query.date as String;
    const breakDate = date.split("-");
    const measurementsRepository = getRepository(Measurement);
    const measurements = await measurementsRepository.find({
      where: {
        patient_id,
        created_at: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${breakDate[2]}-${breakDate[1]}-${breakDate[0]}'`,
        ),
      },
      order: {
        created_at: "ASC",
      },
    });

    return response.json(measurements);
  }
}

export default ChartMeasurementsPatientController;
