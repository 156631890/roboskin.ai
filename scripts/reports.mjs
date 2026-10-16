import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { database, transaction } from '../src/lib/membership/database.mjs';
import { membershipConfig } from '../src/lib/membership/config.mjs';
import { createWaffo } from '../src/lib/membership/waffo.mjs';
import { publishReport, validateReport } from '../src/lib/membership/reports.mjs';

const [command, file] = process.argv.slice(2);
let db;
try {
  if (command === 'check-waffo') {
    const config = membershipConfig();
    if (!config.ready) throw new Error('Configure the server settings described in docs/paid-reports.md first.');
    const waffo = createWaffo(config);
    await waffo.validateProduct();
    await waffo.order(randomUUID()); // Read-only schema/permission check against a deliberately absent reference.
    console.log('Waffo product, price, billing interval, and order-query contract verified. No checkout created.');
  } else if (command === 'validate') {
    if (!file) throw new Error('Specify a local report JSON file.');
    validateReport(JSON.parse(await readFile(file, 'utf8')));
    console.log('Report structure and approval record valid. Source accuracy still requires editorial review.');
  } else if (['migrate', 'publish', 'delivery-status'].includes(command)) {
    if (!process.env.REPORTS_DATABASE_URL) throw new Error('REPORTS_DATABASE_URL is required.');
    db = database(process.env.REPORTS_DATABASE_URL);
    if (command === 'migrate') {
      const sql = await readFile(new URL('../db/migrations/001-paid-reports.sql', import.meta.url), 'utf8');
      await transaction(db, tx => tx.query(sql));
      console.log('Paid report tables are ready.');
    } else if (command === 'publish') {
      if (!file) throw new Error('Specify the approved report JSON file outside the public directory.');
      const report = JSON.parse(await readFile(file, 'utf8'));
      console.log(`Published report ${await publishReport(db, report)}. Private content stays in the database.`);
    } else {
      const result = await db.query(`SELECT state,count(*)::integer AS count FROM report_deliveries GROUP BY state ORDER BY state`);
      console.log(JSON.stringify(result.rows));
    }
  } else throw new Error('Usage: node scripts/reports.mjs migrate | validate FILE | publish FILE | check-waffo | delivery-status');
} catch {
  // Provider/database errors may contain credentials or customer data; never echo raw exceptions.
  console.error('Report operation failed. Check the command, configuration, report validation and provider logs.');
  process.exitCode = 1;
} finally { if (db) await db.end(); }
