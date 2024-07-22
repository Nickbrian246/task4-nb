import { ZodIssue } from "zod";
export interface ApiFailureResponse {
  message: string;
  errors?: ZodIssue[];
}
