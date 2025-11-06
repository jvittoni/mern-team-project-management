"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import { CalendarApi } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams } from "react-router-dom";
import { TaskType } from "@/types/api.type";
import { getAllTasksQueryFn } from "@/lib/api";
import TaskDetailsDialog from "@/components/workspace/task/task-details-dialog";

const CalendarDisplay: React.FC = () => {
    const { workspaceId } = useParams();
    const [events, setEvents] = useState<any[]>([]);
    const [selectedTask, setSelectedTask] = useState<TaskType | null>(null); 
    const [isDialogOpen, setIsDialogOpen] = useState(false); 
    const [currentView, setCurrentView] = useState<
        "dayGridMonth" | "timeGridWeek" | "timeGridDay"
    >("dayGridMonth");
    const calendarRef = useRef<FullCalendar>(null);

    const fetchTasks = useCallback(async () => {
        try {
            const res = await getAllTasksQueryFn({
                workspaceId: workspaceId!,
                pageSize: 1000,
                pageNumber: 1,
            });

            const tasks: TaskType[] = res.tasks || [];

            const formattedEvents = tasks
                .filter((t) => !!t.dueDate)
                .map((t) => ({
                    id: t._id,
                    title: t.title,
                    start: new Date(t.dueDate).toISOString(),
                    allDay: true,
                    backgroundColor:
                        t.priority === "HIGH"
                            ? "#ef4444"  
                            : t.priority === "MEDIUM"
                                ? "#eab308"   
                                : "#6b7280", 
                    borderColor:
                        t.priority === "HIGH"
                            ? "#ef4444"
                            : t.priority === "MEDIUM"
                                ? "#eab308"
                                : "#6b7280",
                    extendedProps: { task: t },
                }));

            setEvents(formattedEvents);
        } catch (err) {
            console.error("Failed to fetch tasks", err);
        }
    }, [workspaceId]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleViewChange = (newView: "dayGridMonth" | "timeGridWeek" | "timeGridDay") => {
        const calendarApi = calendarRef.current?.getApi() as CalendarApi;
        if (calendarApi) {
            calendarApi.changeView(newView);
            setCurrentView(newView);
        }
    };

    const handleEventClick = (info: any) => {
        const clickedTask: TaskType = info.event.extendedProps.task;
        setSelectedTask(clickedTask);
        setIsDialogOpen(true);
    };

    return (
        <div className="p-6 space-y-4">
            {/* Header & View Controls */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Calendar</h2>
                <div className="flex gap-2">
                    {[
                        { view: "dayGridMonth", label: "Month" },
                        { view: "timeGridWeek", label: "Week" },
                        { view: "timeGridDay", label: "Day" },
                    ].map(({ view, label }) => (
                        <button
                            key={view}
                            onClick={() => handleViewChange(view as any)}
                            className={`px-3 py-1 rounded transition ${currentView === view
                                ? "bg-blue-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                                }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Calendar */}
            <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                    left: "prev,next today",
                    center: "title",
                    right: "",
                }}
                events={events}
                height="80vh"
                eventClick={handleEventClick}
                displayEventTime={false}
                allDaySlot={true}
                slotMinTime="00:00:00"
                slotMaxTime="00:00:00"
                nowIndicator={false}
            />

            <TaskDetailsDialog
                task={selectedTask}
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
};

export default CalendarDisplay;
