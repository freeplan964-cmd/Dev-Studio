import { z } from "zod";

export const IdParamDto = z.object({
  id: z.string().uuid("Invalid ID format"),
});

export type IdParamDtoType = z.infer<typeof IdParamDto>;
