import { RouteComponentProps } from "react-router";

interface MatchParams {
    id: string;
}

export default function courseDetails({ match }: RouteComponentProps<MatchParams>) {
    const { id } = match.params;
    console.log(id);
    return(
        <div>Details</div>
    );
}