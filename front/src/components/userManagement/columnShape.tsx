import FlexBox from "../FlexBox";
import { H6, Small, Tiny } from "../Typography";
import UkoAvatar from "../UkoAvatar";

const UserListColumnShape = [
  {
    Header: "Nom",
    accessor: "lastname",
    minWidth: 150,
  },
  {
    Header: "Prénom",
    accessor: "firstname",
    minWidth: 150,
  },
  {
    Header: "Email",
    accessor: "email",
    minWidth: 150,
  },
  {
    Header: "Poste",
    accessor: "jobTitle",
    minWidth: 150,
  },
  {
    Header: "Role",
    accessor: "role",
    minWidth: 200,
    Cell: ({ value }: any) => (
      <Small
        sx={{
          borderRadius: 10,
          padding: ".2rem 1rem",
          color: "background.paper",
          backgroundColor: "#A798FF",
        }}
      >
        {value}
      </Small>
    ),
  },
  {
    Header: "Equipe",
    accessor: "team.teamName",
    minWidth: 150,
  },
  {
    Header: "Skills",
    accessor: "skills",
    minWidth: 150,
    Cell: ({ row }: any) => {
      return (
        <FlexBox alignItems="center">
          {
            row.original.skills.map((skill: any) => (
              skill.name
            )).join(', ')
          }
        </FlexBox>
          
      );
    },
  },
];

export default UserListColumnShape;
