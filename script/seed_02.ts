// @ts-nocheck

import postgres from 'postgres';
import * as csv from 'fast-csv';
import * as fs from 'fs';
import * as path from 'path';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CONNECTION_STRING = '...';

const sql = postgres(CONNECTION_STRING)

const isNumber = (value: string) => {
  return !isNaN(Number(value));
}

let count = 0;

fs.createReadStream(path.resolve(__dirname, 'outcomes.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('data', async (row) => {
    let { undl_id, resolution, session, date, title, modality, draft, agenda_title } = row;

    let emergency = false;
    let special = false;

    if (!isNumber(session)) {
      if (session.includes('em')) {
        emergency = true;
      }

      if (session.includes('sp')) {
        special = true;
      }

      session = parseInt(session.replace(/\D/g, ''));
    }

    const voted = modality !== 'Without a vote';

    await sql`
      INSERT INTO reso (undl_id, session, special, emergency, symbol, drafts, title, agenda, date, voted)
      VALUES (${undl_id}, ${session}, ${special}, ${emergency}, ${resolution}, ${draft}, ${title}, ${agenda_title}, ${date}, ${voted})
      ON CONFLICT (undl_id) DO UPDATE SET date = EXCLUDED.date
    `;

    count++;
    console.log(`${count}/20762`);
  })

