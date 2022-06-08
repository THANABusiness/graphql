import { GraphQLClient } from 'graphql-request';

const graphcms = new GraphQLClient(
  'https://api-eu-west-2.graphcms.com/v2/cl20zjq2s3x9d01xt4hes5dm9/master',
  {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qYzFORUUzTUVaQk9EZzBNVGsyT1RVME1VTTRSa1ZEUkRRNFFVRkJOVVpHUmtaRk0wWkNRZyJ9.eyJodHRwczovL2dyYXBoY21zLmNvbS9sb2dpbnNDb3VudCI6NiwiaHR0cHM6Ly9ncmFwaGNtcy5jb20vZmxhZ3MiOnt9LCJpc3MiOiJodHRwczovL2F1dGguZ3JhcGhjbXMuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTE1MjAzNDM2OTE3OTU0MDk2NTkxIiwiYXVkIjoiOFZXU2R5VWh0WlQ0M25BaXByMmZqS1JoakptcDhzWXkiLCJpYXQiOjE2NTQ2NDkxODQsImV4cCI6MTY1NTI1Mzk4NCwibm9uY2UiOiJ2dHZOeG9JRnBQekpCM2x2UmVmUzJEWGVfYTEuZndIQiJ9.oVT5api_pbRWETQ5oDDD8tuNqZF-A8uj58GoNEuq-nAfGzoj1qK5P7rOGOiXBaSGTdU3JuL8vNlvYSrBhzyJGN8AHVxNGv_m89eBdaqIQNuUU2Knl9Q5vJuDrYRzRMdrkSC6GauQYq7vjJ4_Ks52WUxJOBCHNPoQkW1KUfSx19bpSgP1Xj_2cISaFhZ1GaXWnwf_59YC5lOQWQ_Ji6tunwyONtM7syEzxjdtSQm7wX4liJV6JB7dLbPTj7HHcUWPmn7paATtt0pFti0cPqT6J5CGK6LOZGUu66QL6I8Pf00Met1I1WxlW33pBrSed8Bx0FBg46DysT-QhQFDdi0dcQ'
    }
  }
);

export async function getStaticProps({ params }) {
  const { product } = await graphcms.request(
    `
    query ProductPageQuery($slug: String!) {
      product(where: { slug: $slug }) {
        name
        description
        price
      }
    }
  `,
    {
      slug: params.slug,
    }
  );

  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const { products } = await graphcms.request(`
    {
      products {
        slug
        name
      }
    }
  `);

  return {
    paths: products.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export default ({ product }) => (
  <React.Fragment>
    <h1>{product.name}</h1>
    <p>{product.description}</p>
    <p>{product.price / 100}</p>
  </React.Fragment>
);
