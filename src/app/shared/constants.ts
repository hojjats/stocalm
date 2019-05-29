export class Constants {

  public static DAYS_MONDAY_FIRST = ['Måndagar', 'Tisdagar', 'Onsdagar', 'Torsdagar', 'Fredagar', 'Lördagar', 'Söndagar'];
  public static DAYS_SUNDAY_FIRST = ['Söndagar', 'Måndagar', 'Tisdagar', 'Onsdagar', 'Torsdagar', 'Fredagar', 'Lördagar'];
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
  public static HOURS_SHORT = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    ' 10',
    ' 11',
    ' 12',
    ' 13',
    ' 14',
    ' 15',
    ' 16',
    ' 17',
    ' 18',
    ' 19',
    ' 20',
    ' 21',
    ' 22',
    ' 23'
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
