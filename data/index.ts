import raw from './dummy.jsonc?raw';
import banquetRaw from './banquet.json';
import { parseJsonc } from '../utils/jsonc';
import { DummyData, BanquetData } from '../types';

const baseData = parseJsonc<any>(raw);
export const data: DummyData = {
    ...baseData,
    banquet: banquetRaw as BanquetData
};
