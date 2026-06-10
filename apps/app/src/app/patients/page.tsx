"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input, Label } from "@/components/ui/input";
import { DataTable } from "@/components/tables/data-table";
import { useToast } from "@/components/ui/toast";
import { patientsApi } from "@/lib/api";
import type { Patient } from "@/lib/schemas";
import { parseApiError } from "@/lib/api/client";

const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "lastName",
    header: "Name",
    cell: ({ row }) => `${row.original.firstName} ${row.original.lastName}`,
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "phone", header: "Phone" },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <Link className="text-primary underline" href={`/patients/${row.original.id}`}>View</Link>,
  },
];

export default function PatientsPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "" });

  const { data, isLoading } = useQuery({
    queryKey: ["patients"],
    queryFn: () => patientsApi.list(),
  });

  const createMutation = useMutation({
    mutationFn: () => patientsApi.create(form),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["patients"] });
      setOpen(false);
      toast({ title: "Patient created" });
    },
    onError: (error) => toast({ title: "Error", description: parseApiError(error) }),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Patients</h1>
          <p className="text-muted-foreground">Manage clinic patients</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Patient</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Patient</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <Button onClick={() => createMutation.mutate()} disabled={createMutation.isPending}>
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <DataTable columns={columns} data={data?.data ?? []} isLoading={isLoading} searchColumn="lastName" searchPlaceholder="Search patients..." />
    </div>
  );
}
