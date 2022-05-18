import { RouteComponentProps } from "react-router";

interface MatchParams {
    id: string;
}

export default function courseDetails({ match }: RouteComponentProps<MatchParams>) {
    const { params: { id }, path } = match;
    console.log(id, path);
    return(
        <div>Details</div>
    );
}