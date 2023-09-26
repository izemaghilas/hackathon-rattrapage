import FlexBox from "../FlexBox";
import { H6, Small, Tiny } from "../Typography";
import UkoAvatar from "../UkoAvatar";

const EventListColumnShape = [
  {
    Header: "Nom de l'évènement",
    accessor: "title",
        minWidth: 100,
        maxWidth: 200,
    style: {
    textAlign: "right", // Vous pouvez remplacer "left" par "right" ou "center" selon votre préférence
  },

  },
  
  {
    Header: "Description",
    accessor: "description",
    minWidth: 20,
    maxWidth: 100,
  },
  {
    Header: "Date de début ",
    accessor: "startDate",
    minWidth: 50,
    maxWidth: 100,
    align: "center",
  },
  {
    Header: "Date de fin",
    accessor: "endDate",
    minWidth: 50,
    maxWidth: 100,
    },
  
  {
    Header: "Crée à ",
    accessor: "createdAt",
    minWidth: 50,
    maxWidth: 100,

    },
  
  {
    Header: "Modifié à",
    accessor: "updatedAt",
    minWidth: 50,
    maxWidth: 100,

  },
  
];

export default EventListColumnShape;
