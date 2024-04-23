import { SearchRequest } from "../models/request/search-request";
import { BaseResponse } from "../models/response/base-response";
import { EmailMessage } from "../models/response/mail-response";


export class EmailService {
  private readonly BASE_URL = "http://localhost:3000/api/v1/mail"

  public async searchEmail(searchRequest: SearchRequest):Promise<BaseResponse<EmailMessage[]>> {
    try {
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchRequest)
      };
      const response = await fetch(`${this.BASE_URL}/search`, requestOptions);
      if(!response.ok) {
        throw new Error(`Error en la solicitud: ${response.statusText}`);
      }
      const resp: BaseResponse<EmailMessage[]> = await response.json();
      return resp
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  }
}