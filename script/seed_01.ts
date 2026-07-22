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

const sql = postgres(CONNECTION_STRING);

const isNumber = (value: string) => {
  return !isNaN(Number(value));
}

let count = 0;

fs.createReadStream(path.resolve(__dirname, 'unga.csv'))
  .pipe(csv.parse({ headers: true }))
  .on('data', async (row) => {
    let { undl_id, ms_code, ms_vote, session, resolution, draft, title, agenda_title } = row;
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

    await sql`
      INSERT INTO reso (undl_id, session, symbol, drafts, title, agenda, emergency, special)
      VALUES (${undl_id}, ${session}, ${resolution}, ${draft}, ${title}, ${agenda_title}, ${emergency}, ${special})
      ON CONFLICT (undl_id) DO NOTHING
    `;

    await sql`
      INSERT INTO votes (undl_id, session, member_code, vote)
      VALUES (${undl_id}, ${session}, ${ms_code}, ${ms_vote})
    `;

    count++;
    console.log(`${count}/947434`);
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
