<script setup lang="ts">
import { useRouter } from "vue-router";

import type { CalendarEvent } from "@/modules/calendar/calendar.types";
import CalendarDisplay from "@/modules/calendar/components/CalendarDisplay.vue";
import { APP_ROUTES } from "@/modules/core/constants/routes";
import StationFinderInput from "@/modules/stations/components/StationFinderInput.vue";

const MOCKED_STATIONS_BOOKINS = [
  {
    id: "1",
    label: "Kera",
    startDate: "2021-03-13T22:04:19.032Z",
    endDate: "2021-07-17T08:51:27.402Z",
  },
  {
    id: "7",
    label: "Elmira Larkin Sr.",
    startDate: "2021-02-19T17:22:15.117Z",
    endDate: "2021-08-10T10:35:41.773Z",
  },
  {
    id: "13",
    label: "Brooks Fritsch",
    startDate: "2020-10-11T00:20:46.856Z",
    endDate: "2021-12-29T11:31:09.354Z",
  },
  {
    id: "19",
    label: "Julie King",
    startDate: "2021-02-16T04:05:37.445Z",
    endDate: "2021-07-07T01:24:19.745Z",
  },
  {
    id: "25",
    label: "Ms. Alden Carter",
    startDate: "2020-09-30T19:03:57.426Z",
    endDate: "2021-10-10T00:38:59.915Z",
  },
  {
    id: "31",
    label: "Monte Schimmel",
    startDate: "2021-01-05T12:32:28.004Z",
    endDate: "2021-07-23T00:49:51.440Z",
  },
  {
    id: "37",
    label: "Arnulfo Medhurst",
    startDate: "2020-07-30T15:24:18.251Z",
    endDate: "2022-03-11T01:13:38.120Z",
  },
  {
    id: "43",
    label: "Marjory Kovacek",
    startDate: "2020-08-06T12:28:08.139Z",
    endDate: "2021-06-28T13:31:00.699Z",
  },
  {
    id: "45",
    label: "Sam Barton",
    startDate: "2021-02-28T07:44:57.232Z",
    endDate: "2022-03-17T18:35:44.941Z",
  },
  {
    id: "51",
    label: "Tyree O'Connell",
    startDate: "2025-04-16T02:28:00.000Z",
    endDate: "2025-04-18T01:28:00.000Z",
  },
  {
    id: "57",
    label: "Reva Huels",
    startDate: "2021-03-13T02:50:54.650Z",
    endDate: "2021-05-15T01:54:18.616Z",
  },
  {
    id: "63",
    label: "Susie Walter",
    startDate: "2020-08-30T18:24:50.288Z",
    endDate: "2021-09-22T10:00:08.962Z",
  },
  {
    id: "69",
    label: "Melyssa Sawayn",
    startDate: "2020-10-10T21:40:57.781Z",
    endDate: "2021-06-07T05:26:11.720Z",
  },
  {
    id: "75",
    label: "Yolanda Corwin",
    startDate: "2025-04-11T01:45:00.000Z",
    endDate: "2025-04-26T01:45:00.000Z",
  },
  {
    id: "81",
    label: "Wade Wuckert MD",
    startDate: "2021-01-20T05:31:50.905Z",
    endDate: "2021-04-30T08:19:41.437Z",
  },
  {
    id: "87",
    label: "Lance Schmeler",
    startDate: "2026-04-09T13:33:00.000Z",
    endDate: "2026-04-24T13:33:00.000Z",
  },
  {
    id: "93",
    label: "Alta Halvorson",
    startDate: "2020-07-29T16:13:43.516Z",
    endDate: "2021-09-22T13:06:55.528Z",
  },
  {
    id: "99",
    label: "Abdullah Parisian",
    startDate: "2020-08-01T21:55:20.184Z",
    endDate: "2021-10-15T09:31:15.573Z",
  },
];

const router = useRouter();

const handleEventMoved = (event: CalendarEvent, newStartDate: string, newEndDate: string) => {
  console.log("event moved", event, newStartDate, newEndDate);
};
const handleEventClick = (event: string) => {
  router.push({ name: APP_ROUTES.STATIONS_BOOKING_DETAIL.name, params: { stationId: 1, bookingId: event } });
};
</script>

<template>
  <div class="rounded-lg bg-white p-8 shadow-lg">
    <h1 class="sr-only mb-4 text-2xl font-bold text-zinc-800">Dashboard</h1>
    <StationFinderInput class="mb-4" />
    <CalendarDisplay
      initialDisplay="week"
      :events="MOCKED_STATIONS_BOOKINS"
      @event-moved="handleEventMoved"
      @event-click="handleEventClick" />
  </div>
</template>
