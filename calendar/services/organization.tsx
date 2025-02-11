import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export const getOrganization = async (startIndex: number, endIndex: number) => {
  const serviceKey = encodeURIComponent("4669596962616c7339315567515441"); // API 키 URL 인코딩
  const url = `http://openAPI.seoul.go.kr:8088/${serviceKey}/xml/SeoulOrganizationService/${startIndex}/${endIndex}/`;

  try {
    const response = await axios.get(url);
    
    // XMLParser 객체 생성 (옵션 추가 가능)
    const parser = new XMLParser({
      ignoreAttributes: false, // XML 속성을 유지
      parseAttributeValue: true // 속성 값을 숫자/불리언으로 변환
    });

    // XML → JSON 변환
    const jsonData = parser.parse(response.data);

    // 변환된 JSON 데이터 출력
    // console.log("데이터 :", jsonData);
    
    return jsonData;

  } catch (error) {
    console.error("데이터 요청 실패:", error);
    return null;
  }
};
