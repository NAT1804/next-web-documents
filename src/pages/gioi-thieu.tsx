import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React from 'react';

const IntroductionPage = () => {
  return (
    <>
      <Heading>GIỚI THIỆU TÀI LIỆU VNU</Heading>
      <br />
      <Text>
        TailieuVNU.com thành lập ngày 02/09/2020 với mong muốn giúp cho sinh
        viên Đại học Quốc Gia Hà Nội có kho tài liệu miễn phí để học tập và
        nghiên cứu trong quá trình học tại các trường trong VNU.
      </Text>
      <br />
      <Text>
        TailieuVNU vẫn đang ngày ngày chăm chỉ sưu tầm, tổng hợp tài liệu là đề
        thi, đề cương, giáo trình … từ các trường thuộc khối VNU – UET, UEB,
        UED, HUS, USSH, IS, … Với sự nỗ lực của chúng mình, hi vọng
        TailieuVNU.com ngày càng tổng hợp được nhiều tài liệu để trở thành kho
        tài liệu, kho tri thức vô giá cho sinh viên của các trường trực thuộc
        VNU.
      </Text>
      <br />
      <Text>
        Hiện tại TailieuVNU đang tổng hợp đề thi từ rất nhiều nguồn, trực tiếp
        hoặc gián tiếp, chưa có nguồn tài nguyên phong phú. Chúng mình rất mong
        sưu tập được đề thi trong quá khứ và tổng hợp được tài liệu trong tương
        lai. Sự đóng góp và ủng hộ tài liệu của các bạn sinh viên VNU là động
        lực để chúng tớ phát triển kho tài liệu chung này.
      </Text>
      <br />
      <Text>Tài liệu VNU – Cho đi là còn mãi!</Text>
      <br />
      <Text fontWeight={'bold'}>Lưu ý:</Text>
      <UnorderedList>
        <ListItem>
          Website hoạt động KHÔNG thuộc sở hữu và trách nhiệm của bất kỳ tổ
          chức, trường Đại học nào.
        </ListItem>
        <ListItem>
          Mọi thông tin trên website chỉ mang tính tham khảo, vui lòng xem xét
          kỹ trước khi sử dụng!
        </ListItem>
        <ListItem>
          Tất cả sách số hóa được sưu tầm từ nhiều nguồn miễn phí trên mạng, vì
          vậy rất có thể chưa có sự đồng ý từ tác giả. Quý tác giả không cho
          đăng tác phẩm của mình vui lòng liên hệ Admin để được gỡ bỏ
        </ListItem>
      </UnorderedList>
      <br />
      <Text fontWeight={'bold'}>Liên hệ</Text>
      <UnorderedList>
        <ListItem>Fanpage: https://fb.com/tailieuvnu</ListItem>
        <ListItem>E-mail: khotailieuvnu@gmail.com</ListItem>
      </UnorderedList>
      <br />
    </>
  );
};

export default IntroductionPage;
