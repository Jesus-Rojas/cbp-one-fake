import { Appointment } from '@cbp-one-fake/api-interfaces';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as handlebars from 'handlebars';
import * as htmlPdf from 'html-pdf'
import * as path from 'path';
import * as os from 'os';
import moment from 'moment';

@Injectable()
export class PdfService {
  options: htmlPdf.CreateOptions = {
    format: 'A4',
    border: {
      top: '1.8cm',
      bottom: '1.8cm',
      left: '2cm',
      right: '2cm',
    },
  };
  rootPath = '';

  constructor () {
    process.env['OPENSSL_CONF'] = '/dev/null';
    this.rootPath = os.platform() === 'win32'
      ? __dirname.split('\\dist\\')[0]
      : __dirname.split('/dist/')[0]
  }

  async generate({ place, dateTime, travelers }: Appointment) {
    const pathTemplateFile = path.join(this.rootPath, 'templates', 'pdfs', 'appointment.hbs');
    const source = fs.readFileSync(pathTemplateFile, 'utf8');
    const template = handlebars.compile(source);
    const html = template({
      travelers: travelers.map((traveler) => (`
        <div>
          <br />
          <br />
          ${traveler.name}
          <br />
          ${moment(traveler.birthday).format("MM/DD/YYYY")} (MM/DD/YYYY)
          <br />
          ${traveler.numberOfConfirmation}
        </div>
      `)).join(''),
      place,
      date: moment(dateTime).format('MM/DD/YYYY'),
      time: moment(dateTime).format('HH:mm'),
    });
    return this.getBuffer(html)
  }

  getBuffer(html: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      htmlPdf.create(html, this.options).toBuffer((err, buffer) => {
        if (err) {
          reject(err)
          return;
        }
        resolve(buffer)
      })
    })
  }

}
