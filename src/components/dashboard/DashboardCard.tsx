interface DashboardCardProps {
    title: string;
    value: number | string;
}

function DashboardCard({
    title,
    value,
}: DashboardCardProps) {
    return (
        <div className="dashboard-card">
            <h3>{title}</h3>
            <p>{value}</p>
        </div>
    );
}

export default DashboardCard;