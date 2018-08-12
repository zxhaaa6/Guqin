const messageType = {
  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  406: 'Not Acceptable',
  500: 'Internal Server Error',
};

interface IPageInfo {
  totalCount: string;
  pageCount: string;
  pageSize: number;
  pageNum: number;
}

class BasicMessage {
  public static genMessageTitle(errorCode) {
    return `${messageType[errorCode]}: `;
  }
  public success: boolean;
  public status: number;
  public message: string;
  public data: any;

  constructor(
    isSuccess: boolean,
    status: number,
    message: string,
    data: any = {},
  ) {
    this.success = isSuccess;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default BasicMessage;
