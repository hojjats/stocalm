export class Constants {

  public static DAYS_MONDAY_FIRST = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag', 'Söndag'];
  public static DAYS_SUNDAY_FIRST = ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'];
  public static HOURS = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00'
  ];

  public static AMENITIES = ['bench', 'toilet', 'playground', 'parking'];
  public static AMENITIES_TRANSLATION = [
    {value: 'bench', sv: 'Bänkar'},
    {value: 'toilet', sv: 'Toaletter'},
    {value: 'playground', sv: 'Lekpark'},
    {value: 'parking', sv: 'Parkering'}
  ];

}

export class Filters {
  public static LATEST_DECIBEL_VALUE = 0;
  public static TODAY_DECIBEL_MEAN_VALUE = 1;
  public static DISTANCE = 2;
}
