import type { Station, StationBooking } from "./stations.types";

import type { CalendarEvent } from "../calendar/calendar.types";

export const MOCKED_STATION: Station = {
  id: "station-1",
  name: "Central Station",
  bookings: [
    {
      id: "101",
      customerName: "Alice",
      startDate: "2024-06-01",
      endDate: "2024-06-02",
      pickupReturnStationId: "station-1",
    },
    {
      id: "102",
      customerName: "Bob",
      startDate: "2024-06-03",
      endDate: "2024-06-04",
      pickupReturnStationId: "station-1",
    },
  ],
};

export const MOCKED_EMPTY_STATION: Station = {
  id: "station-2",
  name: "Empty Station",
  bookings: [],
};

export const MOCKED_BOOKING: StationBooking = {
  id: "201",
  customerName: "Charlie",
  startDate: "2024-07-01",
  endDate: "2024-07-02",
  pickupReturnStationId: "station-5",
};

export const MOCKED_BOOKINGS: StationBooking[] = [
  {
    id: "1",
    customerName: "A",
    startDate: "2024-06-01",
    endDate: "2024-06-02",
    pickupReturnStationId: "station-1",
  },
  {
    id: "2",
    customerName: "B",
    startDate: "2024-06-05",
    endDate: "2024-06-06",
    pickupReturnStationId: "station-1",
  },
  {
    id: "3",
    customerName: "C",
    startDate: "2024-06-03",
    endDate: "2024-06-04",
    pickupReturnStationId: "station-1",
  },
  {
    id: "4",
    customerName: "D",
    startDate: "2024-06-03",
    endDate: "2024-06-04",
    pickupReturnStationId: "station-1",
  },
];

export const MOCKED_BOOKINGS_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "2",
    label: "B",
    startDate: "2024-06-05",
    endDate: "2024-06-06",
  },
  {
    id: "3",
    label: "C",
    startDate: "2024-06-03",
    endDate: "2024-06-04",
  },
  {
    id: "4",
    label: "D",
    startDate: "2024-06-03",
    endDate: "2024-06-04",
  },
  {
    id: "1",
    label: "A",
    startDate: "2024-06-01",
    endDate: "2024-06-02",
  },
];

export const MOCKED_GET_STATIONS_RESPONSE: Station[] = [
  {
    id: "1",
    name: "Berlin",
    bookings: [
      {
        id: "1",
        pickupReturnStationId: "1",
        customerName: "Kera",
        startDate: "2021-03-13T22:04:19.032Z",
        endDate: "2021-07-17T08:51:27.402Z",
      },
      {
        id: "7",
        pickupReturnStationId: "1",
        customerName: "Elmira Larkin Sr.",
        startDate: "2021-02-19T17:22:15.117Z",
        endDate: "2021-08-10T10:35:41.773Z",
      },
      {
        id: "13",
        pickupReturnStationId: "1",
        customerName: "Brooks Fritsch",
        startDate: "2020-10-11T00:20:46.856Z",
        endDate: "2021-12-29T11:31:09.354Z",
      },
      {
        id: "19",
        pickupReturnStationId: "1",
        customerName: "Julie King",
        startDate: "2021-02-16T04:05:37.445Z",
        endDate: "2021-07-07T01:24:19.745Z",
      },
      {
        id: "25",
        pickupReturnStationId: "1",
        customerName: "Ms. Alden Carter",
        startDate: "2020-09-30T19:03:57.426Z",
        endDate: "2021-10-10T00:38:59.915Z",
      },
      {
        id: "31",
        pickupReturnStationId: "1",
        customerName: "Monte Schimmel",
        startDate: "2021-01-05T12:32:28.004Z",
        endDate: "2021-07-23T00:49:51.440Z",
      },
      {
        id: "37",
        pickupReturnStationId: "1",
        customerName: "Arnulfo Medhurst",
        startDate: "2020-07-30T15:24:18.251Z",
        endDate: "2022-03-11T01:13:38.120Z",
      },
      {
        id: "43",
        pickupReturnStationId: "1",
        customerName: "Marjory Kovacek",
        startDate: "2020-08-06T12:28:08.139Z",
        endDate: "2021-06-28T13:31:00.699Z",
      },
      {
        id: "45",
        pickupReturnStationId: "1",
        customerName: "Sam Barton",
        startDate: "2021-02-28T07:44:57.232Z",
        endDate: "2022-03-17T18:35:44.941Z",
      },
      {
        id: "51",
        pickupReturnStationId: "1",
        customerName: "Tyree O'Connell",
        startDate: "2025-04-16T02:28:00.000Z",
        endDate: "2025-04-18T01:28:00.000Z",
      },
      {
        id: "57",
        pickupReturnStationId: "1",
        customerName: "Reva Huels",
        startDate: "2021-03-13T02:50:54.650Z",
        endDate: "2021-05-15T01:54:18.616Z",
      },
      {
        id: "63",
        pickupReturnStationId: "1",
        customerName: "Susie Walter",
        startDate: "2020-08-30T18:24:50.288Z",
        endDate: "2021-09-22T10:00:08.962Z",
      },
      {
        id: "69",
        pickupReturnStationId: "1",
        customerName: "Melyssa Sawayn",
        startDate: "2020-10-10T21:40:57.781Z",
        endDate: "2021-06-07T05:26:11.720Z",
      },
      {
        id: "75",
        pickupReturnStationId: "1",
        customerName: "Yolanda Corwin",
        startDate: "2025-04-11T01:45:00.000Z",
        endDate: "2025-04-26T01:45:00.000Z",
      },
      {
        id: "81",
        pickupReturnStationId: "1",
        customerName: "Wade Wuckert MD",
        startDate: "2021-01-20T05:31:50.905Z",
        endDate: "2021-04-30T08:19:41.437Z",
      },
      {
        id: "87",
        pickupReturnStationId: "1",
        customerName: "Lance Schmeler",
        startDate: "2026-04-09T13:33:00.000Z",
        endDate: "2026-04-24T13:33:00.000Z",
      },
      {
        id: "93",
        pickupReturnStationId: "1",
        customerName: "Alta Halvorson",
        startDate: "2020-07-29T16:13:43.516Z",
        endDate: "2021-09-22T13:06:55.528Z",
      },
      {
        id: "99",
        pickupReturnStationId: "1",
        customerName: "Abdullah Parisian",
        startDate: "2020-08-01T21:55:20.184Z",
        endDate: "2021-10-15T09:31:15.573Z",
      },
    ],
  },
  {
    id: "2",
    name: "Munich",
    bookings: [
      {
        id: "2",
        pickupReturnStationId: "2",
        customerName: "Carroll Doyle",
        startDate: "2020-06-16T23:11:29.630Z",
        endDate: "2021-07-10T20:30:58.997Z",
      },
      {
        id: "8",
        pickupReturnStationId: "2",
        customerName: "Jimmy Bogisich",
        startDate: "2021-03-26T02:40:54.086Z",
        endDate: "2021-06-14T13:30:40.341Z",
      },
      {
        id: "14",
        pickupReturnStationId: "2",
        customerName: "Miss Elvis Durgan",
        startDate: "2020-11-26T17:11:42.933Z",
        endDate: "2021-05-07T14:29:06.043Z",
      },
      {
        id: "20",
        pickupReturnStationId: "2",
        customerName: "Madisen Shields",
        startDate: "2021-02-07T04:38:16.881Z",
        endDate: "2021-08-29T23:33:17.381Z",
      },
      {
        id: "26",
        pickupReturnStationId: "2",
        customerName: "Rollin Prohaska",
        startDate: "2020-10-06T20:03:05.438Z",
        endDate: "2021-06-04T23:48:56.216Z",
      },
      {
        id: "32",
        pickupReturnStationId: "2",
        customerName: "Eleonore Emmerich",
        startDate: "2021-02-25T20:11:52.314Z",
        endDate: "2021-09-01T08:35:39.880Z",
      },
      {
        id: "38",
        pickupReturnStationId: "2",
        customerName: "Kyle Grant PhD",
        startDate: "2021-03-30T15:04:13.320Z",
        endDate: "2022-03-22T22:02:20.120Z",
      },
      {
        id: "44",
        pickupReturnStationId: "2",
        customerName: "Perry Lubowitz",
        startDate: "2020-11-12T18:07:37.561Z",
        endDate: "2021-08-18T21:26:51.671Z",
      },
      {
        id: "46",
        pickupReturnStationId: "2",
        customerName: "Reid Fritsch",
        startDate: "2021-01-19T19:38:25.465Z",
        endDate: "2021-12-25T18:00:25.530Z",
      },
      {
        id: "52",
        pickupReturnStationId: "2",
        customerName: "Oceane Grimes",
        startDate: "2020-04-02T23:20:49.904Z",
        endDate: "2021-09-29T12:15:56.799Z",
      },
      {
        id: "58",
        pickupReturnStationId: "2",
        customerName: "Elva Wolf MD",
        startDate: "2020-10-02T22:09:15.946Z",
        endDate: "2021-04-09T11:35:02.894Z",
      },
      {
        id: "64",
        pickupReturnStationId: "2",
        customerName: "Noah Grimes",
        startDate: "2020-05-05T09:49:59.533Z",
        endDate: "2022-01-09T02:50:12.946Z",
      },
      {
        id: "70",
        pickupReturnStationId: "2",
        customerName: "Emmalee Gutmann MD",
        startDate: "2020-04-04T08:16:15.229Z",
        endDate: "2022-02-09T00:26:00.526Z",
      },
      {
        id: "76",
        pickupReturnStationId: "2",
        customerName: "Nina Rath",
        startDate: "2021-03-15T01:10:48.294Z",
        endDate: "2022-01-16T23:29:50.249Z",
      },
      {
        id: "82",
        pickupReturnStationId: "2",
        customerName: "Mrs. Bryana Botsford",
        startDate: "2021-02-04T08:58:28.871Z",
        endDate: "2022-03-08T07:41:04.447Z",
      },
      {
        id: "88",
        pickupReturnStationId: "2",
        customerName: "Caleb Hyatt",
        startDate: "2020-07-04T08:00:39.011Z",
        endDate: "2021-11-30T14:54:08.267Z",
      },
      {
        id: "94",
        pickupReturnStationId: "2",
        customerName: "Sadie Medhurst",
        startDate: "2020-05-13T18:28:04.720Z",
        endDate: "2021-08-10T05:08:56.837Z",
      },
    ],
  },
  { name: "station-name{{i}}", id: "7", bookings: [] },
];

export const MOCKED_GET_STATIONS_BOOKING_DETAIL_RESPONSE: StationBooking = {
  id: "booking-123",
  customerName: "John Doe",
  startDate: "2024-06-01T10:00:00Z",
  endDate: "2024-06-01T12:00:00Z",
  pickupReturnStationId: "station-123",
};
