import { resizeImage } from '../image.processing';

describe('Testing function of processing image:', function () {
  it('1.Expect rezise image with non-error', function () {
    const IimageInfo = {
      imageName: 'fjord.jpg',
      width: '200',
      hight: '200',
    };
    resizeImage(IimageInfo, (error) => {
      expect(error).toBeFalsy();
    });
  });

  it('2.Expect resize image with "An error occurred processing the image"', async function () {
    const IimageInfo = {
      imageName: 'fjordNotValid.jpg',
      width: '210',
      hight: '210',
    };
    resizeImage(IimageInfo, (error) => {
      expect(error).toBe('An error occurred processing the image');
    });
  });
});
