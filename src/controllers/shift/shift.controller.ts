import { catchAsync } from '@/utils/catch-async.utils';
import { RequestHandler } from 'express';
import ShiftService from '@/services/shift.service';
import StatusCode from '@/constants/status-code.constants';
import { TimeEntryInput } from '@/types/times-entries.types';

export class ShiftController {
  startShift: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.userId;
    const data: Partial<TimeEntryInput> = req.body;
    
    const timeEntry = await ShiftService.startShift(userId, data);
    
    res.status(StatusCode.CREATED).json({
      message: 'Início de turno registrado com sucesso',
      data: timeEntry
    });
  });
  
  endShift: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.userId;
    const data: Partial<TimeEntryInput> = req.body;
    
    const timeEntry = await ShiftService.endShift(userId, data);
    
    res.status(StatusCode.OK).json({
      message: 'Fim de turno registrado com sucesso',
      data: timeEntry
    });
  });
  
  getCurrentShift: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.userId;
    
    const currentShift = await ShiftService.getCurrentShift(userId);
    
    if (!currentShift) {
      res.status(StatusCode.OK).json({
        message: 'Não há turno em andamento',
        data: null
      });
      return;
    }
    
    res.status(StatusCode.OK).json({
      message: 'Turno em andamento encontrado',
      data: currentShift
    });
  });
  
  getShiftHistory: RequestHandler = catchAsync(async (req, res) => {
    const userId = req.userId;
    const limit = req.query.limit ? Number(req.query.limit) : 10;
    const offset = req.query.offset ? Number(req.query.offset) : 0;
    
    const history = await ShiftService.getShiftHistory(userId, limit, offset);
    
    res.status(StatusCode.OK).json({
      message: 'Histórico de turnos recuperado com sucesso',
      data: history
    });
  });
}

export default new ShiftController();
