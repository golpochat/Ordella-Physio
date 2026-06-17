import { type NextRequest, NextResponse } from "next/server";
import { loadPharmacyClinicalData } from "@/lib/pharmacy-clinical-data-bff";

type RouteContext = { params: { id: string } };

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { fulfillment } = await loadPharmacyClinicalData(request);
    const order = fulfillment.find((item) => item.id === context.params.id) ?? null;
    if (!order) {
      return NextResponse.json({ message: "Fulfillment order not found." }, { status: 404 });
    }
    return NextResponse.json(order);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to load fulfillment order.";
    return NextResponse.json({ message }, { status: 502 });
  }
}
