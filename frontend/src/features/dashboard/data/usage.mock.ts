/** Dummy hourly energy usage (kWh) across office hours for the usage chart. */
export interface HourlyUsage {
  time: string
  kwh: number
}

export const mockHourlyUsage: HourlyUsage[] = [
  { time: '7a', kwh: 0.2 },
  { time: '8a', kwh: 0.6 },
  { time: '9a', kwh: 1.1 },
  { time: '10a', kwh: 1.4 },
  { time: '11a', kwh: 1.3 },
  { time: '12p', kwh: 1.0 },
  { time: '1p', kwh: 0.9 },
  { time: '2p', kwh: 1.2 },
  { time: '3p', kwh: 1.5 },
  { time: '4p', kwh: 1.35 },
  { time: '5p', kwh: 1.1 },
  { time: '6p', kwh: 0.7 },
  { time: '7p', kwh: 0.4 },
]
