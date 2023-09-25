import FlexBox from "../FlexBox";
import { H6, Small, Tiny } from "../Typography";
import UkoAvatar from "../UkoAvatar";

const EventListColumnShape = [
  {
    Header: "Nom de l'évènement",
    accessor: "Nom de l'évènement",
    minWidth: 200,
    Cell: ({ row }: any) => {
      const { avatar, name, address } = row.original;
      return (
        <FlexBox alignItems="center">
          <FlexBox flexDirection="column" ml={1}>
            <H6 color="text.primary">{name}</H6>
          </FlexBox>
        </FlexBox>
      );
    },
  },
  {
    Header: "Titre",
    accessor: "Titre",
    minWidth: 200,

  },
  {
    Header: "Description",
    accessor: "Description",
    minWidth: 150,
  },
  {
    Header: "Date de début ",
    accessor: "Date de début",
    minWidth: 150,
  },
  {
    Header: "Date de fin",
    accessor: "Date de fin",
    minWidth: 100,
    maxWidth: 100,
    },
  
];

export default EventListColumnShape;
