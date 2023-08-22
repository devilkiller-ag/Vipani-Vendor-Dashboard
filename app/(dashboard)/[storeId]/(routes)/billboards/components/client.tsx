"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { BillboardColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BillboardClientProps {
  data: BillboardColumn[];
}

const BlillboardClient: React.FC<BillboardClientProps> = ({
  data
}) => {

  const params = useParams();
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading 
        title={`Billboards (${data.length})`}
        description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 b-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />

      <DataTable columns={columns} data={data} searchKey="label" />

      <Heading title="API" description="API calls for billboards" />
      <ApiList entityName="billboards" entityIdName="BillboardId" />
    </>
  )
}

export default BlillboardClient;