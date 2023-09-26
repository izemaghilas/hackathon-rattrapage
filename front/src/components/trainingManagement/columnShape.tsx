import FlexBox from "../FlexBox";
import { Small } from "../Typography";

const TrainingListColumnShape = (isAdmin: boolean) => {
    if (isAdmin) {
        return [
            {
                Header: "Intitulé",
                accessor: "title",
                minWidth: 150,
            },
            {
                Header: "Description",
                accessor: "description",
                minWidth: 150,
            },
            {
                Header: "Consultant",
                accessor: "user",
                minWidth: 150,
                Cell: ({ value }: any) => (
                    <Small>{value.lastname + " " + value.firstname}</Small>
                ),
            },
            {
                Header: "Compétences Associées",
                accessor: "skills",
                minWidth: 150,
                Cell: ({ row }: any) => {
                    return (
                        <FlexBox alignItems="center">
                            {row.original.skills
                                .map((skill: any) => skill)
                                .join(", ")}
                        </FlexBox>
                    );
                },
            },
        ];
    }

    return [
        {
            Header: "Intitulé",
            accessor: "title",
            minWidth: 150,
        },
        {
            Header: "Description",
            accessor: "description",
            minWidth: 150,
        },
        {
            Header: "Compétences Associées",
            accessor: "skills",
            minWidth: 150,
            Cell: ({ row }: any) => {
                return (
                    <FlexBox alignItems="center">
                        {row.original.skills
                            .map((skill: any) => skill)
                            .join(", ")}
                    </FlexBox>
                );
            },
        },
    ];
};

export default TrainingListColumnShape;
