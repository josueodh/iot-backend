import AppError from "../errors/AppError";
import Patient from "../models/Patient";
import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { ICreatePatientDTO } from "../dtos/ICreatePatientDTO";
import IUpdatePatientDTO from "../dtos/IUpdatePatientDTO";

class PatientsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const patientsRepository = getRepository(Patient);

    const patients = await patientsRepository.find();

    return response.json(patients);
  }

  public async create(request: Request, response: Response) {
    const {
      name,
      cep,
      street,
      phone,
      number,
      complement,
      neighborhood,
      pathology,
      city,
      state,
      born_date,
      smartband,
      start,
      observation,
      email,
      cpf,
    }: ICreatePatientDTO = request.body;

    const patientsRepository = getRepository(Patient);
    const findPatient = await patientsRepository.findOne({
      where: { cpf },
    });

    if (findPatient) {
      throw new AppError("Patient already exists");
    }
    const patient = patientsRepository.create({
      name,
      cep,
      street,
      phone,
      number,
      complement,
      neighborhood,
      pathology,
      city,
      state,
      born_date,
      smartband,
      start,
      observation,
      email,
      cpf,
    });

    await patientsRepository.save(patient);

    return response.json(patient);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const patientsRepository = getRepository(Patient);

    const patient = await patientsRepository.findOne(id);

    if (!patient) {
      throw new AppError("Patient not found");
    }

    return response.json(patient);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cep,
      street,
      phone,
      number,
      complement,
      neighborhood,
      pathology,
      city,
      state,
      born_date,
      smartband,
      start,
      observation,
      cpf,
    }: IUpdatePatientDTO = request.body;

    const { id } = request.params;

    const patientsRepository = getRepository(Patient);
    const patient = await patientsRepository.findOne(id);

    if (!patient) {
      throw new AppError("Patient not found");
    }

    patient.name = name;
    patient.cep = cep;
    patient.street = street;
    patient.phone = phone;
    patient.number = number;
    patient.neighborhood = neighborhood;
    patient.pathology = pathology;
    patient.city = city;
    patient.state = state;
    patient.born_date = born_date;
    patient.smartband = smartband;
    patient.start = start;
    patient.observation = observation;

    if (complement) {
      patient.complement = complement;
    } else {
      delete patient.complement;
    }

    patientsRepository.save(patient);
    return response.json({ patient });
  }
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const patientsRepository = getRepository(Patient);

    const patient = await patientsRepository.findOne(id);

    if (!patient) {
      throw new AppError("Patient not found");
    }

    patientsRepository.remove(patient);

    return response.json();
  }
}

export default PatientsController;
