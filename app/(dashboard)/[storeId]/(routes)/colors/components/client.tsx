"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { ColorColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface ColorsClientProps {
  data: ColorColumn[];
}

const ColorsClient: React.FC<ColorsClientProps> = ({
  data
}) => {

  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
        title={`Colors (${data.length})`}
        description="Manage colors for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <Plus className="mr-2 b-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="name" />

      <Heading title="API" description="API calls for colors" />
      <ApiList entityName="colors" entityIdName="ColorId" />
    </>
  )
}

export default ColorsClient;