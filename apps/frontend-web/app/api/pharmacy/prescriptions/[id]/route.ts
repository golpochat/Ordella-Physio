import { type NextRequest, NextResponse } from "next/server";
import { loadPharmacyClinicalData } from "@/lib/pharmacy-clinical-data-bff";

type RouteContext = { params: { id: string } };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { prescriptions } = await loadPharmacyClinicalData(request);
    const prescription = prescriptions.find((item) => item.id === context.params.id) ?? null;
    if (!prescription) {
      return NextResponse.json({ message: "Prescription not found." }, { status: 404 });
    }
    return NextResponse.json(prescription);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load prescription.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
