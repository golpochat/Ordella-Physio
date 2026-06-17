import { type NextRequest, NextResponse } from "next/server";
import { loadPharmacyClinicalData } from "@/lib/pharmacy-clinical-data-bff";

export async function GET(request: NextRequest) {
  try {
    const { prescriptions } = await loadPharmacyClinicalData(request);
    return NextResponse.json(prescriptions);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load prescriptions.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
