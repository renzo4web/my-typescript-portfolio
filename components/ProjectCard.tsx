import Link from "next/link";
import Image from "next/image";
import { IProjectFields } from "../@types/generated/contentful";

const ProjectCard = ({ title, description, slug, heroImg }: IProjectFields) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <Image
        src={`https:${heroImg?.fields.file.url}`}
        width={heroImg?.fields.file.details.image?.width}
        height={heroImg?.fields.file.details.image?.height}
        alt={heroImg?.fields.description}
      />
      <Link href={`/project/${slug}`}>
        <a>{title}</a>
      </Link>
    </div>
  );
};

export default ProjectCard;
