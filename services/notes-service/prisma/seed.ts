import { PrismaClient, type NoteType } from "../src/generated/prisma";

const prisma = new PrismaClient();

const DEMO_TENANT_ID = "demo-tenant";
const DEMO_THERAPIST_ID = "dev_user_therapist";
const DEMO_PATIENT_1 = "dev_patient_1";
const DEMO_PATIENT_2 = "dev_patient_2";

type SeedNote = {
  id: string;
  patientId: string;
  type: NoteType;
  content: string;
  soap?: {
    id: string;
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
};

const NOTES: SeedNote[] = [
  {
    id: "dev_note_soap_patient1",
    patientId: DEMO_PATIENT_1,
    type: "SOAP",
    content: "Initial assessment — lower back pain, 6/10 intensity.",
    soap: {
      id: "dev_soap_note_patient1",
      subjective: "Patient reports dull lower back pain for 2 weeks, worse after sitting.",
      objective: "Reduced lumbar flexion; tenderness over L4-L5; no red flags on neuro screen.",
      assessment: "Mechanical lower back pain, likely muscular strain.",
      plan: "Manual therapy, core stability exercises, review in 1 week.",
    },
  },
  {
    id: "dev_note_progress_patient1",
    patientId: DEMO_PATIENT_1,
    type: "PROGRESS",
    content: "Week 2 progress: pain reduced to 3/10; completing home exercise programme daily.",
  },
  {
    id: "dev_note_general_patient2",
    patientId: DEMO_PATIENT_2,
    type: "GENERAL",
    content: "Follow-up call — patient confirmed appointment attendance and updated contact number.",
  },
  {
    id: "dev_note_exercise_patient2",
    patientId: DEMO_PATIENT_2,
    type: "EXERCISE_PLAN",
    content: "Home programme: cat-camel x10, bird-dog x8 each side, 2 sets daily.",
  },
];

async function main() {
  console.log(`Seeding clinical notes for tenant "${DEMO_TENANT_ID}"...`);

  for (const note of NOTES) {
    await prisma.note.upsert({
      where: { id: note.id },
      create: {
        id: note.id,
        tenantId: DEMO_TENANT_ID,
        patientId: note.patientId,
        therapistId: DEMO_THERAPIST_ID,
        type: note.type,
        content: note.content,
        attachments: [],
      },
      update: {
        patientId: note.patientId,
        therapistId: DEMO_THERAPIST_ID,
        type: note.type,
        content: note.content,
        deletedAt: null,
      },
    });

    if (note.soap) {
      await prisma.soapNote.upsert({
        where: { noteId: note.id },
        create: {
          id: note.soap.id,
          tenantId: DEMO_TENANT_ID,
          noteId: note.id,
          subjective: note.soap.subjective,
          objective: note.soap.objective,
          assessment: note.soap.assessment,
          plan: note.soap.plan,
        },
        update: {
          subjective: note.soap.subjective,
          objective: note.soap.objective,
          assessment: note.soap.assessment,
          plan: note.soap.plan,
        },
      });
    }

    console.log(`  ✓ ${note.type} note for ${note.patientId} (${note.id})`);
  }

  console.log("Notes seed complete.");
}

main()
  .catch((error) => {
    console.error("Notes seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
