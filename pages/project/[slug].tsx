import { createClient, EntryCollection } from "contentful";
import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import Link from "next/link";
import { IProject, IProjectFields } from "../../@types/generated/contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || "",
  accessToken: process.env.CONTENTFUL_ACCESS_KEY || "",
});

export const getStaticPaths: GetStaticProps = async () => {
  const res: EntryCollection<Pick<IProjectFields, "slug">> =
    await client.getEntries({
      content_type: "project",
      select: "fields.slug",
    });

  return {
    paths: res.items.map(({ fields }) => ({ params: { slug: fields.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { items } = await client.getEntries({
    content_type: "project",
    "fields.slug": params?.slug,
  });

  return {
    props: {
      project: items[0],
    },
  };
};

const ProjectDetails: NextPage<any, any> = ({
  project: { fields },
}: {
  project: IProject;
}) => {
  return (
    <div>
      <h1>{fields.title}</h1>
      <p>{fields.technologiesUsed}</p>

      <Link href="/">
        <a>Go Back</a>
      </Link>
    </div>
  );
};

export default ProjectDetails;
