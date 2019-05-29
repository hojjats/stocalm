import { ChartComponent} from './chart.component';

describe('ChartComponent', () => {
  let component: ChartComponent;
  beforeEach(() => {
    component = new ChartComponent();
  });

  it('should set day in right order', () => {
    let testDay = 0;
    component.setDay(testDay);
    expect(component.day).toBe(6);
  });

  it('should set day in right order test 2', () => {
    let testDay = 4;
    component.setDay(testDay);
    expect(component.day).toBe(3);
  });

  xit('should change day', () => {
    let spy = spyOn(component, 'dayChartData');
   component.setWeekdayChart();
    expect(spy).toHaveBeenCalled();
  });

  it('should push medelvärde once', () => {
   component.setWeekdayChart();
    expect(component.dayChartData.length).toBe(1);
  });

  xit('should change day', () => {
    let testDayNumber = 7;
    let currentDay = component.day;
    console.log('currentDay pre method: ' + currentDay);

    component.onChangeDay(testDayNumber);
     expect(component.day).not.toBe(7);
   });
});
