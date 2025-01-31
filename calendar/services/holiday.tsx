type HolidayItem = {
  dateKind: string;
  dateName: string;
  isHoliday: string;
  locdate: number;
  seq: number;
};

type HolidayResponse = {
  response: {
    body: {
      items: {
        item: HolidayItem[];
      };
    };
  };
};

export const getHolidayApi = async (year: string, month: string) => {
  const serviceKey = '4UqttKUP4D6OX6iH3dtQEV1tl5xGaJeG%2FK8nMN%2FDnunwH6maeO4n17Ju1%2B2a0bVcTUpLasSsH%2FWw2uZMuryj8g%3D%3D'; 
  const url = `http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?ServiceKey=${serviceKey}&solYear=${year}&solMonth=${month}&_type=json`;

  try {
    const response = await fetch(url);
    
    const text = await response.text();
    if (text.startsWith("<!DOCTYPE html>")) {
      console.error("Received HTML instead of JSON. Check the API response.");
      return [];
    }

    const data: HolidayResponse = JSON.parse(text);
    return data.response.body.items.item;
  } catch (error) {
    console.error('Error fetching holiday data:', error);
    return [];
  }
};
