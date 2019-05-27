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
});
