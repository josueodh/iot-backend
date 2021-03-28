import ICreateDiaryDTO from "dtos/ICreateDiaryDTO";
import { Request, Response } from "express";
import Diary from "models/Diary";
import Measurement from "models/Measurement";
import { getRepository } from "typeorm";
import ExcelJS from "exceljs";
import { format } from "date-fns";
import {
  excelMeasurementsColumns,
  uniqueDay,
  uniqueDiariesDay,
  weekRowsMeasurements,
} from "utils/helper";
import { weekHeaderExcel } from "utils/weekHeaderExcel";
interface excelJSFormat {
  header: string;
  width: number;
}

class ExcelMeasurementsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { patient_id } = request.params;
    const measurementsRepository = getRepository(Measurement);
    const diariesRepository = getRepository(Diary);
    const measurements = await measurementsRepository.find({
      where: { patient_id },
      order: { created_at: "ASC" },
    });
    const diaries = await diariesRepository.find({
      where: { patient_id },
      order: { created_at: "ASC" },
    });
    const measurementDay = uniqueDay(measurements);
    const diaryDay = uniqueDiariesDay(diaries);
    const rows = excelMeasurementsColumns(measurements, measurementDay);
    const weekRows = weekRowsMeasurements(rows);
    const excelRows: any = [];
    diaries.map(diary => {
      excelRows.push(diary.walk, diary.sleep);
    });
    rows.map(row => {
      excelRows.push(
        row.temperature,
        row.heart_rate,
        row.arterial_frequency_max + "/" + row.arterial_frequency_min,
        row.blood_saturation,
      );
    });
    excelRows.push(
      weekRows.temperature,
      weekRows.heart_rate,
      weekRows.arterial_frequency_max + "/" + weekRows.arterial_frequency_min,
      weekRows.blood_saturation,
    );
    let headerExcel: excelJSFormat[] = [];
    diaryDay.forEach(day => {
      headerExcel.push(
        {
          header: day + " - Passos",
          width: 20,
        },
        {
          header: day + "- Sono",
          width: 20,
        },
      );
    });
    measurementDay.forEach(day => {
      headerExcel.push({
        header: day + " - Temperatura",
        width: 20,
      });
      headerExcel.push({
        header: day + " - FC",
        width: 20,
      });
      headerExcel.push({
        header: day + " - FA",
        width: 20,
      });
      headerExcel.push({
        header: day + " - Saturação Sanguinea",
        width: 20,
      });
    });
    headerExcel = headerExcel.concat(weekHeaderExcel);
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Planilha Paciente");
    worksheet.columns = headerExcel;
    worksheet.addRow(excelRows);

    await workbook.xlsx.writeFile("users.xlsx");
    return response.status(200).json();
  }
}

export default ExcelMeasurementsController;
