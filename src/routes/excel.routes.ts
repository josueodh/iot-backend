import ExcelMeasurementsController from "controllers/ExcelMeasurementsController";
import { Router } from "express";
import ensureAuthenticated from "middleware/ensureAuthenticated";

const excelRouter = Router();
const excelMeasurementsController = new ExcelMeasurementsController();
excelRouter.use(ensureAuthenticated);

excelRouter.get("/:patient_id", excelMeasurementsController.create);
export default excelRouter;
