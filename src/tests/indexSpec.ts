import supertest from 'supertest';
import app from '../index';

describe('test index file', () => {
  it('404 not found', async function () {
    const response = await supertest(app).get('/app');
    expect(response.status).toEqual(404);
  });
  it('Uploade API endpint - vaild prms', async function () {
    const response = await supertest(app).get(
      '/api/update-image?imageName=fjord.jpg&width=200&hight=500'
    );
    expect(response.status).toEqual(200);
  });

  it('Uploade API endpint - not vaild prms', async function () {
    const response = await supertest(app).get(
      '/api/update-image?imageName=fjord.jpg&width=width&hight=500'
    );
    expect(response.status).toEqual(303);
  });
});
