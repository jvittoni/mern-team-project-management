"use client";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getAllTasksQueryFn,
    getProjectsInWorkspaceQueryFn,
} from "@/lib/api";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
    CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { ProjectType } from "@/types/api.type";

const COLORS = ["#ef4444", "#3b82f6", "#facc15", "#8b5cf6", "#10b981"];

const Analytics = () => {
    const { workspaceId } = useParams();
    const [tasks, setTasks] = useState<any[]>([]);
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [taskRes, projectRes] = await Promise.all([
                    getAllTasksQueryFn({
                        workspaceId: workspaceId!,
                        pageNumber: 1,
                        pageSize: 1000,
                    }),
                    getProjectsInWorkspaceQueryFn({
                        workspaceId: workspaceId!,
                        pageNumber: 1,
                        pageSize: 1000,
                    }),
                ]);

                setTasks(taskRes.tasks || []);
                setProjects(projectRes.projects || []);
            } catch (err) {
                console.error("Failed to fetch analytics data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [workspaceId]);

    if (loading)
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <Loader className="w-8 h-8 animate-spin" />
            </div>
        );

    // -------- TASK ANALYTICS --------
    // Task Status Distribution
    const statusData = [
        { name: "Backlog", value: tasks.filter((t) => t.status === "BACKLOG").length },
        { name: "Todo", value: tasks.filter((t) => t.status === "TODO").length },
        { name: "In Progress", value: tasks.filter((t) => t.status === "IN_PROGRESS").length },
        { name: "In Review", value: tasks.filter((t) => t.status === "IN_REVIEW").length },
        { name: "Done", value: tasks.filter((t) => t.status === "DONE").length },
    ];

    // Task Priority Breakdown
    const priorityData = [
        { name: "Low", value: tasks.filter((t) => t.priority === "LOW").length },
        { name: "Medium", value: tasks.filter((t) => t.priority === "MEDIUM").length },
        { name: "High", value: tasks.filter((t) => t.priority === "HIGH").length },
    ];

    // Tasks Created Over Time
    const tasksByDate: Record<string, number> = {};
    tasks.forEach((t) => {
        const date = new Date(t.createdAt).toLocaleDateString();
        tasksByDate[date] = (tasksByDate[date] || 0) + 1;
    });
    const timelineData = Object.entries(tasksByDate).map(([date, count]) => ({
        date,
        count,
    }));

    // -------- PROJECT ANALYTICS --------
    // Projects Created Over Time
    const projectsByDate: Record<string, number> = {};
    projects.forEach((p) => {
        const date = new Date(p.createdAt).toLocaleDateString();
        projectsByDate[date] = (projectsByDate[date] || 0) + 1;
    });
    const projectTimelineData = Object.entries(projectsByDate).map(([date, count]) => ({
        date,
        count,
    }));

    // Projects Per Member
    const projectsByMember: Record<string, number> = {};
    projects.forEach((p) => {
        const name = p.createdBy?.name || "Unknown";
        projectsByMember[name] = (projectsByMember[name] || 0) + 1;
    });
    const projectMemberData = Object.entries(projectsByMember).map(([name, count]) => ({
        name,
        count,
    }));

    return (
        <div className="p-6 space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight pb-2">
                    Workspace Analytics
                </h2>
                <p className="text-muted-foreground">
                    Here&apos;s analytics for this workspace!
                </p>
            </div>

            {/* TASK STATUS PIE */}
            <Card className="p-4 shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Task Status Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={statusData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            dataKey="value"
                            label
                        >
                            {statusData.map((_, index) => (
                                <Cell key={index} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </Card>

            {/* TASK PRIORITY BAR */}
            <Card className="p-4 shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Task Priority Breakdown</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={priorityData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#60a5fa" />
                    </BarChart>
                </ResponsiveContainer>
            </Card>

            {/* TASK TIMELINE */}
            <Card className="p-4 shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Tasks Created Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={timelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* PROJECT CREATION TREND */}
            <Card className="p-4 shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Projects Created Over Time</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={projectTimelineData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </Card>

            {/* PROJECTS PER MEMBER */}
            <Card className="p-4 shadow-sm border">
                <h2 className="text-lg font-semibold mb-4">Projects Per Member</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={projectMemberData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="count"
                        // fill="#f97316" 
                        >
                            {projectMemberData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={index % 2 === 0 ? "#f97316" : "#fdba74"} // orange / light orange
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Card>
        </div>
    );
};

export default Analytics;
