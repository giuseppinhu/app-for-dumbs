import type { Request, Result } from "../global.types";
declare const request: (req: Request) => Promise<Result<string>>;
export { request };
