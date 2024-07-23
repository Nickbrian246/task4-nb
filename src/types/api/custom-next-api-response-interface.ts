import { NextApiResponse } from "next";
import { ApiFailureResponse } from "./api-response-interface";

export interface CustomNextApiResponse<Response>
  extends NextApiResponse<Response | ApiFailureResponse> {}

export interface ApiSuccessResponseWithMetadata<T, V> {
  data: T;
  medaData: V;
}
