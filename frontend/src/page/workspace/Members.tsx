import { Separator } from "@/components/ui/separator";
import InviteMember from "@/components/workspace/member/invite-member";
import AllMembers from "@/components/workspace/member/all-members";

export default function Members() {
    return (
        <div className="w-full h-auto pt-2">
            {/* <WorkspaceHeader /> */}
            {/* <Separator className="my-4 " /> */}
            <main>
                <div className="w-full max-w-3xl mx-auto pt-3">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight pb-2">Workspace Members</h2>
                        <p className="text-muted-foreground">
                            Here&apos;s the list of members for this workspace!
                        </p>
                    </div>
                    <InviteMember />
                    <Separator className="my-4 !h-[0.5px]" />
                    <AllMembers />
                </div>
            </main>
        </div>
    );
}