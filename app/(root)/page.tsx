import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

const SetupPage = () => {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}

export default SetupPage;