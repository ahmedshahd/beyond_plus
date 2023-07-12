import { Injectable } from '@nestjs/common';
import * as sendgrid from '@sendgrid/mail';

@Injectable()
export class SendemailService {
  constructor() {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendEmail(mobileNumber: string, subject: string, content: string,name?:string) {
    const message = {
      to: 'ahmed.shahd@beyond-solution.com',
      from: 'ahmedshahd350@gmail.com', // Replace with your email address
      subject,
      text: `${content} \n This email is sent from ${name} whose mobile number is ${mobileNumber}.`,
    };
    console.log('message', message);

    // await sendgrid.send(message);

    // return {
    //   statusCode: 200,
    //   message: 'Email sent',
    // }

    return await sendgrid.send(message);
  }
}
