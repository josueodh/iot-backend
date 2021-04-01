import ICreateDiaryDTO from "dtos/ICreateDiaryDTO";
import { Request, Response } from "express";
import Diary from "models/Diary";
import Measurement from "models/Measurement";
import { getRepository } from "typeorm";
import ExcelJS from "exceljs";
import {
  excelMeasurementsColumns,
  uniqueDay,
  uniqueDiariesDay,
  weekRows,
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
      order: { time: "ASC" },
    });
    const diaries = await diariesRepository.find({
      where: { patient_id },
      order: { date: "ASC" },
    });
    const measurementDay = uniqueDay(measurements);
    const diaryDay = uniqueDiariesDay(diaries);
    console.log(measurementDay);
    const rows = excelMeasurementsColumns(measurements, measurementDay);
    const excelWeekRows = weekRows(rows, diaries);
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
        header: day + " - SP02",
        width: 20,
      });
    });
    excelRows.push(
      excelWeekRows.walk,
      excelWeekRows.walk,
      excelWeekRows.temperature,
      excelWeekRows.heart_rate,
      excelWeekRows.arterial_frequency_max +
        "/" +
        excelWeekRows.arterial_frequency_min,
      excelWeekRows.blood_saturation,
    );
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
