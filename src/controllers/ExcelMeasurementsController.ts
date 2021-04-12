import { Request, Response } from "express";
import Diary from "../models/Diary";
import Measurement from "../models/Measurement";
import { getRepository } from "typeorm";
import ExcelJS from "exceljs";
import {
  excelMeasurementsColumns,
  uniqueDay,
  uniqueDiariesDay,
  weekRows,
} from "../utils/helper";
import { weekHeaderExcel } from "../utils/weekHeaderExcel";
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
      order: { time: "ASC" },
    });
    const diaries = await diariesRepository.find({
      where: { patient_id },
      order: { date: "ASC" },
    });
    const measurementDay = uniqueDay(measurements);
    const diaryDay = uniqueDiariesDay(diaries);
    const rows = excelMeasurementsColumns(measurements, measurementDay);
    const excelWeekRows = weekRows(rows, diaries);
    const excelRows: any = [];
    diaries.map(diary => {
      excelRows.push(diary.walk, diary.sleep);
    });

    let headerExcel: excelJSFormat[] = [];
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Planilha Paciente");
    worksheet.columns = weekHeaderExcel;
    console.log(diaries);
    rows.forEach((row, index) => {
      worksheet.addRow([
        measurementDay[index],
        diaries[index].walk,
        diaries[index].sleep,
        row.temperature,
        row.heart_rate,
        row.arterial_frequency_max,
        row.arterial_frequency_min,
        row.blood_saturation,
      ]);
    });
    worksheet.addRow([
      "Média Semanal",
      excelWeekRows.walk,
      excelWeekRows.walk,
      excelWeekRows.temperature,
      excelWeekRows.heart_rate,
      excelWeekRows.arterial_frequency_max,
      excelWeekRows.arterial_frequency_min,
      excelWeekRows.blood_saturation,
    ]);

    await workbook.xlsx.writeFile("users.xlsx");
    return response.status(200).json();
  }
}

export default ExcelMeasurementsController;
