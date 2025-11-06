import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthContext } from "@/context/auth-provider";
import { toast } from "@/hooks/use-toast";
import { CheckIcon, CopyIcon, Loader } from "lucide-react";
import { BASE_ROUTE } from "@/routes/common/routePaths";
import { Permissions } from "@/constant";
import PermissionsGuard from "@/components/reusable/permission-guard";
import { Separator } from "@/components/ui/separator";

const InviteMember = () => {
    const { workspace, workspaceLoading } = useAuthContext();
    const [copied, setCopied] = useState(false);

    const inviteUrl = workspace
        ? `${window.location.origin}${BASE_ROUTE.INVITE_URL.replace(
            ":inviteCode",
            workspace.inviteCode
        )}`
        : "";

    const handleCopy = () => {
        if (inviteUrl) {
            navigator.clipboard.writeText(inviteUrl).then(() => {
                setCopied(true);
                toast({
                    title: "Copied",
                    description: "Invite url copied to clipboard",
                    variant: "success",
                });
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };
    return (
        <PermissionsGuard requiredPermission={Permissions.ADD_MEMBER}>
            {workspaceLoading ? (
                <Loader className="w-8 h-8 animate-spin place-self-center flex" />
            ) : (
                <div className="flex flex-col pt-0.5 px-0 ">
                    <Separator className="my-4" />
                    <h5 className="text-lg  leading-[30px] font-semibold mb-1">
                        Invite Members To Join Workspace
                    </h5>
                    <p className="text-sm text-muted-foreground">
                        Anyone with an invite link can join this free Workspace. You can also
                        disable and create a new invite link for this Workspace at any time.
                    </p>

                    <div className="flex py-3 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Link
                        </Label>
                        <Input
                            id="link"
                            disabled={true}
                            className="disabled:opacity-100 disabled:pointer-events-none"
                            value={inviteUrl}
                            readOnly
                        />
                        <Button
                            disabled={false}
                            className="shrink-0"
                            size="icon"
                            onClick={handleCopy}
                        >
                            {copied ? <CheckIcon /> : <CopyIcon />}
                        </Button>
                    </div>
                </div>
            )}
        </PermissionsGuard>

    );
};

export default InviteMember;