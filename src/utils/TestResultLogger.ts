import * as fs from 'fs';
import * as path from 'path';

type Row = {
  timestamp: string;
  scenario?: string;
  step: string;
  key?: string;
  product?: string;
  size?: string;
  category?: string;
  variant?: string;
  actual: string | null;
  expected: string | null;
};

const OUT_DIR = path.join('test-output', 'csv');

function ensureDir() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
}

function csvEscape(v: any) {
  if (v === null || v === undefined) return '';
  const s = String(v);
  if (s.includes(',') || s.includes('"') || s.includes('\n')) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

export class TestResultLogger {
  static getCsvPath(productCode: string, ringSize: string) {
    const base = `${productCode}-${ringSize}NO.csv`;
    return path.join(OUT_DIR, base);
  }

  static initFresh(productCode: string, ringSize: string) {
    try {
      ensureDir();
      const csvPath = this.getCsvPath(productCode, ringSize);
      if (fs.existsSync(csvPath)) {
        fs.unlinkSync(csvPath);
      }
      const header = 'timestamp,product,size,category,variant,scenario,step,key,actual,expected\n';
      fs.writeFileSync(csvPath, header, { encoding: 'utf8' });
    } catch (e) {
      // don't fail tests because cleaning failed
      // eslint-disable-next-line no-console
      console.error('Failed to init fresh CSV file:', e && (e as Error).message ? (e as Error).message : e);
    }
  }

  static appendRow(productCode: string, ringSize: string, row: Row) {
    try {
      ensureDir();
      const csvPath = this.getCsvPath(productCode, ringSize);
      const writeHeader = !fs.existsSync(csvPath);
      const header = 'timestamp,product,size,category,variant,scenario,step,key,actual,expected';
      const line = [row.timestamp, row.product || '', row.size || '', row.category || '', row.variant || '', row.scenario || '', row.step, row.key || '', row.actual || '', row.expected || '']
        .map(csvEscape)
        .join(',') + '\n';
      const toWrite = (writeHeader ? header + '\n' : '') + line;
      fs.appendFileSync(csvPath, toWrite, { encoding: 'utf8' });
    } catch (e) {
      // don't fail tests because logging failed
      // log to console for diagnostics
      // eslint-disable-next-line no-console
      console.error('Failed to write test result CSV:', e && (e as Error).message ? (e as Error).message : e);
    }
  }
}
