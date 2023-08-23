"use client";

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { OrderColumn, columns } from "./columns";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface OrderClientProps {
  data: OrderColumn[];
}

const OrderClient: React.FC<OrderClientProps> = ({
  data
}) => {

  const params = useParams();
  const router = useRouter();

  return (
    <>
      <Heading
        title={`Orders (${data.length})`}
        description="Manage orders for your store"
      />

      <Separator />

      <DataTable columns={columns} data={data} searchKey="products" />

    </>
  )
}

export default OrderClient;