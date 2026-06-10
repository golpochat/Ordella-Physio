"use client";

import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useApi } from "@/hooks/useApi";
import { useClinicPortalApi } from "@/hooks/useClinicPortal";
import { useMessagingContext } from "@/hooks/useMessaging";
import { useTherapistPortalApi } from "@/hooks/useTherapistPortal";
import { createClinicPortalApi, normalizeList } from "@/lib/clinic-portal-api";
import {
  mapPatientsToParticipants,
  mapStaffToParticipants,
} from "@/lib/messaging-participants";
import { createTherapistPortalApi, normalizePatientList } from "@/lib/therapist-portal-api";
import { useTenant } from "@/hooks/useTenant";

export function useMessagingParticipants() {
  const api = useApi();
  const { tenantId } = useTenant();
  const { role } = useMessagingContext();
  const clinicApi = useClinicPortalApi();
  const therapistApi = useTherapistPortalApi();

  const staffQuery = useQuery({
    queryKey: ["messaging", "participants", "staff", tenantId],
    queryFn: async () => {
      if (clinicApi) {
        const staff = await clinicApi.listStaff();
        return mapStaffToParticipants(Array.isArray(staff) ? staff : []);
      }

      if (!tenantId) return [];

      const fallbackApi = createClinicPortalApi(api, tenantId);
      const staff = await fallbackApi.listStaff();
      return mapStaffToParticipants(Array.isArray(staff) ? staff : []);
    },
    enabled: Boolean(tenantId),
  });

  const patientsQuery = useQuery({
    queryKey: ["messaging", "participants", "patients", tenantId, role],
    queryFn: async () => {
      if (clinicApi) {
        const patients = await clinicApi.listPatients({ limit: 100 });
        return mapPatientsToParticipants(normalizeList(patients));
      }

      if (therapistApi) {
        const patients = await therapistApi.listPatients({ limit: 100 });
        return mapPatientsToParticipants(normalizePatientList(patients));
      }

      if (!tenantId) return [];

      const fallbackTherapistApi = createTherapistPortalApi(api);
      const patients = await fallbackTherapistApi.listPatients({ limit: 100 }).catch(() => []);
      return mapPatientsToParticipants(normalizePatientList(patients));
    },
    enabled: Boolean(tenantId) && role !== "PATIENT",
  });

  return useMemo(() => {
    const unique = new Map<string, ReturnType<typeof mapStaffToParticipants>[number]>();
    for (const option of [...(staffQuery.data ?? []), ...(patientsQuery.data ?? [])]) {
      unique.set(option.userId, option);
    }
    return {
      participants: Array.from(unique.values()),
      isLoading: staffQuery.isLoading || patientsQuery.isLoading,
    };
  }, [patientsQuery.data, patientsQuery.isLoading, staffQuery.data, staffQuery.isLoading]);
}
