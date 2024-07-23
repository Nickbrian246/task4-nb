import { ZodIssue } from "zod";

export class ForbiddenError extends Error {}
export interface ApiFailureResponse {
  message: string;
  errors?: ZodIssue[];
}
