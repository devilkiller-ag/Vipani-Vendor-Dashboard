"use client"

import { useParams, useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@radix-ui/react-separator";

interface BillboardClientProps {
  data: "BillboardColumn[]";
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
        title="Billboard {0}"
        description="Manage billboards for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <Plus className="mr-2 b-4 w-4" />
          Add New
        </Button>
      </div>

      <Separator />
    </>
  )
}

export default BlillboardClient;