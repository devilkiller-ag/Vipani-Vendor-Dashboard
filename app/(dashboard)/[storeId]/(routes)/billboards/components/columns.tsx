"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

export type BillboardColumn = {
  id: string
  label: string
  labelColor: string,
  createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "labelColor",
    header: "Label Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.labelColor}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original.labelColor }} />
      </div>
    )
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
]
