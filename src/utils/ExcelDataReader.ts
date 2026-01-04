import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';

const PRODUCT_DIRS = [
  path.join('test-data'),
  path.join('src', 'test', 'resources', 'data'),
];

export class ExcelDataReader {
  static getWorkbook(productCode: string, ringSize: string) {
    // Try exact filename first, then fall back to a tolerant search in the product folder
    for (const base of PRODUCT_DIRS) {
      const productDir = path.join(base, productCode);
      const exactFile = path.join(productDir, `${productCode}-${ringSize}NO.xlsx`);
      if (fs.existsSync(exactFile)) {
        return XLSX.readFile(exactFile, { cellText: true, cellDates: false });
      }

      try {
        if (!fs.existsSync(productDir) || !fs.statSync(productDir).isDirectory()) continue;
        const files = fs.readdirSync(productDir);
        // keep only Excel-like files
        const candidates = files.filter(f => /\.(xlsx|xls|xlsm)$/i.test(f));
        if (candidates.length === 0) continue;

        const normalize = (s: string) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
        const prodNorm = normalize(productCode);
        const sizeNorm = normalize(ringSize);

        // Highest priority: filenames that contain product + size + 'no' (normalized)
        let match = candidates.find(f => {
          const n = normalize(f);
          return n.includes(prodNorm) && n.includes(sizeNorm) && n.includes('no');
        });

        // Next: filenames that contain product + size
        if (!match) {
          match = candidates.find(f => {
            const n = normalize(f);
            return n.includes(prodNorm) && n.includes(sizeNorm);
          });
        }

        // Next: filenames that contain product and 'no' and any digit sequence matching size
        if (!match) {
          match = candidates.find(f => {
            const n = normalize(f);
            return n.includes(prodNorm) && n.includes('no') && n.includes(sizeNorm);
          });
        }

        // Fallback: choose the first candidate that contains product code
        if (!match) {
          match = candidates.find(f => normalize(f).includes(prodNorm));
        }

        if (match) {
          const chosen = path.join(productDir, match);
          return XLSX.readFile(chosen, { cellText: true, cellDates: false });
        }
      } catch (e) {
        // ignore and try next base dir
      }
    }
    throw new Error(`Excel file not found for ${productCode} size ${ringSize} in any configured data dir`);
  }

  static get14KTWeight(productCode: string, ringSize: string): string | null {
    try {
      const wb = this.getWorkbook(productCode, ringSize);
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      // iterate rows and find cell with 14k
      const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = sheet[addr];
          if (!cell || !cell.v) continue;
          const val = String(cell.v).trim().toLowerCase();
          if (val === '14k' || val === '14kt') {
            const weightAddr = XLSX.utils.encode_cell({ r: R, c: C + 1 });
            const wCell = sheet[weightAddr];
            if (wCell && wCell.v) return String(wCell.v).trim();
          }
        }
      }
    } catch (e) {
      console.error('Error reading Excel file:', e.message || e);
    }
    return null;
  }

  static getMetalWeight(productCode: string, ringSize: string, metalType: string): string | null {
    try {
      const wb = this.getWorkbook(productCode, ringSize);
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
      const normalized = String(metalType).trim().toLowerCase();
      // build flexible candidates: full text, base metal, numeric (e.g., 950), kt variants
      const parts = normalized.split(/\s+/).filter(Boolean);
      const base = parts[0] || normalized;
      const numeric = parts.find(p => /\d{2,}/.test(p)) || '';
      // build flexible candidates including variants without spaces (e.g., Platinum950)
      const candidates = [
        normalized,
        normalized.replace(/kt/g, 'k'),
        normalized.replace(/\s+/g, ''),
        base,
        `${base} ${numeric}`.trim(),
        `${base}${numeric}`.trim(),
      ];
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = sheet[addr];
          if (!cell || !cell.v) continue;
          const val = String(cell.v).trim().toLowerCase();
          for (const cand of candidates) {
            if (!cand) continue;
            const candNorm = String(cand).trim().toLowerCase();
            const candNoSpace = candNorm.replace(/\s+/g, '');
            if (
              val === candNorm ||
              val === candNoSpace ||
              val === candNorm.replace(/k/g, 'kt') ||
              val.includes(candNorm) ||
              val.includes(candNoSpace)
            ) {
              // try adjacent cells to the right for a numeric weight (lookahead up to 6 cols)
              for (let c2 = C + 1; c2 <= C + 6; ++c2) {
                const weightAddr = XLSX.utils.encode_cell({ r: R, c: c2 });
                const wCell = sheet[weightAddr];
                if (wCell && wCell.v) {
                  const candidateVal = String(wCell.v).trim();
                  if (candidateVal && candidateVal !== '0' && !candidateVal.toLowerCase().includes('#n/a')) return candidateVal;
                }
              }
            }
          }
        }
      }
      // fallback: if no exact candidate matched, search for any cell containing the base metal token (space-insensitive)
      const baseToken = base.toLowerCase();
      for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = sheet[addr];
          if (!cell || !cell.v) continue;
          const val = String(cell.v).trim().toLowerCase();
          const valNoSpace = val.replace(/\s+/g, '');
          if (val.includes(baseToken) || valNoSpace.includes(baseToken)) {
            for (let c2 = C + 1; c2 <= C + 6; ++c2) {
              const weightAddr = XLSX.utils.encode_cell({ r: R, c: c2 });
              const wCell = sheet[weightAddr];
              if (wCell && wCell.v) {
                const candidateVal = String(wCell.v).trim();
                if (candidateVal && candidateVal !== '0' && !candidateVal.toLowerCase().includes('#n/a')) return candidateVal;
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('Error reading Excel file:', e.message || e);
    }
    return null;
  }

  static getNaturalStoneWeight(productCode: string, ringSize: string): string | null {
    try {
      const wb = this.getWorkbook(productCode, ringSize);
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
      
      // Find the header row with SHAPE, SIEVE SIZE, MM SIZE, PTS, QTY., WEIGHT
      let headerRow: number | null = null;
      let qtyCol: number | null = null;
      let weightCol: number | null = null;
      
      for (let R = 0; R <= 15; ++R) {
        for (let C = 0; C <= 10; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = sheet[addr];
          if (!cell || !cell.v) continue;
          const val = String(cell.v).trim().toUpperCase();
          if (val === 'SHAPE') {
            // Found shape column, look for QTY and WEIGHT in same row
            headerRow = R;
            for (let c2 = C; c2 <= C + 6; ++c2) {
              const h = XLSX.utils.encode_cell({ r: R, c: c2 });
              const hCell = sheet[h];
              if (hCell && hCell.v) {
                const hVal = String(hCell.v).trim().toUpperCase().replace(/\./g, '');
                if (hVal === 'QTY' || hVal === 'QTY') qtyCol = c2;
                if (hVal === 'WEIGHT') weightCol = c2;
              }
            }
            break;
          }
        }
        if (headerRow !== null) break;
      }
      
      if (headerRow !== null && qtyCol !== null && weightCol !== null) {
        // Read rows after header and find weight where QTY <= 5 (natural stone/solitaire)
        for (let r = headerRow + 1; r <= Math.min(headerRow + 30, range.e.r); ++r) {
          const qtyAddr = XLSX.utils.encode_cell({ r, c: qtyCol });
          const weightAddr = XLSX.utils.encode_cell({ r, c: weightCol });
          const qtyCell = sheet[qtyAddr];
          const weightCell = sheet[weightAddr];
          
          if (qtyCell && qtyCell.v && weightCell && weightCell.v) {
            const qty = parseFloat(String(qtyCell.v));
            const weight = parseFloat(String(weightCell.v));
            
            // Natural stone typically has QTY = 1 or small quantity (<=5)
            if (!isNaN(qty) && !isNaN(weight) && qty <= 5 && weight > 0) {
              return weight.toFixed(2);
            }
          }
        }
      }
      
      // Fallback: find cell "Dia Wt" then nearby (for older format)
      for (let R = 0; R <= 12; ++R) {
        for (let C = 0; C <= 12; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = sheet[addr];
          if (!cell || !cell.v) continue;
          const val = String(cell.v).toLowerCase();
          if (val.includes('dia wt') || val.includes('dia pcs')) {
            const weightAddr = XLSX.utils.encode_cell({ r: R, c: C + 1 });
            const wCell = sheet[weightAddr];
            if (wCell && wCell.v) return String(wCell.v).trim();
          }
        }
      }
    } catch (e) {
      console.error('Error reading Excel file:', e.message || e);
    }
    return null;
  }

  static getNaturalStoneShape(productCode: string, ringSize: string): string | null {
    try {
      const wb = this.getWorkbook(productCode, ringSize);
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
      
      // Find the header row with SHAPE, SIEVE SIZE, MM SIZE, PTS, QTY., WEIGHT
      let headerRow: number | null = null;
      let shapeCol: number | null = null;
      let qtyCol: number | null = null;
      
      for (let R = 0; R <= 15; ++R) {
        for (let C = 0; C <= 10; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = sheet[addr];
          if (!cell || !cell.v) continue;
          const val = String(cell.v).trim().toUpperCase();
          if (val === 'SHAPE' || val === 'SHAPE') {
            // Found shape column
            shapeCol = C;
            headerRow = R;
            // Look for QTY in same row
            for (let c2 = C; c2 <= C + 6; ++c2) {
              const h = XLSX.utils.encode_cell({ r: R, c: c2 });
              const hCell = sheet[h];
              if (hCell && hCell.v) {
                const hVal = String(hCell.v).trim().toUpperCase().replace(/\./g, '');
                if (hVal === 'QTY' || hVal === 'QTY') qtyCol = c2;
              }
            }
            break;
          }
        }
        if (headerRow !== null) break;
      }
      
      if (headerRow !== null && shapeCol !== null && qtyCol !== null) {
        // Read rows after header and find shape where QTY <= 5 (natural stone/solitaire)
        for (let r = headerRow + 1; r <= Math.min(headerRow + 30, range.e.r); ++r) {
          const qtyAddr = XLSX.utils.encode_cell({ r, c: qtyCol });
          const shapeAddr = XLSX.utils.encode_cell({ r, c: shapeCol });
          const qtyCell = sheet[qtyAddr];
          const shapeCell = sheet[shapeAddr];
          
          if (qtyCell && qtyCell.v && shapeCell && shapeCell.v) {
            const qty = parseFloat(String(qtyCell.v));
            const shape = String(shapeCell.v).trim().toUpperCase();
            
            // Natural stone typically has QTY = 1 or small quantity (<=5)
            if (!isNaN(qty) && qty <= 5 && shape.length > 0) {
              return shape;
            }
          }
        }
      }
    } catch (e) {
      console.error('Error reading Excel file for natural stone shape:', e.message || e);
    }
    return null;
  }

  static getSmallDiamondWeight(productCode: string, ringSize: string): string | null {
    try {
      const wb = this.getWorkbook(productCode, ringSize);
      const sheetName = wb.SheetNames[0];
      const sheet = wb.Sheets[sheetName];
      const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1:A1');
      
      // Find the header row with SHAPE, SIEVE SIZE, MM SIZE, PTS, QTY., WEIGHT
      let headerRow: number | null = null;
      let qtyCol: number | null = null;
      let weightCol: number | null = null;
      
      for (let R = 0; R <= 15; ++R) {
        for (let C = 0; C <= 10; ++C) {
          const addr = XLSX.utils.encode_cell({ r: R, c: C });
          const cell = sheet[addr];
          if (!cell || !cell.v) continue;
          const val = String(cell.v).trim().toUpperCase();
          if (val === 'SHAPE' || val === 'SHAPE') {
            // Found shape column, look for QTY and WEIGHT in same row
            headerRow = R;
            for (let c2 = C; c2 <= C + 6; ++c2) {
              const h = XLSX.utils.encode_cell({ r: R, c: c2 });
              const hCell = sheet[h];
              if (hCell && hCell.v) {
                const hVal = String(hCell.v).trim().toUpperCase().replace(/\./g, '');
                if (hVal === 'QTY' || hVal === 'QTY') qtyCol = c2;
                if (hVal === 'WEIGHT') weightCol = c2;
              }
            }
            break;
          }
        }
        if (headerRow !== null) break;
      }
      
      if (headerRow !== null && qtyCol !== null && weightCol !== null) {
        let totalWeight = 0;
        // Read rows after header and sum weights where QTY > 5
        for (let r = headerRow + 1; r <= Math.min(headerRow + 30, range.e.r); ++r) {
          const qtyAddr = XLSX.utils.encode_cell({ r, c: qtyCol });
          const weightAddr = XLSX.utils.encode_cell({ r, c: weightCol });
          const qtyCell = sheet[qtyAddr];
          const weightCell = sheet[weightAddr];
          
          if (qtyCell && qtyCell.v && weightCell && weightCell.v) {
            const qty = parseFloat(String(qtyCell.v));
            const weight = parseFloat(String(weightCell.v));
            
            if (!isNaN(qty) && !isNaN(weight) && qty > 5) {
              totalWeight += weight;
            }
          }
        }
        
        if (totalWeight > 0) {
          return totalWeight.toFixed(2);
        }
      }
    } catch (e) {
      console.error('Error reading Excel file for small diamond weight:', e.message || e);
    }
    return null;
  }
}
