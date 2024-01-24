export default function categorylist(category) {
  switch (category) {
    case "1": {
      return "모든";
    }
    case "2": {
      return "메인반찬";
    }
    case "3": {
      return "밑반찬";
    }
    case "4": {
      return "국·탕";
    }
    case "5": {
      return "밥·죽";
    }
    case "6": {
      return "튀김";
    }
    case "7": {
      return "면요리";
    }
    case "8": {
      return "양념·소스";
    }
    case "9": {
      return "김치·젓갈";
    }
    case "10": {
      return "셀러드";
    }
    case "11": {
      return "빵";
    }
    case "12": {
      return "디저트";
    }
    case "13": {
      return "차·음료";
    }
    case "14": {
      return "편의점요리";
    }
    case "15": {
      return "술";
    }
    case "16": {
      return "도시락";
    }
    case "17": {
      return "기타";
    }
    default: {
      return "";
    }
  }
}
