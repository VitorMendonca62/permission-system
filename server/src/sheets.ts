import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL as string,
  key: process.env.GOOGLE_PRIVATE_KEY as string,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const docId = process.env.DOCID as string;

const doc = new GoogleSpreadsheet(docId, serviceAccountAuth);

const takeSheet = async () => {
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];

  return sheet;
};

const sheet = takeSheet();

export default sheet;
