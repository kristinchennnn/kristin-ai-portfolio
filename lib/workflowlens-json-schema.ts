import { z } from "zod";
import { analysisSchema } from "./workflowlens";

// Keep the model's structured-output contract identical to runtime validation.
export const analysisJsonSchema = z.toJSONSchema(analysisSchema, { target: "draft-07" });
