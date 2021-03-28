import format from "date-fns/format";
import ICreateDiaryDTO from "dtos/ICreateDiaryDTO";
import AppError from "errors/AppError";
import { Request, Response } from "express";
import Diary from "models/Diary";
import { getRepository, Raw } from "typeorm";
class DiariesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const diariesRepository = getRepository(Diary);

    const diaries = await diariesRepository.find();

    return response.status(200).json(diaries);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { patient_id, sleep, walk, date }: ICreateDiaryDTO = request.body;
    const diariesRepository = getRepository(Diary);
    const transformDate = new Date(date);
    const auxDate = await diariesRepository.find({
      where: {
        patient_id,
      },
    });
    const checkIfExistDiaryInTheSameDate = auxDate.find(checkDate => {
      return (
        format(checkDate.date, "yyyy-MM-dd") ===
        format(transformDate, "yyyy-MM-dd")
      );
    });
    if (checkIfExistDiaryInTheSameDate) {
      throw new AppError("This date already has another diary");
    }
    const diary = diariesRepository.create({
      patient_id,
      sleep,
      walk,
      date,
    });

    await diariesRepository.save(diary);

    return response.status(200).json(diary);
  }
}

export default DiariesController;
