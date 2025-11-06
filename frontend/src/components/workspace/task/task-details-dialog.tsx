"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarColor, getAvatarFallbackText, transformStatusEnum } from "@/lib/helper";
import { format } from "date-fns";
import { TaskType } from "@/types/api.type";

interface TaskDetailsDialogProps {
    task: TaskType | null;
    open: boolean;
    onClose: () => void;
}

const TaskDetailsDialog = ({ task, open, onClose }: TaskDetailsDialogProps) => {
    if (!task) return null;

    const assigneeName = task.assignedTo?.name || "Unassigned";
    const initials = getAvatarFallbackText(assigneeName);
    const avatarColor = getAvatarColor(assigneeName);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-lg p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">{task.title}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-3">

                    {/* Status and Priority */}
                    <div className="flex items-center justify-between border-t pt-3">
                        <div>
                            <span className="text-sm text-gray-500">Status:</span>
                            <Badge className="ml-2">{transformStatusEnum(task.status)}</Badge>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Priority:</span>
                            <Badge
                                className={`ml-2 capitalize ${task.priority === "HIGH"
                                    ? "bg-red-500 text-white"
                                    : task.priority === "LOW"
                                        ? "bg-gray-500 text-white"
                                        : "bg-yellow-500 text-white"
                                    }`}
                            >
                                {task.priority}
                            </Badge>
                        </div>
                    </div>

                    {/* Assigned To */}
                    <div className="flex items-center gap-3 border-t pt-3">
                        <p className="text-sm text-gray-500">Assigned To: </p>
                        <div className="flex items-center">
                            <Avatar className="h-8 w-8 mr-3">
                                <AvatarImage src={task.assignedTo?.profilePicture || ""} alt={assigneeName} />
                                <AvatarFallback className={avatarColor}>{initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium">{assigneeName}</p>
                            </div>
                        </div>
                    </div>

                    {/* Due Date */}
                    <div className="flex items-center gap-3 border-t pt-3">
                        <p className="text-sm text-gray-500">Due Date:</p>
                        <p className="font-medium">{format(new Date(task.dueDate), "PPP")}</p>
                    </div>

                    {/* Associated Project */}
                    {task.project && (
                        <div className="flex items-center gap-3 border-t pt-3">
                            <p className="text-sm text-gray-500">Project:</p>
                            <p className="font-medium flex items-center gap-1">
                                <span>{task.project.emoji}</span>
                                {task.project.name}
                            </p>
                        </div>
                    )}

                    {/* Description*/}
                    <div className="border-t pt-3 mb-1">
                        <p className="text-sm text-gray-500 mb-1">Description:</p>
                        <p className="">{task.description || "No description provided."}</p>
                    </div>

                </div>
            </DialogContent>
        </Dialog>
    );
};

export default TaskDetailsDialog;
