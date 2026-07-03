import { NextResponse } from "next/server";
import { env } from "@/lib/env";

export async function GET(): Promise<NextResponse> {
  return NextResponse.json({
    status: "ok",
    app: "ssmabe",
    version: env.commitSha.slice(0, 7),
    environment: env.vercelEnv,
  });
}
