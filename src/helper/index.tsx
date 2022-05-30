export const reverseArr = input => {
  let ret = new Array();
  for (let i = input.length - 1; i >= 0; --i) {
    ret.push(input[i]);
  }
  return ret;
};

export const slugToName = (slug): string => {
  let name: string = slug;
  switch (slug) {
    case 'tai-lieu-chung':
      name = 'Tài liệu chung';
      break;
    case 'giao-trinh-chung':
      name = 'Giáo trình chung';
      break;
    case 'tieng-anh-vstep':
      name = 'Tiếng anh VSTEP';
      break;
    case 'de-cuong-chung':
      name = 'Đề cương chung';
      break;
    case 'cac-truong':
      name = 'Các trường';
      break;
    case 'dai-hoc-khtn':
      name = 'Đại học Khoa học tự nhiên';
      break;
    case 'dai-hoc-khxhnv':
      name = 'Đại học Khoa học xã hội và nhân văn';
      break;
    case 'dai-hoc-ngoai-ngu':
      name = 'Đại học Ngoại Ngữ';
      break;
    case 'dai-hoc-cong-nghe':
      name = 'Đại học Công Nghệ';
      break;
    case 'dai-hoc-kinh-te':
      name = 'Đại học Kinh Tế';
      break;
    case 'dai-hoc-giao-duc':
      name = 'Đại học Giáo Dục';
      break;
    case 'dai-hoc-y-duoc':
      name = 'Đại học Y Dược';
      break;
    case 'khoa-luat':
      name = 'Khoa Luật';
      break;
    case 'khoa-quoc-te':
      name = 'Khoa Quốc Tế';
      break;
    case 'khoa-qtkd':
      name = 'Khoa QTKD';
      break;
    case 'de-thi-dai-hoc':
      name = 'Đề thi đại học';
      break;
    case 'de-thi-danh-gia-nang-luc':
      name = 'Đề thi đánh giá năng lực';
      break;
    case 'de-thi-thpt-chuyen':
      name = 'Đề thi THPT Chuyên';
      break;
    case 'tin-tuc':
      name = 'Tin tức';
      break;
    default:
      break;
  }

  return name;
};
