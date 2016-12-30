import faker from 'faker';

export const GET_FAKE_INFO = 'GET_FAKE_INFO';

// Generate fake data for each chart lib/type
function generateData(flag) {
  var data = [];
  const numRecords = 5;

  switch (flag) {
    case 'google':
      for (let i = 0; i < numRecords; i++) {
        data.push([
          faker.commerce.productName(),
          Math.ceil(faker.commerce.price())
        ]);
      }
      return data;
    case 'chartjs':
      for (let i = 0; i < numRecords; i++) {
        data.push({
          price: parseInt(faker.commerce.price()),
          product: faker.commerce.productName()
        });
      }
      return data;
    case 'pie':
      for (let i = 0; i < numRecords; i++) {
        data.push({
          price: parseInt(faker.commerce.price()),
          product: faker.commerce.productName()
        });
      }
      return data;
    default:
      return data;
  }
}

export function generateFakeData() {
  return {
    type: GET_FAKE_INFO,
    google: generateData('google'),
    chart: generateData('chartjs'),
    pie: generateData('pie')
  };
}













































/* END */
