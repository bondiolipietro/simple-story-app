import { AxiosResponse } from 'axios'
import { ServiceBase } from './base/ServiceBase'

class GenericService extends ServiceBase {
  constructor() {
    super({
      BaseUrl: '',
    })
  }

  /**
   * Receives the api path to an specific file and returns the axios response with file content.
   * @param   {string} filePath
   * @param   {string} fileName The name that'll be assigned to the file.
   * @return  {Promise<AxiosResponse<File>>} Axios response containing the @type {File}
   */
  public async getFile(filePath: string, fileName: string): Promise<AxiosResponse<File>> {
    const response = await this.http.get<File>(filePath, {
      responseType: 'blob',
      transformResponse: (data: Blob) => new File([data], fileName, { type: data.type }),
    })

    return response
  }
}

const genericService = new GenericService()

export { genericService }
