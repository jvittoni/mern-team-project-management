"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getCurrentUserQueryFn, updateUserMutationFn } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Loader } from "lucide-react";

const ProfileSettings = () => {
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["currentUser"],
        queryFn: getCurrentUserQueryFn,
    });

    const mutation = useMutation({
        mutationFn: updateUserMutationFn,
        onSuccess: () => {
            toast({
                title: "Profile successfully updated!",
                description: "Your profile changes have been saved successfully.",
                variant: "success",
            });

            setForm(prev => ({ ...prev, password: "", confirmPassword: "" }));
            mutation.reset();
        },
        onError: (err: any) => {
            toast({
                title: "Failed to update profile.",
                description: err?.response?.data?.message || "Something went wrong.",
                variant: "destructive",
            });
            mutation.reset();
        },
    });

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    useEffect(() => {
        if (data?.user) {
            setForm({
                name: data.user.name || "",
                email: data.user.email || "",
                password: "",
                confirmPassword: "",
            });
        }
    }, [data]);

    if (isLoading) return <p className="text-center mt-20">Loading...</p>;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate passwords
        if (form.password && form.password !== form.confirmPassword) {
            toast({
                title: "Passwords do not match",
                description: "Please make sure both password fields are identical.",
                variant: "destructive",
            });
            return;
        }

        // Build payload
        const payload: { name: string; email: string; password?: string } = {
            name: form.name,
            email: form.email,
        };

        if (form.password.trim() !== "") {
            payload.password = form.password;
        }

        mutation.mutate(payload);
    };

    return (
        <div className="min-h-screen p-6 relative">
            <Button
                variant="outline"
                onClick={() => navigate(-1)}
                className="absolute top-6 left-6"
            >
                <ArrowLeft /> Back to Workspace
            </Button>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-md space-y-6 mt-16">
                    <h2 className="text-3xl font-medium text-center">Profile Settings</h2>

                    <Card className="p-6 shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Name</label>
                                <Input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Your name"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Email</label>
                                <Input
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    type="email"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-700">New Password</label>
                                <Input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                            </div>

                            <div>
                                <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
                                <Input
                                    name="confirmPassword"
                                    type="password"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full mt-2 cursor-pointer"
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending && <Loader className="animate-spin mr-2" />}
                                Save Changes
                            </Button>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
