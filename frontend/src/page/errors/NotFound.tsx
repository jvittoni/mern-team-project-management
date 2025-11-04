import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center px-4">
            <div className="flex flex-col items-center gap-6 max-w-md">
                {Logo && (
                    <Link to="/" className="flex items-center gap-2 text-lg font-semibold">
                        <Logo />
                        Team Project Management
                    </Link>
                )}

                <h1 className="text-6xl font-bold tracking-tight text-primary">404</h1>
                <h2 className="text-2xl font-semibold">Page Not Found</h2>
                <p className="text-muted-foreground">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>

                <div className="flex gap-4 mt-4">
                    <Link to="/">
                        <Button>Go Home</Button>
                    </Link>
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Go Back
                    </Button>
                </div>
            </div>
        </div>
    )
};

export default NotFound;