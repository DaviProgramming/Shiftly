import { TimeEntryInput } from '@/types/times-entries.types';
import { BadRequestError, NotFoundError } from '@/utils/app.error';
import { EntryType } from '@/enums/entry-type.enum';
import UserRepository from '@/repositories/user.repository';
import TimeEntryRepository from '@/repositories/time-entry.repository';

export class ShiftService {
  async startShift(userId: string, data?: Partial<TimeEntryInput>) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const lastEntry = await TimeEntryRepository.getLastByUserId(userId);
    if (lastEntry && lastEntry.type === EntryType.CHECK_IN) {
      throw new BadRequestError('Já existe um turno em andamento. Finalize o turno atual antes de iniciar um novo.');
    }

    const entry = await TimeEntryRepository.create({
      user_id: userId,
      type: EntryType.CHECK_IN,
      timestamp: data?.timestamp || new Date(),
      latitude: data?.latitude,
      longitude: data?.longitude
    });

    return entry;
  }

  async endShift(userId: string, data?: Partial<TimeEntryInput>) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const lastEntry = await TimeEntryRepository.getLastByUserId(userId);
    if (!lastEntry || lastEntry.type === EntryType.CHECK_OUT) {
      throw new BadRequestError('Não há turno em andamento para finalizar.');
    }

    const entry = await TimeEntryRepository.create({
      user_id: userId,
      type: EntryType.CHECK_OUT,
      timestamp: data?.timestamp || new Date(),
      latitude: data?.latitude,
      longitude: data?.longitude
    });

    return entry;
  }

  async getCurrentShift(userId: string) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }
    
    const lastEntry = await TimeEntryRepository.getLastByUserId(userId);
    
    if (!lastEntry || lastEntry.type === EntryType.CHECK_OUT) {
      return null;
    }

    return {
      entry: lastEntry,
      startedAt: lastEntry.timestamp,
      isActive: true
    };
  }

  async getShiftHistory(userId: string, limit = 10, offset = 0) {
    const user = await UserRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    const entries = await TimeEntryRepository.getUserShiftHistory(userId, limit, offset);

    return entries;
  }
}

export default new ShiftService();
