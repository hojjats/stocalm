
  import {MarkerPopupComponent} from './marker-popup.component';


  describe('MarkerPopupComponent', () => {
      let component: MarkerPopupComponent;
      beforeEach(() => {
          component = new MarkerPopupComponent(null, null, null, null, null);
        });
  it('should return low if decibel level is > 50', () => {
   const expected = 'low';
   const result = component.generateCurrentDecibel(49);
   expect(result).toBe(expected);
  });

  it('should return middle if decibel level is < 50 and > 66', () => {
      const expected = 'middle';
      const result = component.generateCurrentDecibel(51);
      expect(result).toBe(expected);
     });

  it('should return high if decibel level is < 65', () => {
      const expected = 'high';
      const result = component.generateCurrentDecibel(66);
      expect(result).toBe(expected);
     });
  });