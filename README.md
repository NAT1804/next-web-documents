## Website tài liệu, đề thi cho sinh viên VNU

### Thành viên

- Nguyễn Anh Tuấn
- Nguyễn Văn Trường
- Trần Anh Vũ

### Document
- Tài liệu chính thức: [OFFICIAL DOCUMENT](https://1drv.ms/w/s!AgqVxgJI6Na-uWGe9JUfzvdyD-vg?e=lTd2eS)

## Project Tech
-   NextJS
-   NextAuth

## Getting Started

-   First, run npm to install the necessary packages in the project

```bash
npm install
```

-   Create environment variables

```bash
cp .env.example .env.local
```

-   Install and run command to create secret key 

```base
openssl rand -base64 32
```

Then update your env file as follows:

```
NEXTAUTH_SECRET=key_gen_by_openssl
NEXTAUTH_URL=url_local
NEXT_PUBLIC_SECRET=key_gen_by_openssl
```

-   Run project

```bash
npm run dev
```

## Deploy on Vercel

Link: https://next-web-documents.vercel.app/
