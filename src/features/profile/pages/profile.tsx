import { useAuth } from "@/app/providers/useAuth";


export default function ProfilePage() {
    const { user, logout } = useAuth();
    return (
    <div>
        <h1>ProfilePage</h1>
        <p>ProfilePage {user?.name}</p>
        <p>ProfilePage {user?.email}</p>
        <p>ProfilePage {user?.role}</p>
        <button onClick={() => logout()}>Logout</button>
    </div>
    );
}