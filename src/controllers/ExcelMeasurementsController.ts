import { Request, Response } from "express";
import Diary from "../models/Diary";
import Measurement from "../models/Measurement";
import { getRepository } from "typeorm";
import ExcelJS from "exceljs";
import { excelMeasurementsColumns, uniqueDay, weekRows } from "../utils/helper";
import { weekHeaderExcel } from "../utils/weekHeaderExcel";
import Patient from "../models/Patient";
import * as aws from "aws-sdk";
import * as Stream from "stream";
import fs from "fs";
class ExcelMeasurementsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { patient_id } = request.params;
    const measurementsRepository = getRepository(Measurement);
    const diariesRepository = getRepository(Diary);
    const patientsRepository = getRepository(Patient);
    const patient = await patientsRepository.findOne({ id: patient_id });
    const measurements = await measurementsRepository.find({
      where: { patient_id },
      order: { time: "ASC" },
    });
    const diaries = await diariesRepository.find({
      where: { patient_id },
      order: { date: "ASC" },
    });
    const measurementDay = uniqueDay(measurements);
    const rows = excelMeasurementsColumns(measurements, measurementDay);
    const excelWeekRows = weekRows(rows, diaries);
    const excelRows: any = [];
    diaries.map(diary => {
      excelRows.push(diary.walk, diary.sleep);
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Planilha Paciente");
    worksheet.columns = weekHeaderExcel;
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

    if (patient) {
      worksheet.addRow([
        "Paciente",
        `Nome: ${patient.name}`,
        `Telefone: ${patient.phone}`,
        `E-mail: ${patient.email}`,
        `CPF: ${patient.cpf}`,
      ]);
    }
    const s3 = new aws.S3({
      region: process.env.AWS_BUCKET_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const stream = new Stream.PassThrough();

    workbook.xlsx
      .write(stream)
      .then(() => {
        return s3
          .upload({
            Key: `${patient?.cpf}.xlsx`,
            Bucket: "ufjf-healthier",
            Body: stream,
            ContentType:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
          .promise();
      })
      .catch(function (e) {
        console.log(e.message);
      })
      .then(
        function () {
          console.log("after a catch the chain is restored");
        },
        function () {
          console.log("Not fired due to the catch");
        },
      );
    var params = {
      Key: `${patient?.cpf}.xlsx`,
      Bucket: "ufjf-healthier",
    };

    response.attachment("ufjf-healthier");
    var fileStream = s3.getObject(params).createReadStream();
    fileStream.pipe(response);
    return response.status(200).json();
  }
}

export default ExcelMeasurementsController;
