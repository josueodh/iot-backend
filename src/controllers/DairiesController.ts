import ICreateDiaryDTO from 'dtos/ICreateDiaryDTO';
import { Request, Response } from 'express';
import Diary from 'models/Diary';
import { getRepository } from 'typeorm';
class DiariesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const diariesRepository = getRepository(Diary);

    const diaries = await diariesRepository.find();

    return response.status(200).json(diaries);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { patient_id, sleep, walk }: ICreateDiaryDTO = request.body;

    const diariesRepository = getRepository(Diary);

    const diary = await diariesRepository.create({
      patient_id,
      sleep,
      walk,
    });

    await diariesRepository.save(diary);

    return response.status(200).json(diary);
  }
}

export default DiariesController;
