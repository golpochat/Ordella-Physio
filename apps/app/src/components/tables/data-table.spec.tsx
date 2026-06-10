import { render, screen } from "@testing-library/react";
import { DataTable } from "@/components/tables/data-table";

type Row = { id: string; name: string };

const columns = [{ accessorKey: "name", header: "Name" }];

describe("DataTable", () => {
  it("renders rows", () => {
    const data: Row[] = [
      { id: "1", name: "Alice" },
      { id: "2", name: "Bob" },
    ];
    render(<DataTable columns={columns} data={data} />);
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
  });

  it("shows empty state", () => {
    render(<DataTable columns={columns} data={[]} />);
    expect(screen.getByText("No results.")).toBeInTheDocument();
  });
});
