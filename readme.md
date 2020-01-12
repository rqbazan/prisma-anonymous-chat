# ID Challenge

This repository contains the solution for
[the ID challenge](https://www.notion.so/Reto-chat-an-nimo-1ad4ccfb508f447c90171914545f365a),
in order to get the **Web Developer - FrontEnd** position of the company.

### How to setup the project locally?

1. Install dependencies using `yarn`

2. Create a `.env` file following the `.env.example`

   > The following steps should be execute on backend package folder, so before
   > all run `cd backend`

3. Run `docker-compose up -d`
4. Init prisma `prisma init --endpoint http://localhost:4466`
5. Deploy prisma `prisma deploy`

### How to run the project after it's has setuped?

1. Run `yarn dev`

### Frontend Stack

- [NextJS](https://nextjs.org/)
- [xstyled](https://xstyled.dev/)
- [Styled Components](https://www.styled-components.com/)
- [Tailwindcss Theme](https://tailwindcss.com/)

### Backend Stack

- [Prisma](https://www.prisma.io/)
- [graphql-yoga](https://github.com/prisma-labs/graphql-yoga)
- [Postgres](https://www.postgresql.org/)
- [ExpressJS](https://expressjs.com/)

### References

- [The API of styled-system](https://styled-system.com/api)
